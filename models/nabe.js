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
	}
});

// create schema for neighborhoods
var nabesSchema = new Schema ({
	nabesName: {
		type: 'string',
		default: ""
	},
	nabesTags: [{
		type: 'string',
		default: ""
	}],
	cityName: {
		type: 'string',
		default: ""
	}
});

//create models for city and nabe
var City = mongoose.model('City', citySchema);
var Nabes = mongoose.model('Nabes', nabesSchema);

// export models
module.exports.City = City;
module.exports.Nabes = Nabes;