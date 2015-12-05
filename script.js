var ContactInfoManagement = {
    tbClients: []
    , matchClients: []
    , init: function () {
        var _this = ContactInfoManagement;
        _this.tbClients = JSON.parse(localStorage.getItem('tbClients')) || [];
        _this.matchClients = JSON.parse(localStorage.getItem('matchClients')) || [];
        _this.renderContactTable();
    }
    , renderContactTable: function () {
        var contactList = ContactInfoManagement.tbClients;
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
    , renderSearchResult: function (resultContactList) {
        $("#tblList tbody").html("");
        for (var i in resultContactList) {
            var cli = JSON.parse(resultContactList[i]);
            $("#tblList tbody").append("<tr>" +
                "	<td>" + cli.FirstName + "</td>" +
                "	<td>" + cli.LastName + "</td>" +
                "	<td>" + cli.Mobile + "</td>" +
                "	<td>" + cli.Email + "</td>" +
                "	<td>" + cli.Address + "</td>" +
                "	<td><img src='edit.png' alt='Edit' onclick='ContactInfoManagement.editSearchContact(" + i + ")' class='btnEdit'/><img src='delete.png' alt='Delete' onclick='ContactInfoManagement.deleteSearchContact(" + i + ")' class='btnDelete'/></td>" +
                "</tr>");
        }

    }
    , validationCheck: function () {
        if (fname.value) {
            $('.span')[0].style.display = 'none';
        } else {
            $('.span')[0].style.display = 'inline';
            return false;
        }

        if (lname.value) {
            $('.span')[1].style.display = 'none';
        } else {
            $('.span')[1].style.display = 'inline';
            return false;
        }

        if (mobile.value) {
            $('.span')[2].style.display = 'none';
        } else {
            $('.span')[2].style.display = 'inline';
            return false;
        }
        if (email.value) {
            $('.span')[3].style.display = 'none';
        } else {
            $('.span')[3].style.display = 'inline';
            return false;
        }
        if (address.value) {
            $('.span')[4].style.display = 'none';
        } else {
            $('.span')[4].style.display = 'inline';
            return false;
        }

        return true;

    }
    , searchContact: function () {
        var key = searchBox.value;
        if (!key) {
            alert("no value is given")
            return false;
        }
        ContactInfoManagement.matchClients = [];
        var tbClients = ContactInfoManagement.tbClients;
        for (var i in tbClients) {
            var cli = JSON.parse(tbClients[i]);
            if (cli.Mobile == key) {
                ContactInfoManagement.matchClients.push(tbClients[i]);
                localStorage.setItem("matchClients", JSON.stringify(ContactInfoManagement.matchClients));
            }
        }
        searchBox.value = '';
        ContactInfoManagement.renderSearchResult(ContactInfoManagement.matchClients);
    }
    , searchOnKeyPress: function () {
        var key = searchBox.value;
        var tbClients = ContactInfoManagement.tbClients;
        for (var i in tbClients) {
            var cli = JSON.parse(tbClients[i]);
            console.log(cli.Mobile.search(key));
            if (cli.Mobile.search(key) !== -1) {
                ContactInfoManagement.matchClients.push(tbClients[i]);
            }
        }

        localStorage.setItem("matchClients", JSON.stringify(ContactInfoManagement.matchClients));
        ContactInfoManagement.renderSearchResult(ContactInfoManagement.matchClients);
    }
    , formUpdate: function (index) {
        if (!ufname.value || !ulname.value || !uemail.value || !umobile.value || !uaddress.value) {
            alert('Empty field is not allowed')
            return;
        }
        var tbClients = ContactInfoManagement.tbClients;
        tbClients[index] = JSON.stringify({
            FirstName: $("#ufname").val(),
            LastName: $("#ulname").val(),
            Mobile: $("#umobile").val(),
            Email: $("#uemail").val(),
            Address: $("#uaddress").val()
        });//Alter the selected item on the table

        localStorage.setItem("tbClients", JSON.stringify(tbClients));
        modalDiv.style.display = "none";
        ufname.value = ulname.value = umobile.value = uemail.value = uaddress.value = '';
        ContactInfoManagement.renderContactTable();
    }
    , formUpdateOnSearch: function (index) {
        if (!ufname.value || !ulname.value || !uemail.value || !umobile.value || !uaddress.value) {
            alert('Empty field is not allowed');
            return;
        }
        var contactToUpdate = ContactInfoManagement.matchClients[index];
        for (var i = 0; i < ContactInfoManagement.tbClients.length; i++) {
            if (ContactInfoManagement.tbClients[i] === contactToUpdate) {
                ContactInfoManagement.tbClients[i] = JSON.stringify({
                    FirstName: $("#ufname").val(),
                    LastName: $("#ulname").val(),
                    Mobile: $("#umobile").val(),
                    Email: $("#uemail").val(),
                    Address: $("#uaddress").val()
                });
            }
        }
        ContactInfoManagement.matchClients[index] = JSON.stringify({
            FirstName: $("#ufname").val(),
            LastName: $("#ulname").val(),
            Mobile: $("#umobile").val(),
            Email: $("#uemail").val(),
            Address: $("#uaddress").val()
        });
        ;
        localStorage.setItem("tbClients", JSON.stringify(ContactInfoManagement.tbClients));
        modalDiv.style.display = "none";
        ufname.value = ulname.value = umobile.value = uemail.value = uaddress.value = '';
        ContactInfoManagement.renderSearchResult(ContactInfoManagement.matchClients);


    }
    , btnEdit: function (index) {
        modalDiv.style.display = "block";
        var cli = JSON.parse(ContactInfoManagement.tbClients[index]);
        $('#popupContact').html("");
        $('#popupContact').append(
            '<form id="updateform">' +
            '<label>First Name:</label><input type="text" id="ufname" value="' + cli.FirstName + '"><br>' +
            '<label>Last Name:</label><input type="text" id="ulname" value="' + cli.LastName + '"><br>' +
            '<label>Mobile:</label><input type="text" id="umobile" pattern="[0-9]{11}" value="' + cli.Mobile + '"><br>' +
            '<label>Email:</label><input type="email" id="uemail" value="' + cli.Email + '"><br>' +
            '<label>Address:</label><textarea name="address" id="uaddress" value="' + cli.Address + '"></textarea><br>' +
            '<input type="button" value=" Update " id="btnUpdate" onclick="ContactInfoManagement.formUpdate(' + index + ')"/>' +
            '<input type="button" value=" Cancel " id="btnCancel" onclick="ContactInfoManagement.cancelForm()" />' +
            '</form>');

        $("#uaddress").val(cli.Address);
        $("#ufname").focus();
    }
    , editSearchContact: function (index) {
        modalDiv.style.display = "block";
        var cli = JSON.parse(ContactInfoManagement.matchClients[index]);
        if (!cli)
            return false;

        $('#popupContact').html("");
        $('#popupContact').append(
            '<form id="updateform">' +
            '<label>First Name:</label><input type="text" id="ufname" value="' + cli.FirstName + '"><br>' +
            '<label>Last Name:</label><input type="text" id="ulname" value="' + cli.LastName + '"><br>' +
            '<label>Mobile:</label><input type="text" id="umobile" pattern="[0-9]{11}" value="' + cli.Mobile + '"><br>' +
            '<label>Email:</label><input type="email" id="uemail" value="' + cli.Email + '"><br>' +
            '<label>Address:</label><textarea name="address" id="uaddress" value="' + cli.Address + '"></textarea><br>' +
            '<input type="button" value=" Update " onclick="ContactInfoManagement.formUpdateOnSearch(' + index + ')"/>' +
            '<input type="button" value=" Cancel " onclick="ContactInfoManagement.cancelForm()" />' +
            '</form>');

        $("#uaddress").val(cli.Address);
        $("#ufname").focus();

    }
    , btnDelete: function (index) {
        var result = confirm("Are you absolutely sure you want to delete?");
        tbClients = ContactInfoManagement.tbClients;
        if (result) {
            tbClients.splice(index, 1);
            localStorage.setItem("tbClients", JSON.stringify(tbClients));
            ContactInfoManagement.renderContactTable(tbClients);
        }
    }
    , cancelForm: function () {
        modalDiv.style.display = 'none';
    }
    , deleteSearchContact: function (index) {
        var result = confirm("Are you absolutely sure you want to delete?");
        if (result) {
            var deletedContact = ContactInfoManagement.matchClients[index];
            for (var i = 0; i < ContactInfoManagement.tbClients.length; i++) {
                if (ContactInfoManagement.tbClients[i] === deletedContact) {
                    ContactInfoManagement.tbClients.splice(i, 1);
                }
            }
            ContactInfoManagement.matchClients.splice(index, 1);
            localStorage.setItem("tbClients", JSON.stringify(ContactInfoManagement.tbClients));
            ContactInfoManagement.renderSearchResult(ContactInfoManagement.matchClients);
        }

    }
};

$(document).ready(function () {
    ContactInfoManagement.init();

    $('#btnSave').on('click', function () {
        if (!ContactInfoManagement.validationCheck())
            return false;

        var client = JSON.stringify({
            FirstName: fname.value,
            LastName: lname.value,
            Mobile: mobile.value,
            Email: email.value,
            Address: address.value
        });

        ContactInfoManagement.tbClients.push(client);
        localStorage.setItem("tbClients", JSON.stringify(ContactInfoManagement.tbClients));
        fname.value = lname.value = email.value = mobile.value = address.value = '';
        ContactInfoManagement.renderContactTable();
    });

    refreshBtn.onclick = ContactInfoManagement.renderContactTable;
    searchBtn.onclick = ContactInfoManagement.searchContact;

    $('#searchBox').keyup(function (e) {
        //console.log(e.currentTarget);
        ContactInfoManagement.matchClients = [];
        ContactInfoManagement.searchOnKeyPress();
    });

});