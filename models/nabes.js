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

//create models for city and nabe
var City = mongoose.model('City', citySchema);
var NabesSF = mongoose.model('nabessfs', NabesSFSchema);
var NabesNY = mongoose.model('nabesNY', NabesNYSchema);

// export models
module.exports = City;
module.exports = NabesSF;
module.exports = NabesNY;