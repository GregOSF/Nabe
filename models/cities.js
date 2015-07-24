// require mongoose
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	NabesSF = require('./nabes'),
	City = require('./cities');


// create schema for cities
var citySchema = new Schema({
	cityName: {
		type: 'string',
		default: ""
	}
});

//create models for City
var City = mongoose.model('City', citySchema);

// export models
module.exports = City;

