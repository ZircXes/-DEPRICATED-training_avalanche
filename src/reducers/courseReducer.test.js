import expect from 'expect';
import * as types from '../actions/actionTypes';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('Should add course when passed CREATE_COURSE_SUCCESS', () => {
    // arrange
    const initialState = [
      {id: 'A', title: 'A'},
      {id: 'B', title: 'B'}
    ];

    const newCourse = {title: 'C'};

    const action = actions.createCourseSuccess(newCourse);

    // act
    const newState = courseReducer(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');

  });

  it('Should update a course when passed UPDATE_COURSE_SUCCESS', () => {
    // arrange
    const initialState = [
      {id: 'A', title: 'A'},
      {id: 'B', title: 'B'},
      {id: 'C', title: 'C'}
    ];

    const course = {id: 'B', title: 'New Title'};
    const action = actions.updateCourseSuccess(course);

    // act
    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(a => a.id == course.id);
    const untouchedCourseA = newState.find(a => a.id == 'A');
    const untouchedCourseC = newState.find(c => c.id == 'C');

    // assert
    expect(newState.length).toEqual(3);
    expect(updatedCourse.title).toEqual('New Title');
    expect(untouchedCourseA.title).toEqual('A');
    expect(untouchedCourseC.title).toEqual('C');

  });

});
