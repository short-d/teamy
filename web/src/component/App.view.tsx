import React, {Component} from 'react';
import styles from './App.module.scss';
import {KanbanView} from './kanban/Kanban.view';
import {Kanban} from '../entity/kanban';
import {KanbanService} from '../service/kanban.service';
import {MemberStoriesView} from './member-stories/MemberStories.view';
import {UserService} from '../service/user.service';
import {User} from '../entity/user';
import {
  allStories,
  ColumnsFilter,
  storiesAssignTo,
  unassignedStories
} from '../filter/column.filter';

interface IState {
  kanban?: Kanban;
  me?: User;
  unassigned?: User;
  members: User[];
  columnsFilter: ColumnsFilter;
}

export class AppView extends Component<any, IState> {
  private kanbanService: KanbanService = new KanbanService();
  private userService: UserService = new UserService();

  constructor(props: any) {
    super(props);
    this.state = {
      members: [],
      columnsFilter: allStories
    };
  }

  componentDidMount() {
    const kanban = this.kanbanService.fetchKanban();
    const me = this.userService.me();
    const unassigned = this.userService.unassigned();
    const members = this.userService.members('short');
    this.setState({
      kanban,
      me,
      unassigned,
      members
    });
  }

  render() {
    const {kanban, me, unassigned, members, columnsFilter} = this.state;
    const stories = kanban?.columns.flatMap(column => column.stories);

    return (
      <div className={styles.AppUi}>
        {me && kanban && <div className={styles.bottomSection}>
            <div className={styles.memberStories}>
                <MemberStoriesView
                    me={me}
                    unassigned={unassigned!}
                    stories={stories!}
                    users={members}
                    onUnassignedSelected={this.handleOnUnassignedSelected}
                    onMemberSelected={this.handleOnMemberSelected}
                    onDeSelectAll={this.handleOnDeSelectAll}/>
            </div>
            <div className={styles.kanban}>
                <KanbanView kanban={kanban} columnsFilter={columnsFilter}/>
            </div>
        </div>}
      </div>
    );
  }

  handleOnUnassignedSelected = () => {
    this.setState({
      columnsFilter: unassignedStories
    });
  };

  handleOnMemberSelected = (member: User) => {
    this.setState({
      columnsFilter: storiesAssignTo(member.id)
    });
  };

  handleOnDeSelectAll = () => {
    this.setState({
      columnsFilter: allStories
    });
  };
}

export default AppView;
