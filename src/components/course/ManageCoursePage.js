import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import * as authorActions from '../../actions/authorActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {}
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
      if (this.props.course.id != nextProps.course.id) {
          // Populate when existing course loaded directly
          this.setState({course: Object.assign({}, nextProps.course)});
      }
  }

  // Child Functions
  updateCourseState(event) {
    const field = event.target.name;
    // let course = this.state.course; // mutates object
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({course: course});  
  }
  
  saveCourse(event) {
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course);
    this.context.router.push('/course');
  }

  // Render Function -- Container should call a component that handles rendering
  render() {
    return (
        <CourseForm 
          allAuthors={this.props.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          course={this.state.course}
          errors={this.state.errors}
        />
    );
  }
}

// Validation to address Linting
ManageCoursePage.propTypes = {
    // Validation Placeholder
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// Pull in React Router Context
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id == id);
    if (course.length) return course[0]; // Filter always returns an array
    return null;
}

// *****  Redux Connect & Related Functions *****
function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // from the path '/course:id'
  
   // PReliminary fixed input
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}  ;

  if (courseId && state.courses.length > 0) {
      course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
      return {
        value: author.id,
        text: author.firstName + ' ' + author.lastName
      };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(courseActions.createCourse(course))
    actions: bindActionCreators(courseActions, dispatch)
  };
}

// connect function returns a function which then is called and passed CoursesPage
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);