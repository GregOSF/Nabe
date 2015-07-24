$(function() {

  var navController = {

    // compile underscore template for nav links
    navTemplate: _.template($('#nav-template').html()),

    // get current (logged-in) user
    showCurrentUser: function() {
      // AJAX call to server to GET /api/users/current
      $.get('/api/users/current', function(user) {
        console.log(user);

        // pass current user through template for nav links
        $navHtml = $(navController.navTemplate({currentUser: user}));

        // append nav links HTML to page
        $('#nav-links').append($navHtml);
      });
    }
  };

  navController.showCurrentUser();

  // template for neighborhood lists
  var $nabeLinkTemplate = _.template($('#nabe-link-template').html());

  // AJAX call to get list of SF Nabes and render on page
    // Click event for AJAX call to search NyNabes DB for matching values
  $.get('api/sfnabes', function(data){
    _.each(data, function(nabe) {
      nabe.nabeClass = "sf-nabe"
      console.log(nabe)
      $('#sf-list').append($nabeLinkTemplate(nabe));
    })
    $('.sf-nabe').click(function(e) {
      var nabe = { _id: $(this).attr('id') }
      $('.nyc-nabe').hide();
      $.post('/nyc-search', nabe, function(data) {
        _.each(data, function(el) {
          $("#" + el).show();
        });
      });
    });
  });

  // AJAX call to get list of NY Nabes and render on page
    // Click event for AJAX call to search SfNabes DB for matching values
  $.get('api/nyNabes', function(data){
    console.log(data);
    _.each(data, function(nabe) {
      nabe.nabeClass = "nyc-nabe"
      $('#nyc-list').append($nabeLinkTemplate(nabe));
    })
    $('.nyc-nabe').click(function(e) {
      var nabe = { _id: $(this).attr('id') }
      $('.sf-nabe').hide();
      $.post('/sf-search', nabe, function(data) {
        _.each(data, function(el) {
          $("#" + el).show();
        // })
        });
      });
    });
  });

  $('#clear').click(function(e) {    
  });

  // Initially hide nabe lists until click event
  $('#sf-list').css("display", "none");
  $('#sfHead').on("click", function () {
    $('#sf-list').show();
    $('#nyc-list').show();
  });

  $('#nyc-list').css("display", "none");
  $('#nyhead').on("click", function () {
    $('#nyc-list').show();
    $('#sf-list').show()
  });
});
