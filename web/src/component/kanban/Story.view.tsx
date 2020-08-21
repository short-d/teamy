import React, {Component, FormEvent} from 'react';

import styles from './Story.module.scss';
import {Story} from '../../entity/story';
import {CardView} from '../ui/Card.view';

import questionIcon from './question.svg';
import classNames from 'classnames';

interface IProps {
  isEditing: boolean;
  active: boolean;
  story: Story;
  onStartEditing?: () => void;
  onFinishEditing?: (story: Story) => void;
}

interface IState {
  title: string;
}

export class StoryView extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      title: ''
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.story.title
    });
  }

  render() {
    const {story, isEditing} = this.props;
    const {title} = this.state;
    return (
      <CardView>
        <div className={
          classNames({
            [styles.story]: true,
            [styles.active]: this.props.active
          })}
             onBlur={this.handleOnTitleTextFieldBlur}>
          <div className={styles.leftPane}>
            <div className={styles.title}>
              {isEditing &&
              <textarea
                  className={styles.titleTextField}
                  autoFocus={true}
                  value={title}
                  onChange={this.handleTitleChange}
              />
              }
              {!isEditing &&
              <div onDoubleClick={this.handleOnTitleDoubleClick}>
                {title}
              </div>
              }
            </div>
            {story.tags.length > 0 &&
            <ul className={styles.tags}>
              {story.tags.map(tag => <li>{tag}</li>)}
            </ul>
            }
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

  handleTitleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    this.setState({
      title: event.currentTarget.value
    });
  };

  handleOnTitleTextFieldBlur = () => {
    if (this.props.onFinishEditing) {
      this.props.onFinishEditing(
        Object.assign({}, this.props.story, {
          title: this.state.title
        }));
    }
  };

  handleOnTitleDoubleClick = () => {
    if (this.props.onStartEditing) {
      this.props.onStartEditing();
    }
  };
}