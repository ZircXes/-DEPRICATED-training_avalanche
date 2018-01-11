/*eslint-disable import/default */
// Utilize React Router
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
import './styles/styles.css'; // Webpack can import CSS files too
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

// Can pass an initial state/store here.
const store = configureStore();

// Fetch Data for Store
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

// Async Tools
// Redux-Thunk -- created by Creator of Redux -- Functions from action creators
// Redux-Promise -- Flux standard actions for clear conventions (new)
// Redux-Saga -- Uses ES6 generators for async

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')  
);