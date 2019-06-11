// any time any element with the 'delete_class' on it is clicked, then
$(document).on('click', '.delete_class', function(e) {
    var row = $(this).closest('tr');
  
    var data = {
      table: $('[name="table_name"]').val(),
      id: $('[name="user_id"]').val()
    };
  
    $.post('del.php', data, function(r) {
      // do some special stuff with your json response 'r' (javascript object)
      
  
      // do what you showed us you are doing, displaying a message
      $('#message').html("<h2>!</h2>")
        .append("<p>Student record deleted</p>")
        .hide();
  
      // remove the row, since it is gone from the DB
      row.remove();
    }, 'json');
  });

  // define a delete function that accepts a table name an id

// define some functions to sanitize your $_POST data, to prevent SQL Injection.
// run said functions before you get to this point

// json response function, since you said you want a response from your js
function respond($data) {
    echo @json_encode($data);
    exit;
  }
  
  if (empty($_POST)) respond(array('error' => 'Invalid request')); 
  
  $table_name = $_POST['table_name'];
  $id = $_POST['id'];
  
  $response = deleteRecord($table_name, $id);
  
  if ($response == $what_you_expect_on_a_successful_delete) {
    // create a response message, in associative array form
    $message = array('success' => true);
  
    // add some other information to your message as needed
    $message['sideNote'] = 'I like waffles.';
  
    // respond with your message
    respond($message);
  }
  
  // if we got this far your delete failed
  respond(array('error' => 'Request Failed'));

  function (errorObject) {
    console.log("Errors handled: " + errorObject.code);




};