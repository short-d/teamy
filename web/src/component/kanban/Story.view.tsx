import React, {Component, createRef, FormEvent, KeyboardEvent} from 'react';

import styles from './Story.module.scss';
import {Story} from '../../entity/story';
import {CardView} from '../ui/Card.view';

import questionIcon from './question.svg';
import classNames from 'classnames';
import {Key} from '../key/key';

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
  private titleInputRef = createRef<HTMLTextAreaElement>();

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

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
    if (!this.props.isEditing) {
      return;
    }

    const inputEl = this.titleInputRef.current;
    if (!inputEl) {
      return;
    }
    inputEl.style.height = `${inputEl.scrollHeight}px`;
    inputEl.focus();

    if (prevProps.isEditing) {
      return;
    }

    inputEl.selectionStart = inputEl.selectionEnd = inputEl.value.length;
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
          })
        }
             onKeyDown={this.handleOnKeyDown}>
          <div className={styles.leftPane}>
            <div className={styles.title}>
              {isEditing &&
              <textarea
                  ref={this.titleInputRef}
                  className={styles.titleTextField}
                  value={title}
                  onChange={this.handleTitleChange}
                  onBlur={this.handleOnTitleTextFieldBlur}
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
    this.finishEditing();
  };

  handleOnTitleDoubleClick = () => {
    if (this.props.onStartEditing) {
      this.props.onStartEditing();
    }
  };

  handleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    console.log(event.key);
    switch (event.key) {
      case Key.Esc:
        this.finishEditing();
    }
  };

  private finishEditing() {
    if (this.props.onFinishEditing) {
      this.props.onFinishEditing(
        Object.assign({}, this.props.story, {
          title: this.state.title
        }));
    }
  }
}