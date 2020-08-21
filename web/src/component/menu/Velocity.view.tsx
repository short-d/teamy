import React, {Component} from 'react';

import styles from './Velocity.module.scss';
import {Kanban} from '../../entity/kanban';

import check from './check.svg';

interface IProps {
  sprints: Kanban[];
}

interface IState {
  selected?: Kanban;
}

export class VelocityView extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      selected: this.props.sprints[0]
    });
  }

  render() {
    let {sprints} = this.props;
    sprints = sprints.slice(0, 3);

    let maxPoints = 0;
    for (const sprint of sprints) {
      maxPoints = Math.max(maxPoints, sprint.deliveredPoints);
    }

    const {selected} = this.state;

    return (
      <div className={styles.velocity}>
        <i className={styles.done}>
          <img alt={'Done'} src={check}/>
        </i>
        {selected &&
        <div className={styles.delivered}>
          {selected.deliveredPoints}pts
        </div>
        }
        <ul className={styles.comparison}
            onMouseLeave={this.handleOnComparisonMouseLeave}>
          {sprints.map((sprint, index) =>
            <li
              style={{width: `${sprint.deliveredPoints / maxPoints * 100}%`}}
              onMouseEnter={this.handleOnProgressHover(index)}
            />)
          }
        </ul>
      </div>
    );
  }

  handleOnComparisonMouseLeave = () => {
    this.setState({
      selected: this.props.sprints[0]
    });
  };

  handleOnProgressHover = (index: number) => {
    return () => {
      this.setState({
        selected: this.props.sprints[index]
      });
    };
  };
}