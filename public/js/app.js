$( document ).ready(function(){

    var config = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        storageBucket: "",
        messagingSenderId: 1234
    };

var database = ();

$("#addUser").on("click", function (event) {
    event.preventDefault();
    
    var userid = $("#userid").val().trim();
    var firstname = $("#firstname").val().trim();
    var lastname = $("#lastname").val().trim();
    var useremail = $("#useremail").val().trim();
    var password = $("#password").val().trim();
    var phonenumber = $("#phonenumber").val().trim();
    var instructor = $("#instructor").val().trim();
    var notes = $("#notes").val().trim();

    database.ref().push({
        userid: userid,
        firstname: firstname,
        lastname: lastname,
        useremail: useremail,
        password: password,
        phonenumber: phonenumber,
        instructor: instructor,
        notes: notes,
    });  

});

database.ref().on("child_added", function (childSnapshot) {
    
    var newuserid = childSnapshot.val().trainName;
    var newfirstname = childSnapshot.val().firstname;
    var newlastname = childSnapshot.val().lastname;
    var newuseremail = childSnapshot.val().useremail;
    var newpassword = childSnapshot.val().password;
    var newphonenumber = childSnapshot.val().phonenumber;
    var newinstructor = childSnapshot.val().instructor;
    var newnotes = childSnapshot.val().notes;

    $("#all-display").append(
        ' <tr><td>' + newuserid +
        ' </td><td>' + newfirstname +
        ' </td><td>' + newlastname +
        ' </td><td>' + newuseremail +
        ' </td><td>' + newpassword +
        ' </td><td>' + newphonenumber +
        ' </td><td>' + newinstructor +
        ' </td><td>' + newnotes + ' </td></tr>');
  
      $("#trainname, #firstname, #lastname, #useremail, #password, #phonenumber, #instructor, #notes").val("");
      return false;

},

function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });



});