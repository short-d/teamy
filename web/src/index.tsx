import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.scss';
import AppView from './component/App.view';
import * as serviceWorker from './serviceWorker';
import {KanbanService} from './service/kanban.service';
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
const kanbanService = new KanbanService(teamyGraphQLService);

const userService = new UserService();

ReactDOM.render(
  <React.StrictMode>
    <AppView kanbanService={kanbanService} userService={userService}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
