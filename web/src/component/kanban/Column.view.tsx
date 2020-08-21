import React, {Component} from 'react';
import {Container, Draggable, DropResult} from 'react-smooth-dnd';

import styles from './Column.module.scss';
import {Column} from '../../entity/column';
import {StoryView} from './Story.view';
import {Story} from '../../entity/story';

import add from './add.svg';
import classNames from 'classnames';

interface IProps {
  kanbanId: string;
  column: Column;
  onDrop?: (removedIndex: number | null, addedIndex: number | null, payload: Story) => void;
  onCreateStory?: (story: Story, index: number) => void;
  onUpdateStory?: (story: Story, index: number) => void;
}

interface IState {
  selectedIndex: number;
  editingIndex: number;
  createStory?: Story;
}

export class ColumnView extends Component<IProps, IState> {
  private isDragging = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      editingIndex: -1,
      selectedIndex: -1
    };
  }

  render() {
    const {column} = this.props;
    const {editingIndex} = this.state;

    return (
      <div className={styles.column}>
        <div className={`${styles.title} ${styles[column.color]}`}>
          {column.title}
        </div>
        <div className={styles.stories}>
          {column.stories.length < 1 && (
            <div className={styles.noStory}>
              <div className={styles.noStoryTitle}>No Story</div>
              <div className={styles.instructions}>
                Drag stories here
                <br/>
                or
                <br/>
                Click + create new stories
              </div>
            </div>
          )}
          <Container
            groupName={this.props.kanbanId}
            style={{height: '100%'}}
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}
            onDrop={this.handleOnStoryDrop}
            getChildPayload={this.handleGetChildPayload}>
            {
              column
                .stories
                .map((story, index) =>
                  <Draggable key={story.id}>
                    <div>
                      <div className={styles.addStoryRegion}>
                        <div className={styles.addButton}
                             onClick={this.handleAddStoryClick(index)}>
                          <img src={add}/>
                        </div>
                      </div>
                      <div className={styles.story}
                           onMouseEnter={this.handleMouseEnter(index)}
                           onMouseLeave={this.handleMouseLeave}
                      >
                        <StoryView
                          isEditing={index === editingIndex}
                          story={story}
                          active={index === this.state.selectedIndex}
                          onStartEditing={this.handleOnStartEditingStory(index)}
                          onFinishEditing={this.handleOnFinishEditingStory(index)}/>
                      </div>
                    </div>
                  </Draggable>
                )
            }
            <div className={classNames({
              [styles.addButton]: true,
              [styles.lastAddButton]: true
            })}
                 onClick={this.handleAddStoryClick(this.props.column.stories.length)}>
              <img src={add}/>
            </div>
          </Container>
        </div>
      </div>
    );
  }

  handleOnStoryDrop = (dropResult: DropResult) => {
    // TODO: Sync with server
    if (!this.props.onDrop) {
      return;
    }

    const {removedIndex, addedIndex, payload} = dropResult;
    this.props.onDrop(removedIndex, addedIndex, payload);
  };

  handleGetChildPayload = (index: number): Story => {
    return this.props.column.stories[index];
  };

  handleDragStart = () => {
    this.isDragging = true;
  };

  handleDragEnd = () => {
    this.isDragging = false;
  };

  handleMouseEnter = (index: number) => {
    return () => {
      if (this.isDragging) {
        return;
      }
      this.setState({
        selectedIndex: index
      });
    };
  };

  handleMouseLeave = () => {
    this.setState({
      selectedIndex: -1
    });
  };

  handleAddStoryClick = (index: number) => {
    return () => {
      const story: Story = {
        id: '',
        title: '',
        tags: [],
        isCompleted: false
      };
      this.props.column.stories.splice(index, 0, story);
      this.setState({
        selectedIndex: index,
        editingIndex: index,
        createStory: story
      });
    };
  };

  handleOnFinishEditingStory = (index: number) => {
    return (story: Story) => {
      this.setState({
        editingIndex: -1,
        selectedIndex: -1
      });

      if (this.state.createStory) {
        if (this.props.onCreateStory) {
          this.props.onCreateStory(story, index);
        }
        this.setState({
          createStory: undefined
        });
        return;
      }

      if (this.props.onUpdateStory) {
        this.props.onUpdateStory(story, index);
      }
    };
  };

  handleOnStartEditingStory = (index: number) => {
    return () => {
      this.setState({
        editingIndex: index,
        selectedIndex: index
      });
    };
  };
}