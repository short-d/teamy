import React, {Component} from 'react';
import styles from './App.module.scss';
import {KanbanView} from './kanban/Kanban.view';
import {Kanban} from '../entity/kanban';
import {KanbanService} from '../service/kanban.service';

interface IState {
  kanban?: Kanban;
}

export class AppView extends Component<any, IState> {
  private kanbanService: KanbanService = new KanbanService();

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const kanban = this.kanbanService.fetchKanban();
    this.setState({
      kanban
    });
  }

  render() {
    const {kanban} = this.state;

    return (
      <div className={styles.AppUi}>
        {kanban && <KanbanView kanban={kanban}/>}
      </div>
    );
  }
}

export default AppView;
