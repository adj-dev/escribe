$(function () {

  //var attempt = 3; // Variable to count number of attempts.
  // Below function Executes on click of login button.
  $(document).on("click", "#login-btn", function (event) {
    event.preventDefault();
    let email = $("#login-email").val().trim();
    let password = $("#login-password").val().trim();

    let body = { email, password };
    let url = "/whodis";
    $.ajax({
      type: "POST",
      url: url,
      data: body
    })
      .then(function (response) {
        if (response.success) {
          location.href = "/";
        }
      })
      .catch(function (error) {
        if (error) {
          $(".invalid-login").show();
        }
      });
  });



  // Event listener for `to-signup` button on login form
  $(document).on("click", "#to-signup", function () {
    // Hide the login form
    $(".container-login").hide();
    // Show the sign-up form
    $(".container-signup").show();
  });



  // Event listener for `login` form link
  $(document).on("click", "#to-login", function () {
    // Hide the sign-up form
    $(".container-signup").hide();
    // Show the login form
    $(".container-login").show();
  });




  // Event listener for sign-up form submit
  $(document).on("click", "#signup-btn", function (event) {
    event.preventDefault();

    let firstName = $("#first-name").val().trim();
    let lastName = $("#last-name").val().trim();
    let email = $("#new-email").val().trim();
    let phone = $("#phone").val().trim();
    let password = $("#new-password").val().trim();

    //----------------------------------------//
    //                                        //
    //  Will eventually need to validate form //
    //                                        //
    //----------------------------------------//

    let body = { firstName, lastName, email, phone, password };
    let url = "/signup";

    $.ajax({
      type: "POST",
      url: url,
      data: body
    })
      .then(function (response) {
        if (response) {
          location.href = "/";
        }

        // The code below was an attempt for automatic login after signup

        // automatically log in if successful
        // console.log(response);
        // $.ajax({
        //   type: "POST",
        //   url: "/whodis",
        //   data: response
        // })
        //   // redirect to homepage if successful
        //   .then(function (response) {
        //     if (response.success) {
        //       location.href = "/";
        //     }
        //   })
        //   .catch(function (error) {
        //     if (error) {
        //       $("#login-message").html("Oops! Something went wrong, try loggin in.");
        //     }
        //   });
      })
      .catch(function (error) {
        if (error) {
          return console.log(err);
        }
      });

  });
});