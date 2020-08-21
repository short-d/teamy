import React, {Component} from 'react';

import styles from './Kanban.module.scss';
import {Kanban} from '../../entity/kanban';
import {ColumnView} from './Column.view';
import {Story} from '../../entity/story';
import {Column} from '../../entity/column';
import {Container, Draggable, DropResult} from 'react-smooth-dnd';
import {ColumnsFilter} from '../../filter/column.filter';

interface IProps {
  kanban: Kanban;
  columnsFilter: ColumnsFilter;
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
    let {columns} = this.state;
    columns = this.props.columnsFilter(columns);
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
              <Draggable className={styles.column}>
                <ColumnView
                  kanbanId={this.props.kanban.id}
                  column={column}
                  onDrop={this.handleOnStoryDrop(index)}/>
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
    const {columns} = this.state;
    return (removedIndex: number | null, addedIndex: number | null, payload: Story) => {
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
}