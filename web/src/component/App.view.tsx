import React, {Component} from 'react';
import styles from './App.module.scss';
import {KanbanView} from './kanban/Kanban.view';
import {Kanban} from '../entity/kanban';
import {ProjectService} from '../service/project.service';
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
import {MenuView} from './menu/Menu.view';

interface IProp {
  projectService: ProjectService;
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
    this.props.projectService.fetchActiveSprint().then(kanban => {
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
        <MenuView projectService={this.props.projectService}/>
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
                <KanbanView
                    kanban={kanban}
                    columnsFilter={columnsFilter}
                    onCreateStory={this.handleOnCreateStory}
                    onUpdateStory={this.handleOnUpdateStory}/>
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

  handleOnCreateStory = (story: Story, storyIndex: number, columnIndex: number) => {
    // TODO: Sync with server
    this.refreshStory(columnIndex, storyIndex, story);
  };

  handleOnUpdateStory = (story: Story, storyIndex: number, columnIndex: number) => {
    // TODO: Sync with server
    this.refreshStory(columnIndex, storyIndex, story);
  };

  refreshStory(columnIndex: number, storyIndex: number, story: Story) {
    // TODO: Sync with server
    const columns = this.state.kanban!.columns;

    if (!story.title) {
      columns[columnIndex].stories.splice(storyIndex, 1);
    } else {
      columns[columnIndex].stories[storyIndex] = story;
    }

    this.setState({
      kanban: Object.assign({}, this.state.kanban, {
        columns: columns
      })
    });
  }
}

export default AppView;
