import React, {Component} from 'react';
import {Container, Draggable, DropResult} from 'react-smooth-dnd';

import styles from './Column.module.scss';
import {Column} from '../../entity/column';
import {StoryView} from './Story.view';
import {Story} from '../../entity/story';

interface IProps {
  kanbanId: string;
  column: Column;
  onDrop?: (removedIndex: number | null, addedIndex: number | null, payload: Story) => void;
}

interface IState {
  selectedIndex: number;
}

export class ColumnView extends Component<IProps, IState> {
  private isDragging = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedIndex: -1
    };
  }

  render() {
    return (
      <div className={styles.column}>
        <div className={`${styles.title} ${styles[this.props.column.color]}`}>
          {this.props.column.title}
        </div>
        <div className={styles.stories}>
          <Container
            groupName={this.props.kanbanId}
            style={{height: '100%'}}
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}
            onDrop={this.handleOnDrop}
            getChildPayload={this.handleGetChildPayload}>
            {
              this
                .props
                .column
                .stories
                .map((story, index) =>
                  <Draggable key={story.id}>
                    <div className={styles.story}
                         onMouseEnter={this.handleMouseEnter(index)}
                         onMouseLeave={this.handleMouseLeave}
                    >
                      <StoryView story={story}
                                 active={index === this.state.selectedIndex}/>
                    </div>
                  </Draggable>
                )
            }
          </Container>
        </div>
      </div>
    );
  }

  handleOnDrop = (dropResult: DropResult) => {
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
}