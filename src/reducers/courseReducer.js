import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
  // takes state and action and returns a new state
  switch(action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    // ES6 Spread Operator expands the actual data within state
    case types.CREATE_COURSE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.course)
      ];

    // ES6 Spread and ES6 Filter
    case types.UPDATE_COURSE_SUCCESS:
      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}