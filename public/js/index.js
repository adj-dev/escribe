// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleLessonExpand = function () {
  var id = $(this).attr("data-id");
  $(".lesson").css("background-color", "white");
  $(this).css("background-color", "whitesmoke");
  console.log(id);

  $(".lesson-body").css("display", "none");
  $("#" + id + "-lesson").css("display", "block");
};

var handleStudentExpand = function () {
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
$(document).on("click", ".lesson", handleLessonExpand);
$(document).on("click", ".student", handleStudentExpand);

$("#password, #confirm_password").on("keyup", function () {
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

$(function () {
  // toggles the display for student modal
  $(document).on("click", "#student-modal", function (event) {
    event.preventDefault();
    // show the modal
    console.log(event);
    $("#addStudentModal").css("display", "flex");
  });

  // toggles the display for lesson modal
  $(document).on("click", "#lesson-modal", function (event) {
    event.preventDefault();
    // show the modal
    $("#addLessonModal").css("display", "flex");
  });

  // event handler to add a student
  $(document).on("click", "#add-student", function () {
    // console.log(event);
    let firstName = $("#first-name").val().trim();
    let lastName = $("#last-name").val().trim();
    let password = $("#new-password").val().trim();
    // Will need to validate eventually
    let email = $("#new-email").val().trim();
    let phone = $("#new-phone").val().trim();
    let notes = $("#new-notes").val().trim();

    let body = {
      firstName,
      lastName,
      password,
      email,
      phone,
      notes
    };
    let url = "/api/student";

    $.ajax({
      method: "POST",
      url,
      data: body
    })
      .then(() => {
        href.location = "/";
      });

    // hide modal
    $("#addStudentModal").hide();

  });

  // event handler to add a lesson
  $(document).on("click", "#add-lesson", function (event) {
    event.preventDefault();
    console.log(event);
    // hide the modal
    $("#addLessonModal").hide();
  });


  // Cancel model
  $(document).on("click", "#cancel-modal", function () {
    $("#addStudentModal").hide();
    $("#addLessonModal").hide();
  });
});
