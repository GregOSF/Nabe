// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require('underscore'),
    mongoose = require('mongoose'),
    NabesSF = require('./models/nabes'),
    session = require('express-session'),
    User = require('./models/user');
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

// AUTHENTICATION

// middleware
app.use(bodyParser.urlencoded({extended: true}));
// set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60000 }
}));


// middleware to manage sessions
app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user.id;
  };

  // finds user currently logged in based on `session.userId`
  req.currentUser = function (callback) {
    User.findOne({_id: req.session.userId}, function (err, user) {
      req.user = user;
      callback(null, user);
    });
  };

  // destroy `session.userId` to log out user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };

  next();
});


// signup route with placeholder response
app.get('/api/signup', function (req, res) {
  res.send('coming soon');
});

// user profile page


// user submits the signup form
app.post('/api/users', function (req, res) {

  // grab user data from params (req.body)
  var newUser = req.body.user;

  // create new user with secure password
  User.createSecure(newUser.email, newUser.password, function (err, user) {
    // res.send(user);
    req.login(user);
    res.redirect('/');
  });
});


app.get('/api/users/current', function (req, res) {
  // check for current (logged-in) user
  req.currentUser(function (err, user) {
    res.json(user);
  });
});



app.post('/api/login', function (req, res) {

  // grab user data from params (req.body)
  var userData = req.body.user;

  // call authenticate function to check if password user entered is correct
  User.authenticate(userData.email, userData.password, function (err, user) {
    // saves user id to session
    req.login(user);

    // redirect to user profile
    res.redirect('/');
  });
});

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// log out user (destroy session)
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});



// END AUTHENTICATION


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

app.put('/api/sfNabes/:id', function (req, res) {
  // set the value of the id
  var targetNabe = req.params.id;
  // find blogpost in db by id
  NabesSF.findOne({_id: targetNabe}, function (err, foundSfNabe) {
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
app.delete('/api/sfNabes/:id', function (req, res) {
  // set the value of the id
  var targetNabe = req.params.id;

  // find blogpost in db by id and remove
  NabesSF.findOneAndRemove({_id: targetNabe}, function (err, deletedNabe) {
    res.json(deletedNabe);
  });
});

// ROUTES FOR NY NEIGHBORHOODS

// app.get('/api/nyNabes', function (req, res) {
//   NabesNY.find(function (err, nyneighb) {
//     res.json(nyneighb);
//   });
// });

// set up post route to post new nabes
app.post('/api/nyNabes', function (req, res) {
  // create new blogpost with form data (`req.body`)
  var newNabe = new NabesNY({
    nabesName: req.body.nabesName,
    nabesTags: req.body.nabesTags
  });
  // save new blogpost in db
  newNabe.save(function (err, savedNabe) {
    res.json(savedNabe);
  });
});

app.put('/api/nyNabes/:nabesName', function (req, res) {
  // set the value of the id
  var targetNabe = req.params.nabesName;
  // find blogpost in db by id
  NabesNY.findOne({nabesName: targetNabe}, function (err, foundNyNabe) {
    // update the blogpost's word and definition
    foundNyNabe.nabesName = req.body.nabesName;
    foundNyNabe.nabesTags = req.body.nabesTags;

    // save updated blogpost in db
    foundNyNabe.save(function (err, savedNabe) {
      res.json(savedNabe);
    });
  });
});

// delete SF nabes
app.delete('/api/nyNabes/:nabesName', function (req, res) {
  // set the value of the id
  var targetNabe = req.params.nabesName;

  // find blogpost in db by id and remove
  NabesNY.findOneAndRemove({nabesName: targetNabe}, function (err, deletedNabe) {
    res.json(deletedNabe);
  });
});

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server started on localhost:3000');
});