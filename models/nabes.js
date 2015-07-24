// require mongoose
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	City = require('./cities');
	NabesNY = require('./nabesny')


// create schema for sf neighborhoods
var NabesSFSchema = new Schema ({
	nabesName: {
		type: 'string',
		default: ""
	},
	nabesTags: {
		type: 'string',
		default: ""
	}	
});

//create models for NabesSF
var NabesSF = mongoose.model('nabessfs', NabesSFSchema);

// export models
module.exports = NabesSF;
