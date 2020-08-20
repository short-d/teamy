import React, {Component} from 'react';

import styles from './Menu.module.scss';

import arrow from './arrow.svg';
import sprint from './sprint.svg';
import flag from './flag.svg';

import classNames from 'classnames';

export class MenuView extends Component {
  render() {
    return (
      <div className={styles.menu}>
        <div className={styles.button}>
          <div className={styles.value}>Short</div>
          <i className={styles.arrow}>
            <img src={arrow}/>
          </i>
        </div>
        <div className={styles.divider}/>
        <div className={classNames({
          [styles.button]: true,
          [styles.sprint]: true
        })}>
          <i className={styles.sprint}>
            <img src={sprint}/>
          </i>
          <div className={styles.value}>
            Jan 20 - Jan 31
          </div>
          <i className={styles.arrow}>
            <img src={arrow}/>
          </i>
        </div>
        <div className={styles.divider}/>
        <div className={classNames({
          [styles.button]: true,
          [styles.schedule]: true
        })}>
          <i className={styles.flag}>
            <img src={flag}/>
          </i>
        </div>
      </div>
    );
  }
}