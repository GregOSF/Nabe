// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require('underscore'),
    mongoose = require('mongoose');

// connect mongoose
mongoose.connect("mongodb://localhost/pickCity")

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/pickCity', function (req, res) {
  res.sendFile(__dirname + '/public/views/pickCity.html');
});


var cities = [
	{id: 1, city: 'New York'},
	{id: 2, city: 'San Francisco'},
	{id: 3, city: 'Los Angeles'},
	{id: 4, city: 'Chicago'},
	{id: 5, city: 'Miami'},
];

// set up root route to respond with 'hello world'
app.get('/api/cities', function (req, res) {
  res.json(cities);
});

// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});