import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import * as authorActions from '../../actions/authorActions';
import CourseForm from './CourseForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
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
  
  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course Saved!');
    this.context.router.push('/courses');
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
          saving={this.state.saving}
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
  
  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
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