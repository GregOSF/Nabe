var mongoose = require('mongoose');
var dbNabes = require("./models/nabes");

mongoose.connect('mongodb://localhost/nabes1');

db.nabes.insert({
	nabesName: "Castro", 
	nabesTags: "Fabulous",
	cityName: "San Francisco"
});


// module.export.nabes = Nabes;