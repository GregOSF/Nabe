// require mongoose
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	NabesSF = require('./nabes'),
	City = require('./cities');

// create schema for ny neighborhoods
var NabesNYSchema = new Schema ({
	nabesName: {
		type: 'string',
		default: ""
	},
	nabesTags: {
		type: 'string',
		default: ""
	}	
});

//create models for NABESny
var NabesNY = mongoose.model('nabesNY', NabesNYSchema);

module.exports = NabesNY;