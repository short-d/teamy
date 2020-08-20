import React, {Component} from 'react';
import {User} from '../../entity/user';
import {Story} from '../../entity/story';
import {MemberStoryView} from './MemberStory.view';

import styles from './MemberStories.module.scss';
import classNames from 'classnames';

interface IProps {
  stories: Story[];
  me: User;
  unassigned: User;
  users: User[];

  onUnassignedSelected?: () => void;
  onMemberSelected?: (member: User) => void;
  onDeSelectAll?: () => void;
}

interface IState {
  isSelected: boolean;
  isUnassignedSelected: boolean;
  selectedUser?: User
}

type StoryCount = { [id: string]: number };

export class MemberStoriesView extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isSelected: false,
      isUnassignedSelected: false
    };
  }

  render() {
    const {stories, me, unassigned, users} = this.props;
    const unassignedStoryCount = stories.filter(story => !story.assignedTo).length;
    const userStoryCount = this.countStories(stories);
    const others = users.filter(user => user.id !== me.id);

    const {isSelected, isUnassignedSelected} = this.state;

    const shouldBlurUnassigned = isSelected && !isUnassignedSelected;
    return (
      <div className={styles.memberStories}>
        <div>
          <div className={classNames({
            [styles.memberStory]: true,
            [styles.blurred]: shouldBlurUnassigned
          })}
               onClick={this.handleOnUnassignedClick}>
            <MemberStoryView
              user={unassigned}
              storyCount={unassignedStoryCount}
              highlight={isSelected && isUnassignedSelected}/>
          </div>
          <div className={classNames({
            [styles.memberStory]: true,
            [styles.blurred]: this.shouldBlurMember(me)
          })}
               onClick={this.handleOnMemberClick(me)}>
            <MemberStoryView
              user={me}
              storyCount={userStoryCount[me.id] || 0}
              highlight={this.isMemberSelected(me)}
            />
          </div>
        </div>
        <div className={styles.divider}/>
        <div className={styles.others}>
          {others.map(user =>
            <div className={classNames({
              [styles.memberStory]: true,
              [styles.blurred]: this.shouldBlurMember(user)
            })}
                 onClick={this.handleOnMemberClick(user)}>
              <MemberStoryView
                user={user}
                storyCount={userStoryCount[user.id] || 0}
                highlight={this.isMemberSelected(user)}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  private countStories(stories: Story[]): StoryCount{
    const userStoryCount: StoryCount = {};
    stories.forEach(story => {
      if (!story.assignedTo) {
        return;
      }
      const userId = story.assignedTo.id;
      if (!userStoryCount[userId]) {
        userStoryCount[userId] = 0;
      }
      userStoryCount[userId]++;
    });
    return userStoryCount;
  }

  private shouldBlurMember = (member: User) => {
    const {isSelected, isUnassignedSelected, } = this.state;
    if (!isSelected) {
      return false;
    }
    if (isUnassignedSelected) {
      return true;
    }
    return !this.isMemberSelected(member);
  };

  private isMemberSelected(member: User) {
    const {selectedUser} = this.state;
    return selectedUser && selectedUser.id === member.id
  }

  handleOnUnassignedClick = () => {
    const prevUnassignedSelected = this.state.isUnassignedSelected;
    this.deSelectAll();
    if (prevUnassignedSelected) {
      if (this.props.onDeSelectAll) {
        this.props.onDeSelectAll();
      }
      return;
    }
    this.setState({
      isSelected: true,
      isUnassignedSelected: true
    });
    if (!this.props.onUnassignedSelected) {
      return;
    }
    this.props.onUnassignedSelected();
  };

  handleOnMemberClick(member: User) {
    return () => {
      const prevSelectedMember = this.state.selectedUser;
      this.deSelectAll();
      if (prevSelectedMember && prevSelectedMember.id === member.id) {
        if (this.props.onDeSelectAll) {
          this.props.onDeSelectAll();
        }
        return;
      }
      this.setState({
        isSelected: true,
        selectedUser: member
      });

      if (!this.props.onMemberSelected) {
        return;
      }
      this.props.onMemberSelected(member);
    };
  };

  private deSelectAll() {
    this.setState({
      isSelected: false,
      isUnassignedSelected: false,
      selectedUser: undefined
    });
  }
}