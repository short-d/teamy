import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppView from './component/App.view';
import * as serviceWorker from './serviceWorker';
import {ProjectService} from './service/project.service';
import {TeamyGraphQLService} from './service/teamy.graphql.service';
import {GraphQLService} from './fw/GraphQL.service';
import {FetchHTTPService} from './fw/http.service';
import {UserService} from './service/user.service';

const httpService = new FetchHTTPService();
const graphQLService = new GraphQLService(httpService);
const teamyGraphQLService = new TeamyGraphQLService(
  graphQLService,
  'http://localhost:8000/graphql'
);
const projectService = new ProjectService(teamyGraphQLService);

const userService = new UserService();

ReactDOM.render(
  <React.StrictMode>
    <AppView projectService={projectService} userService={userService}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
