import React, { PropTypes, Component }    from 'react';
import {
	Thumbnail,
	Button
} 																				from 'react-bootstrap';
import Slider 														from 'react-slick';

import './Carousel.css';

const propTypes = {
	title: PropTypes.string,
  courses: PropTypes.array
};

const defaultProps = {
	title: '',
	courses: []
};

export default class Carousel extends Component {
  render() {
		
		let courses = [];
		
		// TODO: Remove! This block only for demo
		courses = courses.concat(this.props.courses);
		courses = courses.concat(this.props.courses);
		courses = courses.concat(this.props.courses);
		courses = courses.concat(this.props.courses);
		
		var settings = {
			dots: true,
			infinite: true,
			speed: 500,
			// slidesToShow: 3,
			// slidesToScroll: 1,
			autoPlay: true,
			responsive: [ 
				{ breakpoint: 768, settings: 'unslick', slidesToScroll: 1 },
				{ breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
				{ breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } }, 
				{ breakpoint: 100000000, settings: { slidesToShow: 4, slidesToScroll: 4 } } ]
		};
		
    return (
			<section >
				<h2>{this.props.title}</h2>
				<div className='slider-container'>
					<Slider {...settings}>
						{courses.map((course, i) =>
							<div key={i}>
								<Thumbnail src={course.courseImage.secure_url} alt="242x200">
									<h3>{course.name}</h3>
									<p>{course.description || 'No description yet'}</p>
									<p>
										<Button bsStyle="primary">Details</Button>
									</p>
								</Thumbnail>
							</div>
						)}
					</Slider>
				</div>
			</section>
    );
  }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;
