// require mongoose
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;




// create schema for cities
var CitySchema = new Schema({
	name: {
		type: 'string',
		default: ""
		
	}
})




var NabeSchema