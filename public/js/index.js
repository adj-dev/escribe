// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleLessonExpand = function() {
  var id = $(this).attr("data-id");
  $(".lesson").css("background-color", "white");
  $(this).css("background-color", "whitesmoke");
  console.log(id);

  $(".lesson-body").css("display", "none");
  $("#" + id + "-lesson").css("display", "block");
};

var handleStudentExpand = function() {
  var id = $(this).attr("data-id");
  $(".student").css("background-color", "white");
  $(".lesson").css("background-color", "white");
  $(this).css("background-color", "whitesmoke");
  console.log(id);

  $(".student-body").css("display", "none");
  $(".lesson-body").css("display", "none");
  $("#" + id + "-student").css("display", "block");
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$(document).on("click", ".lesson", handleLessonExpand);
$(document).on("click", ".student", handleStudentExpand);

$("#password, #confirm_password").on("keyup", function() {
  if ($("#password").val() === $("#confirm_password").val()) {
    $("#message")
      .html("Matching")
      .css("color", "green");
  } else {
    $("#message")
      .html("Not Matching")
      .css("color", "red");
  }
});

$(document).ready(function() {
  $("#tosignup").on("click", function() {
    var signIn = $(this).attr("click-id");
    $("#signInModal").hide();
    $(signIn).fadeIn(500);
  });

  $("#tologin").on("click", function() {
    var logIn = $(this).attr("click-id");
    $("#signUpModal").hide();
    $(logIn).fadeIn(500);
  });
});
