//var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
$(document).ready(function() {
  $(document).on("click", "#login-button", function(event) {
    event.preventDefault();
    let email = $("#login-email").val();
    let password = $("#login-password").val();
    console.log(email);
    console.log(password);

    let body = { email, password };
    let url = "/whodis";
    $.ajax({
      type: "POST",
      url: url,
      data: body
    })
      .then(function(response) {
        if (response.success) {
          location.href = "/";
        }
      })
      .catch(function(error) {
        if (error) {
          $("#login-message").html("Incorrect username or password");
        }
      });
    // if (email === "Formget" && password === "formget#123") {
    //   alert("Login successful");
    //   window.location = "success.html"; // Redirecting to other page.
    //   return false;
    // } else {
    //   attempt--; // Decrementing by one.
    //   alert("You have left " + attempt + " attempt;");
    //   // Disabling fields after 3 attempts.
    //   if (attempt === 0) {
    //     document.getElementById("username").disabled = true;
    //     document.getElementById("password").disabled = true;
    //     document.getElementById("submit").disabled = true;
    //     return false;
    //   }
    // }
  });
});
