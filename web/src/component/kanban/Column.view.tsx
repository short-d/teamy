import React, {Component} from 'react';
import {Container, Draggable, DropResult} from 'react-smooth-dnd';

import styles from './Column.module.scss';
import {Column} from '../../entity/column';
import {StoryView} from './Story.view';
import {Story} from '../../entity/story';

import add from './add.svg';
import classNames from 'classnames';
import {StoryFilter} from '../../filter/story.filter';

interface IProps {
  kanbanId: string;
  column: Column;
  storyFilter: StoryFilter;
  createEmptyStory: () => Story;
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
    const {column, storyFilter} = this.props;
    const {editingIndex} = this.state;

    const stories = column.stories.filter(storyFilter);

    return (
      <div className={styles.column}>
        <div className={`${styles.title} ${styles[column.color]}`}>
          {column.title}
        </div>
        <div className={styles.stories}>
          {stories.length < 1 && (
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
              column.stories
                .map((story, index) =>
                  storyFilter(story) &&
                    <Draggable key={story.id}>
                        <div>
                            <div className={styles.addStoryRegion}>
                                <div className={styles.addButton}
                                     onClick={this.handleAddStoryClick(index)}>
                                    <img alt={'Add'} src={add}/>
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
              <img alt={'Add'} src={add}/>
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

    let {removedIndex, addedIndex, payload} = dropResult;

    if (addedIndex !== null) {
      addedIndex = this.findOriginalIndex(addedIndex);
    }

    if (removedIndex !== null) {
      removedIndex = this.findOriginalIndex(removedIndex);
    }

    this.props.onDrop(removedIndex, addedIndex, payload);
  };

  handleGetChildPayload = (index: number): Story => {
    const {column, storyFilter} = this.props;
    return column.stories.filter(storyFilter)[index];
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
      const story = this.props.createEmptyStory();
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
        selectedIndex: index,
      });
    };
  };

  private findOriginalIndex(index: number) {
    const {column, storyFilter} = this.props;

    let filteredIndex = 0;
    for (let i = 0; i < column.stories.length; i++) {
      if (!storyFilter(column.stories[i])) {
        continue;
      }
      if (index === filteredIndex) {
        return i;
      }
      filteredIndex++;
    }

    // Filtered column is empty
    return column.stories.length;
  }
}