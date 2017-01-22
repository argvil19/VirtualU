import React, { PropTypes, Component }    from 'react';
import {

}																					from 'react-bootstrap';

const propTypes = {
	email: PropTypes.string,
	name: PropTypes.string,
	birthday: PropTypes.datetime
};

const defaultProps = {
	email: '',
	name: '',
	birthday: new Date()
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
