//Root Reducer
import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  // ES6 Shorthand Property Names
  courses,
  authors,
  ajaxCallsInProgress
});

export default rootReducer;