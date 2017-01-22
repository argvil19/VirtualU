import React, { PropTypes, Component }    from 'react';
import { asyncConnect }                   from 'redux-connect';
import {
	Grid
} 																				from 'react-bootstrap';
import Carousel														from './Carousel';

import { fetchCourses } 									from '../../redux/actions/coursesActions';
import { isBrowser, isLoaded }          	from 'redux/utils/helpers';

const propTypes = {
  title: PropTypes.string,
  courses: PropTypes.object, 
	dispatch: PropTypes.func
};

const defaultProps = {
	title: 'HVU - Heavy Vehicle Users club.',
	courses: {
		list: []
	},
	dispatch: () => {}
};

class Homepage extends Component {
  render() {
    return (
      <Grid fluid={false}>
				<h1>{this.props.title}</h1>
				
				<Carousel courses={this.props.courses.courses} title='Top 20 popular courses' />
				
				<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum omnis quos repellendus? Aspernatur deserunt,
					esse quam rem sint soluta totam! Alias at dolores eveniet incidunt porro! Excepturi mollitia officia
					voluptates.
					<hr/>
					<br/>
				</div>
				
				<Carousel courses={this.props.courses.courses} title='Recent courses' />

				<div>Ad, deleniti quis? Ab ea, magnam magni nemo nesciunt obcaecati officiis, quas repellendus saepe sint velit
					veniam. Cumque, deleniti dicta esse sequi sint veritatis! Assumenda at ipsam molestias quibusdam repellat?
					<hr/>
					<br/>
				</div>
				
				<Carousel courses={this.props.courses.courses} title='This week discounted courses' />

				<div>Atque aut dolores exercitationem facere iure, magnam minus modi nemo nesciunt quae quaerat, quia reiciendis
					saepe sapiente sit ullam voluptatem. A cumque neque officia porro quasi sequi sit, soluta voluptatem!
					<hr/>
					<br/>
				</div>
				
      </Grid>
    );
  }
}

Homepage.propTypes = propTypes;
Homepage.defaultProps = defaultProps;

const asyncPromises = [
	{
		key: 'courses',
		promise: ({ store }) => {
			if (!isBrowser()) {
				const state = store.getState();
				
				if (!isLoaded(state, 'courses')) {
					return store.dispatch(fetchCourses());
				}
			}

			return null;
		}
	}
];

function mapStateToProps(state) {
	const courses = state.courses;
  return {
    courses
  };
};

export default asyncConnect(asyncPromises, mapStateToProps)(Homepage);
