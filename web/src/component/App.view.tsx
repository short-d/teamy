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
import {Story} from '../entity/story';
import {MenuView} from './Menu.view';

interface IProp {
  kanbanService: KanbanService;
  userService: UserService;
}

interface IState {
  kanban?: Kanban;
  me?: User;
  unassigned?: User;
  members: User[];
  columnsFilter: ColumnsFilter;
}

export class AppView extends Component<IProp, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      members: [],
      columnsFilter: allStories
    };
  }

  async componentDidMount() {
    this.props.kanbanService.fetchActiveKanban().then(kanban => {
      const me = this.props.userService.me();
      const unassigned = this.props.userService.unassigned();
      const members = this.props.userService.members('short');
      this.setState({
        kanban,
        me,
        unassigned,
        members
      });
    });
  }

  render() {
    const {kanban, me, unassigned, members, columnsFilter} = this.state;
    let stories: Story[] = [];
    if (kanban) {
      stories = kanban.columns.flatMap(column => column.stories);
    }

    return (
      <div className={styles.AppUi}>
        <MenuView/>
        {me && kanban &&
        <div className={styles.bottomSection}>
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
