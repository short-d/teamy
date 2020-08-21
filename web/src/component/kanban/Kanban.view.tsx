import React, {Component} from 'react';

import styles from './Kanban.module.scss';
import {Kanban} from '../../entity/kanban';
import {ColumnView} from './Column.view';
import {Story} from '../../entity/story';
import {Column} from '../../entity/column';
import {Container, Draggable, DropResult} from 'react-smooth-dnd';
import {StoryFilter} from '../../filter/story.filter';

interface IProps {
  kanban: Kanban;
  storyFilter: StoryFilter;
  createEmptyStory: () => Story
  onCreateStory?: (story: Story, storyIndex: number, columnIndex: number) => void
  onUpdateStory?: (story: Story, storyIndex: number, columnIndex: number) => void
}

interface IState {
  columns: Column[];
}

export class KanbanView extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      columns: [],
    };
  }

  componentDidMount() {
    const {kanban} = this.props;
    if (kanban) {
      this.setState({
        columns: kanban.columns
      });
    }
  }

  render() {
    const {storyFilter} = this.props;
    const {columns} = this.state;
    return (
      <div className={styles.kanban}>
        <Container
          style={{
            width: '100%',
            height: '100%',
            display: 'flex'
          }}
          behaviour={'contain'}
          lockAxis={'x'}
          orientation={'horizontal'}
          getChildPayload={this.handleGetChildPayload}
          onDrop={this.handleOnColumnDrop}
        >
          {columns
            .map((column, index) =>
              <Draggable
                key={column.id}
                className={styles.column}>
                <ColumnView
                  key={index}
                  kanbanId={this.props.kanban.id}
                  column={column}
                  storyFilter={storyFilter}
                  onDrop={this.handleOnStoryDrop(index)}
                  createEmptyStory={this.props.createEmptyStory}
                  onCreateStory={this.handleOnCreateStory(index)}
                  onUpdateStory={this.handleOnUpdateStory(index)}/>
              </Draggable>
            )}
        </Container>
      </div>
    );
  }

  handleGetChildPayload = (index: number): Column => {
    return this.state.columns[index];
  };

  private handleOnColumnDrop = ({removedIndex, addedIndex, payload}: DropResult) => {
    // TODO: Sync with server
    const {columns} = this.state;
    if (removedIndex !== null) {
      columns.splice(removedIndex, 1);
    }
    if (addedIndex !== null) {
      columns.splice(addedIndex, 0, payload);
    }
    this.setState({
      columns
    });
  };

  private handleOnStoryDrop(index: number) {
    return (removedIndex: number | null, addedIndex: number | null, payload: Story) => {
      const {columns} = this.state;
      const {stories} = columns[index];
      if (removedIndex !== null) {
        stories.splice(removedIndex, 1);
      }
      if (addedIndex !== null) {
        stories.splice(addedIndex, 0, payload);
      }
      this.setState({
        columns
      });
    };
  }

  private handleOnUpdateStory = (columnIndex: number) => {
    return (story: Story, storyIndex: number) => {
      if (this.props.onUpdateStory) {
        this.props.onUpdateStory(story, storyIndex, columnIndex);
      }
    };
  };

  private handleOnCreateStory = (columnIndex: number) => {
    return (story: Story, storyIndex: number) => {
      if (this.props.onCreateStory) {
        this.props.onCreateStory(story, storyIndex, columnIndex);
      }
    };
  };
}