// require mongoose
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;




// create schema for cities
var citySchema = new Schema({
	cityName: {
		type: 'string',
		default: ""
	},
	cityNabes: {
		type: 'string',
		default: ""
	},
	users: {
		type: 'string',
		default: ""
	}
});

// create schema for neighborhoods
var nabeSchema = new Schema ({
	nabeName: {
		type: 'string',
		default: ""
	},
	nabeDesc: {
		type: 'string',
		default: ""
	},
	nabeTags: {
		type: 'string',
		default: ""
	},
	cityName{
		type: 'string',
		default: ""
	},
});

//create models for city and nabe
var City = mongoose.model('City', citySchema);
var Nabe = mongoose.model('Nabe', nabe);

// export models
module.exports.City = City;
module.exports.Nabe = Nabe;