// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require('underscore'),
    mongoose = require('mongoose'),
    NabesSF = require('./models/nabes');
    // NabesNY = require('./models/nabes');
    // Seed = require('./seed.js');

// // connect mongoose
// mongoose.connect("mongodb://localhost/nabes");

// connect Mongoose with Heroku
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/nabe1'
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

// ROUTES FOR SF NABES

app.get('/api/sfNabes', function (req, res) {
  NabesSF.find(function (err, sfneighb) {
    res.json(sfneighb);
  });
});

// set up post route to post new nabes
app.post('/api/sfNabes', function (req, res) {
  // create new blogpost with form data (`req.body`)
  var newNabe = new NabesSF({
    nabesName: req.body.nabesName,
    nabesTags: req.body.nabesTags
  });
  // save new blogpost in db
  newNabe.save(function (err, savedNabe) {
    res.json(savedNabe);
  });
});

app.put('/api/sfNabes/:nabesName', function (req, res) {
  // set the value of the id
  var targetNabe = req.params.nabesName;
  // find blogpost in db by id
  NabesSF.findOne({nabesName: targetNabe}, function (err, foundSfNabe) {
    // update the blogpost's word and definition
    foundSfNabe.nabesName = req.body.nabesName;
    foundSfNabe.nabesTags = req.body.nabesTags;

    // save updated blogpost in db
    foundSfNabe.save(function (err, savedNabe) {
      res.json(savedNabe);
    });
  });
});

// delete SF nabes
app.delete('/api/sfNabes/:nabesName', function (req, res) {
  // set the value of the id
  var targetNabe = req.params.nabesName;

  // find blogpost in db by id and remove
  NabesSF.findOneAndRemove({nabesName: targetNabe}, function (err, deletedNabe) {
    res.json(deletedNabe);
  });
});

// ROUTES FOR NY NEIGHBORHOODS

// app.get('/api/nyNabes', function (req, res) {
//   NabesNY.find(function (err, nyneighb) {
//     res.json(nyneighb);
//   });
// });

// // set up post route to post new nabes
// app.post('/api/nyNabes', function (req, res) {
//   // create new blogpost with form data (`req.body`)
//   var newNabe = new NabesNY({
//     nabesName: req.body.nabesName,
//     nabesTags: req.body.nabesTags
//   });
//   // save new blogpost in db
//   newNabe.save(function (err, savedNabe) {
//     res.json(savedNabe);
//   });
// });

// app.put('/api/nyNabes/:nabesName', function (req, res) {
//   // set the value of the id
//   var targetNabe = req.params.nabesName;
//   // find blogpost in db by id
//   NabesNY.findOne({nabesName: targetNabe}, function (err, foundNyNabe) {
//     // update the blogpost's word and definition
//     foundNyNabe.nabesName = req.body.nabesName;
//     foundNyNabe.nabesTags = req.body.nabesTags;

//     // save updated blogpost in db
//     foundNyNabe.save(function (err, savedNabe) {
//       res.json(savedNabe);
//     });
//   });
// });

// // delete SF nabes
// app.delete('/api/nyNabes/:nabesName', function (req, res) {
//   // set the value of the id
//   var targetNabe = req.params.nabesName;

//   // find blogpost in db by id and remove
//   NabesNY.findOneAndRemove({nabesName: targetNabe}, function (err, deletedNabe) {
//     res.json(deletedNabe);
//   });
// });

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server started on localhost:3000');
});