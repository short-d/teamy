import React, {Component} from 'react';

import styles from './Project-item.module.scss';
import arrow from './arrow.svg';
import classNames from 'classnames';

interface IState {
  showModal: boolean;
}

export class ProjectItemView extends Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  render() {
    return (
      <div>
        <div className={styles.button}
             onClick={this.handleOnButtonClick}>
          <div className={styles.value}>Short</div>
          <i className={styles.arrow}>
            <img alt={'Expand'} src={arrow}/>
          </i>
        </div>
        <div className={classNames({
          [styles.modal]: true,
          [styles.show]: this.state.showModal
        })}>
          <ul>
            <li className={styles.selected}>
              Short
            </li>
            <li>
              HyperChat
            </li>
          </ul>
        </div>
      </div>
    );
  }

  handleOnButtonClick = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };
}