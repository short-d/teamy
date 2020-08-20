import React, {Component} from 'react';
import {User} from '../../entity/user';

import styles from './MemberStory.module.scss';
import classNames from 'classnames';

interface IProp {
  user: User;
  storyCount: number;
  highlight?: boolean;
}

export class MemberStoryView extends Component<IProp> {
  static defaultProps: Partial<IProp> = {
    highlight: false
  };

  render() {
    const {user, storyCount, highlight} = this.props;
    return (
      <div className={styles.memberStory}>
        <img alt={user.name} className={classNames({
          [styles.avatar]: true,
          [styles.highlight]: highlight
        })} src={user.avatarURL}/>
        <div className={styles.userName}>{user.name}</div>
        <div className={styles.storyCount}>{storyCount}</div>
      </div>
    );
  }
}