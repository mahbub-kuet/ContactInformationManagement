$(document).ready(function(){	

  $('#refreshBtn').click(function(){
         window.location.reload();
  });  

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

	(function (){			
		for(var i in tbClients){
			var cli = JSON.parse(tbClients[i]);			
		  	$("#tblList tbody").append("<tr>"+									 	
										 "	<td>"+cli.FirstName+"</td>" + 
										 "	<td>"+cli.LastName+"</td>" + 
										 "	<td>"+cli.Mobile+"</td>" + 
										 "	<td>"+cli.Email+"</td>" + 
										 "	<td>"+cli.Address+"</td>" + 
										  "	<td><img src='edit.png' alt='Edit' onclick='BtnEdit("+i+")' class='btnEdit'/><img src='delete.png' alt='Delete' onclick='BtnDelete("+i+")' class='btnDelete'/></td>" + 
		  								 "</tr>");
		}
	})();	
	
}); 