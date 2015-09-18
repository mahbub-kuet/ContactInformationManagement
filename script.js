// var ContactManagement=function ()
// {
// 	this.selected_index=-1;
// 	this.getSelectedIndex=function(){
// 		return selected_index;
// 	}
// 	this.BtnEdit=function(index){
//          document.getElementById('abc').style.display = "block";		
// 		selected_index=index;		
// 		var tbClients = localStorage.getItem("tbClients");
// 		tbClients = JSON.parse(tbClients);
// 		var cli = JSON.parse(tbClients[index]);
		
// 		$("#ufname").val(cli.FirstName);
// 		$("#ulname").val(cli.LastName);
// 		$("#umobile").val(cli.Mobile);
// 		$("#uemail").val(cli.Email);
// 		$("#uaddress").val(cli.Address);		
// 		$("#ufname").focus();
// 	}
// 	this.BtnDelete=function (index){
// 		var result = confirm("Are you absolutely sure you want to delete?");
// 	    if (result) {
// 	    var tbClients = localStorage.getItem("tbClients");
// 		tbClients = JSON.parse(tbClients);		
// 		tbClients.splice(index, 1);
// 		localStorage.setItem("tbClients", JSON.stringify(tbClients));
// 		window.location.reload();
// 	}

// 	}
// }
// var selected_index = -1;
function BtnEdit(index){
  	document.getElementById('abc').style.display = "block";		
		selected_index=index;		
		var tbClients = localStorage.getItem("tbClients");
		tbClients = JSON.parse(tbClients);
		var cli = JSON.parse(tbClients[index]);
		
		$("#ufname").val(cli.FirstName);
		$("#ulname").val(cli.LastName);
		$("#umobile").val(cli.Mobile);
		$("#uemail").val(cli.Email);
		$("#uaddress").val(cli.Address);		
		$("#ufname").focus();
  }


  function BtnDelete(index){
  	var result = confirm("Are you absolutely sure you want to delete?");
	if (result) {
	    var tbClients = localStorage.getItem("tbClients");
		tbClients = JSON.parse(tbClients);		
		tbClients.splice(index, 1);
		localStorage.setItem("tbClients", JSON.stringify(tbClients));
		window.location.reload();
	}
  }