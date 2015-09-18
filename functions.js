$(document).ready(function(){

	//var selected_index = -1; //Index of the selected list item
	//$.app=ContactManagement.getSelectedIndex();

	var tbClients = localStorage.getItem("tbClients");//Retrieve the stored data

	tbClients = JSON.parse(tbClients); //Converts string to object
	var matchClients = localStorage.getItem("matchClients");//Retrieve the stored data
    matchClients = JSON.parse(matchClients); //Converts string to object

	if(tbClients == null) //If there is no data, initialize an empty array
		tbClients = [];


	/**
	 * @return {boolean}
	 */

  $('#refreshBtn').click(function(){
         window.location.reload();
  });

  function RenderContactTabel(){

  	var contactList=matchClients;
  	
  	for(var i in contactList){
			//console.log(i);
			//console.log(typeof(i));
			var cli = JSON.parse(matchClients[i]);
			//console.log(cli);
		  	$("#tblList tbody").append("<tr>"+									 	
										 "	<td>"+cli.FirstName+"</td>" + 
										 "	<td>"+cli.LastName+"</td>" + 
										 "	<td>"+cli.Mobile+"</td>" + 
										 "	<td>"+cli.Email+"</td>" + 
										 "	<td>"+cli.Address+"</td>" + 
										  "	<td><img src='edit.png' alt='Edit"+i+"' class='btnEdit'/><img src='delete.png' alt='Delete"+i+"' class='btnDelete'/></td>" +
		  								 "</tr>");
		}
  }
  

	function check_empty()
	{
		var address=document.getElementById('address').value;
		if(address=="" || address==null)
		{
			document.getElementById('addressNote').value=" * Address is required. ";
			document.getElementById('addressNote').style.color="red";
			return false;
		}
		else
		{
			document.getElementById('addressNote').value="";

		}
	}
	function Add(){

		var address=document.getElementById('address').value;
		if(address=="" || address==null)
		{
			//document.getElementById('addressNote').innerHTML=" * Address is required. ";
			//document.getElementById('addressNote').style.color="red";
			alert(" Address field is required ")
			return false;
		}

		var client = JSON.stringify({
			FirstName : $("#fname").val(),
			LastName  : $("#lname").val(),
			Mobile : $("#mobile").val(),
			Email : $("#email").val(),
			Address : $("#address").val()

		});
		tbClients.push(client);
		localStorage.setItem("tbClients", JSON.stringify(tbClients));
		//alert("Contat has added.");
		return true;
	}

	// function Delete(){
	// 	tbClients.splice(selected_index, 1);
	// 	localStorage.setItem("tbClients", JSON.stringify(tbClients));
	// 	//alert("Client deleted.");
	// }

	function List(){		
		
		for(var i in tbClients){
			var cli = JSON.parse(tbClients[i]);
			//console.log(i);
			//console.log(typeof(i));
		  	$("#tblList tbody").append("<tr>"+									 	
										 "	<td>"+cli.FirstName+"</td>" + 
										 "	<td>"+cli.LastName+"</td>" + 
										 "	<td>"+cli.Mobile+"</td>" + 
										 "	<td>"+cli.Email+"</td>" + 
										 "	<td>"+cli.Address+"</td>" + 
										  "	<td><img src='edit.png' alt='Edit' onclick='app.BtnEdit("+i+")' class='btnEdit'/><img src='delete.png' alt='Delete' onclick='app.BtnDelete("+i+")' class='btnDelete'/></td>" + 
		  								 "</tr>");
		}
	}

	function searchList(){	
		$("#tblList tbody").html("");
		
		for(var i in matchClients){
			
			var cli = JSON.parse(matchClients[i]);
			//console.log(cli);
		  	$("#tblList tbody").append("<tr>"+									 	
										 "	<td>"+cli.FirstName+"</td>" + 
										 "	<td>"+cli.LastName+"</td>" + 
										 "	<td>"+cli.Mobile+"</td>" + 
										 "	<td>"+cli.Email+"</td>" + 
										 "	<td>"+cli.Address+"</td>" + 
										  "	<td><img src='edit.png' alt='Edit' onclick='BtnEdit("+i+")' class='btnEdit'/><img src='delete.png' alt='Delete' onclick='BtnDelete("+i+")' class='btnDelete'/></td>" +
		  								 "</tr>");
		}

	}

	$("#frmCadastre").bind("submit",function(){
            //check_empty();
			return Add();

	});

	List();

	$("#searchbtn").bind("click",function(){	
		var key= document.getElementById('searchbox').value;
		if(key=="" || key==null)
		{
			alert("no value is given")
			return false;
		}  		

	matchClients=null;

	if(matchClients == null) //If there is no data, initialize an empty array
		matchClients = [];
	for(var i in tbClients){
			var cli = JSON.parse(tbClients[i]);
			if(cli.Mobile==key)
			{

				//console.log(cli);
				matchClients.push(tbClients[i]);
				localStorage.setItem("matchClients", JSON.stringify(matchClients));
			}
		}
		searchList();
		document.getElementById('searchbox').value="";
		return true;
		
	});

	// $(".btnEdit").bind("click", function(){

	// 	//operation = "E";
	// 	//document.getElementById('abc').style.display = "block";
	// 	document.getElementById('abc').style.display = "block";
	// 	selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
	// 	//console.log(this);
	// 	//console.log(selected_index);
	// 	var cli = JSON.parse(tbClients[selected_index]);
	// 	//console.log(cli);
	// 	$("#ufname").val(cli.FirstName);
	// 	$("#ulname").val(cli.LastName);
	// 	$("#umobile").val(cli.Mobile);
	// 	$("#uemail").val(cli.Email);
	// 	$("#uaddress").val(cli.Address);		
	// 	$("#ufname").focus();
	// });





	
$("#btnCancel").bind("click", function(){
		document.getElementById('abc').style.display = "none";
	});

$("#btnUpdate").bind("click", function(){

    if($("#ufname").val()=="")
    {
        alert("First Name is required; ")
        return false;
    }
    if($("#ulname").val()=="")
    {
        alert("Last Name is required; ")
        return false;
    }
    if($("#umobile").val()=="")
    {
        alert("Mobile is required; ")
        return false;
    }
    if($("#uemail").val()=="")
    {
        alert(" Email is required; ")
        return false;
    }
    if($("#uaddress").val()=="")
    {
        alert("Address is required; ")
        return false;
    }

		tbClients[selected_index] = JSON.stringify({
			FirstName : $("#ufname").val(),
			LastName  : $("#ulname").val(),
			Mobile : $("#umobile").val(),
			Email : $("#uemail").val(),
			Address : $("#uaddress").val()
			});//Alter the selected item on the table


		localStorage.setItem("tbClients", JSON.stringify(tbClients));
		//alert("Contact has updated.")
		//operation = "A"; //Return to default value
		document.getElementById('abc').style.display = "none";
	    window.location.reload();
		return true;
	});

// $(".btnDelete").bind("click", function(){
// 	var result = confirm("Are you absolutely sure you want to delete?");
// 	if (result) {
// 		selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
// 		Delete();
// 		window.location.reload();
// 	}

// 	});



}); 