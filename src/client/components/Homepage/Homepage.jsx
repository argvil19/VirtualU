import React, {
	PropTypes,
	Component
}
from 'react';
import { connect }                          from 'react-redux';
import {
	Grid
}
from 'react-bootstrap';
import Carousel from './Carousel';

import {
	fetchCourses
}
from '../../redux/actions/coursesActions';
import {
	isBrowser,
	isLoaded
}
from '../../redux/utils/helpers';

const propTypes = {
	title: PropTypes.string,
	courses: PropTypes.object,
	dispatch: PropTypes.func
};

const defaultProps = {
	title: 'HVU - Hanshaw Virtual University',
	courses: {
		list: []
	}
};

class Homepage extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.dispatch(fetchCourses());
	}

	render() {
		const popular = this.props.courses.list.length > 0 ? (<Carousel coursesList={this.props.courses.list} title='Top 20 popular courses' />) : '';
		const recent = this.props.courses.list.length > 0 ? (<Carousel coursesList={this.props.courses.list} title='Top 20 popular courses' />) : '';
		const discounted = this.props.courses.list.length > 0 ? (<Carousel coursesList={this.props.courses.list} title='Top 20 popular courses' />) : '';

		return (
			<Grid fluid={false}>
				<h1>{this.props.title}</h1>

				{popular}

				<div>Lorem ipsum dzssoluta totam! Alias at dolores eveniet incidunt porro! Excepturi mollitia officia
					voluptates.
					<hr/>
					<br/>
				</div>

				{recent}

				<div>Ad, deleniti qui sint veritatis! Assumenda at ipsam molestias quibusdam repellat?
					<hr/>
					<br/>
				</div>

				{discounted}

				<div>Atqs exercitaullam voluptatem. A cumque neque officia porro quasi sequi sit, soluta voluptatem!
					<hr/>
					<br/>
				</div>

      </Grid>
		);
	}
}

function mapStateToProps(state) {
  const courses = state.courses;
  return {
    courses
  };
};

Homepage.propTypes = propTypes;
Homepage.defaultProps = defaultProps;

export default connect(mapStateToProps)(Homepage);
