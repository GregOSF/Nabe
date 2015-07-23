$(function() {

  var nabeController = {

    // Nabe Dropdown Template
    templateDrop: _.template($('#nabeListTemplate').html()),

    // NabeSF show
    templateSf: _.template($('#nabeSfTemp').html()),
  

    // pass blog posts through template and append to view

    renderNabeDrop: function(nabeObj) {
      var $nabesHtml = $(nabeController.templateDrop(nabeObj));
      $('#nabeSelect').append($nabesHtml);
    },

    renderSfPanel: function(nabe1) {
      var $nabesHtml = $(nabeController.templateSf(nabe1));
      $('#nabeSfPanel').append($nabesHtml);
    },

    // Drop down nabes
    nabeDrops: function() {
      $.get ('/api/sfNabes', function(data) {
        var allNabes = data;

        _.each(allNabes, function(nabe) {
          nabeController.renderNabeDrop(nabe);
          
        // });
        // postController.addEventHandlers();
        });
          nabeController.nabePickClick();
      });
    },

    nabePickDrop: function (nabesName) {
        $.get ('/api/sfNabes/' + nabesName, function(data) {
          var oneNabe = data;
          console.log(oneNabe);
          // _.each(oneNabe, function(nabe2) {
            nabeController.renderSfPanel(oneNabe);
          


          // postController.addEventHandlers();
          // nabeController.nabePickClick();
        });

    },  

    nabePickClick: function () {

      // $('#nabeClick').click(function(e) {
      //     alert('alerted' + poop);
      //     e.preventDefault();// prevent the default anchor functionality
      // });


      $('#nabeClick').on('click', function(event) {
        event.preventDefault();
        console.log("poop");
        var nabeId = $(this).closest('#nabeListItems').attr('data-id');
        nabeController.nabePickDrop(nabeId);
        console.log(nabeId);
      });
    }




        // // find the posts's id (stored in HTML as `data-id`)
        // var postId = $(this).closest('.blogPost').attr('data-id');
        // // udpate the post with form data
        // var updatedUser = $(this).find('.updated-user').val();
        // var updatedLoc = $(this).find('.updated-loc').val();
        // var updatedDesc = $(this).find('.updated-post').val();
        // postController.update(postId, updatedUser, updatedLoc, updatedDesc);
        // })


    // nabePanelOne: function() {
    //   $.get ('/api/sfNabes', function(data) {
    //     var nabetags = data;

    //     _.each(nabetags, function(nabe2) {
    //       nabeController.renderSfPanel(nabe2);
    //     // });
    //     // postController.addEventHandlers();
    //     });
    //   });
    // },


  };

    nabeController.nabeDrops();
    // nabeController.nabePanelOne();

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

  // nabeController.all();
  navController.showCurrentUser();



});

    // Post new data
    // create: function(newUser, newPlace, newDesc) {
    //   var newPostData = {user: newUser, place: newPlace, post: newDesc};
    //       $.post ('/blogposts', newPostData, function(data) {
    //         var newPost = data;
    //         postController.render(newPost)
    //       });
    // },

    // Update existing posts
    // update: function (postId, updatedUser, updatedLoc, updatedDesc) {
    //   $.ajax( {
    //     type: 'PUT',
    //     url: '/blogposts/' + postId,
    //     data: {
    //       user: updatedUser,
    //       place: updatedLoc,
    //       post: updatedDesc
    //     },
    //     success: function (data) {
    //       var updatedPost = data;
    //       var $blogHtml = $(postController.template(updatedPost));
    //       $('#blog-' + postId).replaceWith($blogHtml);
    //     }
    //   });
    // },

    // delete: function(postId) {
    //   // send DELETE request to server to delete phrase
    //   $.ajax({
    //     type: 'DELETE',
    //     url: '/blogposts/' + postId,
    //     success: function(data) {   
    //       // remove deleted phrase from view
    //       $('#blog-' + postId).remove();
    //     }
    //   });
    // },

    // Event Handlers for Updating/Deleting

    // addEventHandlers: function() {
    //   $('#new-Posts')

    //     .on('submit', '.update-post', function(event) {
    //     event.preventDefault();
    //     console.log("poop");
    //     // find the posts's id (stored in HTML as `data-id`)
    //     var postId = $(this).closest('.blogPost').attr('data-id');
    //     // udpate the post with form data
    //     var updatedUser = $(this).find('.updated-user').val();
    //     var updatedLoc = $(this).find('.updated-loc').val();
    //     var updatedDesc = $(this).find('.updated-post').val();
    //     postController.update(postId, updatedUser, updatedLoc, updatedDesc);
    //     })
                      
    //     // for delete: click event on `.removeButton` button
    //     .on('click', '.removeButton', function(event) {
    //     event.preventDefault();
    //     // find the post's id
    //     var postId = $(this).closest('.blogPost').attr('data-id');
    //     // delete the posts
    //     postController.delete(postId);
    //   });
    // },

  //   setupView: function() {
  //     // Append existing blog posts
  //     nabeController.all();
  //     // Add event handler to new blogpost
  //     $('#new-Entry').on('submit', function(event) {
  //       event.preventDefault();
  //       // create new blog post
  //       var $newUser = $('#user-name').val();
  //       var $newPlace = $('#user-place').val();
  //       var $newDesc = $('#user-post').val();
  //       postController.create($newUser, $newPlace, $newDesc);
  //       // form reset
  //       $(this)[0].reset();
  //       $('#user-name').focus();
  //     });
  //   }
  // };

  // nabeController.setupView();


  /*function NewPost(user, loc, post) {
    this.user = user;
    this.loc = loc;
    this.post = post;
  }*/

  

  /*NewPost.all = [
        new NewPost('Jack', 'Patagonia', 'Cupcake ipsum dolor sit. Amet I love liquorice jujubes pudding croissant I love pudding. Apple pie macaroon toffee jujubes pie tart cookie applicake caramels. Halvah macaroon I love lollipop. Wypas I love pudding brownie cheesecake tart jelly-o. Bear claw cookie chocolate bar jujubes toffee.'),
        new NewPost('Alice', 'Himalayas', 'Cupcake ipsum dolor sit. Amet I love liquorice jujubes pudding croissant I love pudding. Apple pie macaroon toffee jujubes pie tart cookie applicake caramels. Halvah macaroon I love lollipop. Wypas I love pudding brownie cheesecake tart jelly-o. Bear claw cookie chocolate bar jujubes toffee.'),
        new NewPost('Sarah', 'Grand Canyon', 'Cupcake ipsum dolor sit. Amet I love liquorice jujubes pudding croissant I love pudding. Apple pie macaroon toffee jujubes pie tart cookie applicake caramels. Halvah macaroon I love lollipop. Wypas I love pudding brownie cheesecake tart jelly-o. Bear claw cookie chocolate bar jujubes toffee.')
  ];*/

 /* NewPost.prototype.save = function() {
    NewPost.all.push(this);
    console.log(NewPost.all);
  };

  NewPost.prototype.render = function() {
    var $newPost = $(newPostTemplate(this));
    this.index = NewPost.all.indexOf(this);
    $newPost.attr('data-index', this.index);

    $newPosts.prepend($newPost);
  };

  var $newEntry = $('#new-Entry');  
  var $newPosts = $('#new-Posts');
  var newPostTemplate = _.template($('#post-template').html());

  
  _.each(NewPost.all, function (NewPost, index) {
    NewPost.render();
  });

  
  $newEntry.on('submit', function(event) {
    event.preventDefault();

  
  var $userName = $('#user-name').val();
  var $userLoc = $('#user-location').val();
  var $userPost = $('#user-post').val();
  var newBlog = new NewPost($userName, $userLoc, $userPost);
  var $postCont = $('#newPostContainer')

  
  newBlog.save();


  newBlog.render();


  $newEntry[0].reset();
  $('#user-name').focus();
  });
*/
  
/*  $newPosts.on('click', '.blogPost', function() {
    $(this).toggleClass('removePost');
  });*/

/*  var $blogPost = $('.blogPost')
  var $removeButton = $('.removeButton')*/

  /*$blogPost.on("click", function (event) {
    event.preventDefault();
    var $blogPosts = $(this).closest(".blogPost");
    var index = $blogPost.attr('data-index');
    $(this).fadeOut("slow");*/
/*
    $(document).on("click", '.blogPost', function (event) {
      event.preventDefault();
      var $blogPosts = $(this).closest(".blogPost");
      var index = $blogPost.attr('data-index');
      $(this).fadeOut("slow");*/

/*  $('#new-Posts').on("click", function(event) {
  event.preventDefault();
  $(this).fadeOut("slow");
  });
*/
  
/*  NewPost.all.splice(index, 1);
  console.log(NewPost.all);*/


/*  $blogPost.remove();*/


/*  $('.blogPost').each(function(index) {
    $(this).attr('data-index', index);
 
  });*/





