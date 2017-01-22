import React, { PropTypes, Component }    from 'react';
import {
	FieldGroup
}																					from 'react-bootstrap';

const propTypes = {
	email: PropTypes.string,
	name: PropTypes.string,
	birthday: PropTypes.number
};

const defaultProps = {
	email: '',
	name: '',
	birthday: 0
};

class Profile extends Component {
	render() {
		return (
			<div>
				<h1>Profile</h1>
				<FieldGroup
					id="formControlsEmail"
					type="text"
					label="Text"
					placeholder="Enter email"
				/>
				<FieldGroup
					id="formControlsName"
					type="text"
					label="Text"
					placeholder="Enter name"
				/>
				<FieldGroup
					id="formControlsDate"
					type="text"
					label="Text"
					placeholder="Enter date"
				/>
			</div>
		);
	}
}

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;

export default Profile;
