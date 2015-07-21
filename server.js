// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require('underscore'),
    mongoose = require('mongoose'),
    Nabes = require('./models/nabe');

// // connect mongoose
// mongoose.connect("mongodb://localhost/nabes");

// connect Mongoose with Heroku
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/nabes'
);

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// connect index.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

//connect pickCity page
app.get('/pickCity', function (req, res) {
  res.sendFile(__dirname + '/public/views/pickCity.html');
});

// var City = function (full, citySeed) {
//   var cityExists = Nabes.length;
//   if (cityExists > 0) {
//     console.log('seed already exists');
//   } else {db.}
// }

var cities = [
	{city: 'New York'},
	{city: 'San Francisco'},
];

// set up root route to respond with 'hello world'
app.get('/api/cities', function (req, res) {
  res.json(cities);
});

// set up post route to add new neighborhood attributes
// app.post('/api/nabes', function (req, res) {
//   // create new blogpost with form data (`req.body`)
//   var newNabe = new Nabes({
//     nabesName: req.body.nabesName,
//     nabesDesc: req.body.nabesDesc,
//     nabesTags: req.body.nabesTags,
//     cityName: req.body.cityName
//   });
//   // save new blogpost in db
//   newNabe.save(function (err, savedNabe) {
//     res.json(savedNabe);
//   });
// });



// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server started on localhost:3000');
});