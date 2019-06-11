function edit_row(id) {
    var firstname=document.getElementById("firstnameval"+id).innerHTML;
    var lastname=document.getElementById("lastnameval"+id).innerHTML;
    var useremail=document.getElementById("useremailval"+id).innerHTML;
    var password=document.getElementById("password"+id).innerHTML;
    var phonenumber=document.getElementById("phonenumberval"+id).innerHTML;
    var notes=document.getElementById("notesval"+id).innerHTML;
    
    document.getElementById("firstnameval"+id).innerHTML="<input type='text' id='firstnametext"+id+"' value='"+firstname+"'>";
    document.getElementById("lastnameval"+id).innerHTML="<input type='text' id='lastnametext"+id+"' value='"+lastname+"'>";
    document.getElementById("useremailval"+id).innerHTML="<input type='text' id='useremailtext"+id+"' value='"+useremail+"'>";
    document.getElementById("passwordval"+id).innerHTML="<input type='text' id='passwordtext"+id+"' value='"+password+"'>";
    document.getElementById("phonenumberval"+id).innerHTML="<input type='text' id='phonenumbertext"+id+"' value='"+phonenumber+"'>";
    document.getElementById("notesval"+id).innerHTML="<input type='text' id='notestext"+id+"' value='"+notes+"'>";
    
    document.getElementById("edit_button"+id).style.display="none";
    document.getElementById("save_button"+id).style.display="block";
    }
    
    function saverow(id)   {
     
    var firstname=document.getElementById("firstnametext"+id).value;
    var lastname=document.getElementById("lastnametext"+id).value;
    var useremail=document.getElementById("useremailtext"+id).value;
    var password=document.getElementById("passwordtext"+id).value;
    var phonenumber=document.getElementById("phonenumbertext"+id).value;
    var notes=document.getElementById("notestext"+id).value;
    
    $.ajax ({
      type:'post',
      url:'modify_records.php',
      data:{
       edit_row:'edit_row',
       row_id:id,
       firstnameval:firstname,
       lastnameval:lastname,
       useremailval:useremail,
       passwordval:password,
       phonenumberval:phonenumber,
       notesval:notes,
    
      },
    
      success:function(response) {
    
        if(response=="success") {
            
            document.getElementById("firstnameval"+id).innerHTML=firstname;
            document.getElementById("lastnameval"+id).innerHTML=lastname;
            document.getElementById("useremailval"+id).innerHTML=useremail;
            document.getElementById("passwordval"+id).innerHTML=password;
            document.getElementById("phonenubmerval"+id).innerHTML=phonenumber;
            document.getElementById("notesval"+id).innerHTML=notes;
    
        document.getElementById("edit_button"+id).style.display="block";
        document.getElementById("save_button"+id).style.display="none";
       
         }
        }
      });
    }
    
    function delete_row(id) {
        $.ajax ({
            
            type:'post',
            url:'modify_records.php',
            data:{
            delete_row:'delete_row',
            row_id:id,
      
        },
    success:function(response) {
       
        if(response=="success") {
        
        var row=document.getElementById("row"+id);
            row.parentNode.removeChild(row);
       }
      }
     });
    }
    
    function insertrow()
    {
    var firstname=document.getElementById("newfirstname").value;
    var lastname=document.getElementById("newlastname").value;
    var useremail=document.getElementById("newuseremail").value;
    var password=document.getElementById("newpassword").value;
    var phonenumber=document.getElementById("newphonenumber").value;
    var notes=document.getElementById("newnotes").value;
     
     $.ajax
     ({
      type:'post',
      url:'modify_records.php',
      data:{
       insert_row:'insert_row',
       firstnameval:firstname,
       lastnameval:lastname,
       useremailval:useremail,
       passwordval:password,
       phonenumberval:phonenumber,
       notesval:notes,
      },
      success:function(response) {
       if(response!="")
       {
        var id=response;
        var table=document.getElementById("usertable");
        var table_len=(table.rows.length)-1;
        var row = table.insertRow(table_len).outerHTML="<tr id='row"+id+"'><td id='firstnameval"+id+"'>"+firstname+"</td><td id='lastnameval"+id+"'>"+lastname+"</td><td id='useremailval"+id+"'>"+useremail+"</td><td id='passwordval"+id+"'>"+password+"</td><td id='phonenumberval"+id+"'>"+phonenumber+"</td><td id='notesval"+id+"'>"+notes+"</td><td><input type='button' class='edit_button' id='edit_button"+id+"' value='edit' onclick='edit_row("+id+");'/><input type='button' class='save_button' id='save_button"+id+"' value='save' onclick='save_row("+id+");'/><input type='button' class='delete_button' id='delete_button"+id+"' value='delete' onclick='delete_row("+id+");'/></td></tr>";
    
        document.getElementById("newfirstname").value="";
        document.getElementById("newlastname").value="";
        document.getElementById("newuseremail").value="";
        document.getElementById("newpassword").value="";
        document.getElementById("newphonenumber").value="";
        document.getElementById("newnotes").value="";
       }
      }
     });
    }