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


//create models for city and nabe
var City = mongoose.model('City', citySchema);
// var NabesNY = mongoose.model('nabesNY', NabesNYSchema);

// export models
module.exports = City;

// module.exports = NabesNY;