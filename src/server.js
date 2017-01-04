// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Requires
var keystone = require('keystone');
var mongoose = require('mongoose');
var Routes = require('./routes/index');

mongoose.connect('mongodb://test:test@ds139448.mlab.com:39448/hvu');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation. 

keystone.init({
	'name': 'hvu',
	'brand': 'hvu',
	'mongo': 'mongodb://test1:test1@ds139448.mlab.com:39448/hvu',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'Admin',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', Routes);

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	admins: 'admins',
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
