import React, {Component} from 'react';

import styles from './Card.module.scss';


export class CardView extends Component {
  render() {
    return (
      <div className={styles.card}>
        {this.props.children}
      </div>
    );
  }
}