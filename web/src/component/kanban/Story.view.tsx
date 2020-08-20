import React, {Component} from 'react';

import styles from './Story.module.scss';
import {Story} from '../../entity/story';
import {CardView} from '../ui/Card.view';

import questionIcon from './question.svg';
import classNames from 'classnames';

interface IProps {
  active: boolean;
  story: Story;
}

export class StoryView extends Component<IProps> {
  render() {
    const {story} = this.props;
    return (
      <CardView>
        <div className={
          classNames({
            [styles.story]: true,
            [styles.active]: this.props.active
          })}>
          <div className={styles.leftPane}>
            <div className={styles.title}>{story.title}</div>
            <ul className={styles.tags}>
              {story.tags.map(tag => <li>{tag}</li>)}
            </ul>
          </div>
          <div className={styles.actions}>
            <div className={styles.avatar}>
              {story.assignedTo &&
              <img alt={story.assignedTo.name}
                   src={story.assignedTo.avatarURL}/>}
              {!story.assignedTo &&
              <img className={styles.unassigned}
                   alt={'Unassigned'}
                   src={questionIcon}/>}
            </div>
          </div>
        </div>
      </CardView>
    );
  }
}