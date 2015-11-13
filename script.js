var ContactInfoManagement = {
	tbClients:[]
	, matchClients:[]
	, init: function(){
		var _this=ContactInfoManagement;
		_this.tbClients= JSON.parse(localStorage.getItem('tbClients'));
		_this.matchClients=JSON.parse(localStorage.getItem('matchClients'));
		_this.renderContactTabel(_this.tbClients);
	}
	, renderContactTabel: function (contactList) {
		$("#tblList tbody").html("");
		for (var i in contactList) {
			var cli = JSON.parse(contactList[i]);
			$("#tblList tbody").append("<tr>" +
				"	<td>" + cli.FirstName + "</td>" +
				"	<td>" + cli.LastName + "</td>" +
				"	<td>" + cli.Mobile + "</td>" +
				"	<td>" + cli.Email + "</td>" +
				"	<td>" + cli.Address + "</td>" +
				"	<td><img src='edit.png' alt='Edit' onclick='ContactInfoManagement.btnEdit(" + i + ")' class='btnEdit'/><img src='delete.png' alt='Delete' onclick='ContactInfoManagement.btnDelete(" + i + ")' class='btnDelete'/></td>" +
				"</tr>");
		}

	}
	, validationCheck: function () {
		if(fname.value && lname.value && email.value && mobile.value && address.value)
		   return true;
		if(!fname.value){
			$('#fname').css('float', 'left');
			$('#fname').parent().append('<p style="color:red;font:12px;">* FirstName is required.</p>');
		}

		if(!lname.value){
			$('#lname').css('float', 'left');
			$('#lname').parent().append('<p style="color:red;font:12px;">* FirstName is required.</p>');
		}

		if(!email.value){
			$('#email').css('float', 'left');
			$('#email').parent().append('<p style="color:red;font:12px;">* FirstName is required.</p>');
		}

		if(!mobile.value){
			$('#mobile').css('float', 'left');
			$('#mobile').parent().append('<p style="color:red;font:12px;">* FirstName is required.</p>');
		}

		if(!address.value){
			$('#address').css('float', 'left');
			$('#address').parent().append('<p style="color:red;font:12px;">* FirstName is required.</p>');
		}

		//var val = $('#' + formid + ' ul li:nth-child(1) input').val();
		//if (val == '' || val == null) {
		//	$('#' + formid + ' ul li:nth-child(1) input').css('float', 'left');
		//	$('#' + formid + ' ul li:nth-child(1)').append('<p style="color:red;font:12px;">* FirstName is required.</p>');
		//	return false;
		//}
		//val = $('#' + formid + ' ul li:nth-child(2) input').val();
		//if (val == '' || val == null) {
		//	$('#' + formid + ' ul li:nth-child(2) p').text('* LastName is required.').css('color', 'red');
		//	return false;
		//}
        //
		//val = $('#' + formid + ' ul li:nth-child(3) input').val();
		//if (val == '' || val == null) {
		//	$('#' + formid + ' ul li:nth-child(3) p').text('* Mobile is required.').css('color', 'red');
		//	return false;
		//}
		//val = $('#' + formid + ' ul li:nth-child(4) input').val();
		//if (val == '' || val == null) {
		//	$('#' + formid + ' ul li:nth-child(4) p').text('* Email is required.').css('color', 'red');
		//	return false;
		//}
		//val = $('#' + formid + ' textarea').val();
		//if (val == '' || val == null) {
		//	$('#' + formid + ' ul li:nth-child(5) p').text('* Address is required.').css('color', 'red');
		//	return false;
		//}
		//return true;
	}
	, addContact: function () {
		if (!ContactInfoManagement.validationCheck()) {
			return;
		}
		var client = JSON.stringify({
			FirstName: $("#fname").val(),
			LastName: $("#lname").val(),
			Mobile: $("#mobile").val(),
			Email: $("#email").val(),
			Address: $("#address").val()
		});
		ContactInfoManagement.tbClients.push(client);
		localStorage.setItem("tbClients", JSON.stringify(ContactInfoManagement.tbClients));
		fname.value=lname.value=email.value=mobile.value=address.value='';
		ContactInfoManagement.renderContactTabel(ContactInfoManagement.tbClients);

	}
	, searchContact: function () {
		var key = searchbox.value;
		if (!key) {
			alert("no value is given")
			return false;
		}
		ContactInfoManagement.matchClients = [];
		var tbClients=ContactInfoManagement.tbClients;
		for (var i in tbClients) {
			var cli = JSON.parse(tbClients[i]);
			if (cli.Mobile == key) {
				ContactInfoManagement.matchClients.push(tbClients[i]);
				localStorage.setItem("matchClients", JSON.stringify(ContactInfoManagement.matchClients));
			}
		}
		searchbox.value = '';
		ContactInfoManagement.renderContactTabel(ContactInfoManagement.matchClients);
	}
	, formUpdate: function (index) {
		if(!ufname.value || !ulname.value || !uemail.value || !umobile.value || !uaddress.value){
			alert('Empty field is not allowed')
			return;
		}
		var tbClients= ContactInfoManagement.tbClients;
		tbClients[index] = JSON.stringify({
			FirstName: $("#ufname").val(),
			LastName: $("#ulname").val(),
			Mobile: $("#umobile").val(),
			Email: $("#uemail").val(),
			Address: $("#uaddress").val()
		});//Alter the selected item on the table

		localStorage.setItem("tbClients", JSON.stringify(tbClients));
		abc.style.display = "none";
		ContactInfoManagement.renderContactTabel(tbClients);
	}
	, btnEdit: function (index) {
		abc.style.display = "block";
		var cli = JSON.parse(ContactInfoManagement.tbClients[index]);
		$('#popupContact').html("");
		$('#popupContact').append(
			'<form id="updateform">' +
			'<label>First Name:</label><input type="text" id="ufname" value="' + cli.FirstName + '"><br>' +
			'<label>Last Name:</label><input type="text" id="ulname" value="' + cli.LastName + '"><br>' +
			'<label>Mobile:</label><input type="text" id="umobile" pattern="[0-9]{11}" value="' + cli.Mobile + '"><br>' +
			'<label>Email:</label><input type="email" id="uemail" value="' + cli.Email + '"><br>' +
			'<label>Address:</label><textarea name="address" id="uaddress" value="' + cli.Address + '"></textarea><br>' +
			'<input type="button" value=" Update " onclick="ContactInfoManagement.formUpdate(' + index + ')"/>' +
			'<input type="button" value=" Cancel " onclick="ContactInfoManagement.cancelForm()" />' +
			'</form>');

		$("#uaddress").val(cli.Address);
		$("#ufname").focus();
	}
	, btnDelete: function (index) {
		var result = confirm("Are you absolutely sure you want to delete?");
		tbClients= ContactInfoManagement.tbClients;
		if (result) {
			tbClients.splice(index, 1);
			localStorage.setItem("tbClients", JSON.stringify(tbClients));
			ContactInfoManagement.renderContactTabel(tbClients);
		}
	}
	, cancelForm: function(){
		abc.style.display='none';
	}
};

$(document).ready(function () {
	ContactInfoManagement.init();
});