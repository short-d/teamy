import React, {Component} from 'react';

import styles from './Menu.module.scss';

import arrow from './arrow.svg';
import sprint from './sprint.svg';
import flag from './flag.svg';

import classNames from 'classnames';
import {ProjectItemView} from './Project-item.view';
import {VelocityView} from './Velocity.view';
import {ProjectService} from '../../service/project.service';
import {Kanban} from '../../entity/kanban';

interface IProps {
  projectService: ProjectService;
}

interface IState {
  sprints: Kanban[]
}

export class MenuView extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      sprints: [],
    };
  }

  async componentDidMount() {
    const sprints = await this.props.projectService.fetchAllSprints();
    this.setState({
      sprints
    });
  }

  render() {
    return (
      <div className={styles.menu}>
        <ProjectItemView/>
        <div className={styles.divider}/>
        <div className={classNames({
          [styles.button]: true,
          [styles.sprint]: true
        })}>
          <i className={styles.sprint}>
            <img alt={'Sprint'} src={sprint}/>
          </i>
          <div className={styles.value}>
            Jan 20 - Jan 31
          </div>
          <i className={styles.arrow}>
            <img alt={'Expand'} src={arrow}/>
          </i>
        </div>
        <div className={styles.divider}/>
        <div className={classNames({
          [styles.button]: true,
          [styles.schedule]: true
        })}>
          <i className={styles.flag}>
            <img alt={'Schedule'} src={flag}/>
          </i>
        </div>
        <div className={styles.spacer}/>
        {this.state.sprints.length > 0 &&
        <VelocityView sprints={this.state.sprints}/>}
      </div>
    );
  }

  handleOnProjectClick = () => {

  };
}