var users = localStorage.usersData ? JSON.parse(localStorage.usersData) : [],
  errorsCount = 0;

if (localStorage.usersData) {
  load(JSON.parse(localStorage.usersData));
}

function load(usersData) {
  var table, row, cell;
  table = document.getElementById('table');

  var rowCount = table.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  for (var user of usersData) {
    row = table.insertRow();
    for (var prop in user) {
      cell = row.insertCell();
      cell.innerText = user[prop];
    }
  }
}

function isValidEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

var _els = {
  username: document.getElementById('uname'),
  password: document.getElementById('pwd'),
  fname: document.getElementById('fname'),
  lname: document.getElementById('lname'),
  email: document.getElementById('email'),
  location: document.getElementById('location'),
  gender: document.getElementById('gender'),
  save: document.getElementById('save'),
  errorAppend: function (elem, message) {
    if (elem.errorDiv === undefined) {
      elem.insertAdjacentHTML("afterend",
        `<p id='${elem.id}_error'><span style='color:red'>Please enter the ${message}</span></p>`);
      elem.errorDiv = document.getElementById(elem.id + '_error');
      errorsCount++;
    }
  }
};


_els.save.addEventListener('click', function () {

  // Username
  if (_els.username.value === "") {
    _els.errorAppend(_els.username, "Username");
  }
  if (_els.username.value && _els.username.errorDiv) {
    _els.username.errorDiv.remove();
    delete _els.username.errorDiv;
    errorsCount--;
  }

  // Password
  if (_els.password.value === "") {
    _els.errorAppend(_els.password, "Password");
  }
  if (_els.password.value && _els.password.errorDiv) {
    _els.password.errorDiv.remove();
    delete _els.password.errorDiv;
    errorsCount--;
  }

  // First Name
  if (_els.fname.value === "") {
    _els.errorAppend(_els.fname, "First Name");
  }
  if (_els.fname.value && _els.fname.errorDiv) {
    _els.fname.errorDiv.remove();
    delete _els.fname.errorDiv;
    errorsCount--;
  }

  // Last Name
  if (_els.lname.value === "") {
    _els.errorAppend(_els.lname, "Last Name");
  }
  if (_els.lname.value && _els.lname.errorDiv) {
    _els.lname.errorDiv.remove();
    delete _els.lname.errorDiv;
    errorsCount--;
  }


  // Email
  if (_els.email.value === "" || !isValidEmail(_els.email.value)) {
    _els.errorAppend(_els.email, "Email");
  }
  if (_els.email.value && _els.email.errorDiv && isValidEmail(_els.email.value)) {
    _els.email.errorDiv.remove();
    delete _els.email.errorDiv;
    errorsCount--;
  }

  // Location
  if (_els.location.value === "") {
    _els.errorAppend(_els.location, "Location");
  }
  if (_els.location.value && _els.location.errorDiv) {
    _els.location.errorDiv.remove();
    delete _els.location.errorDiv;
    errorsCount--;
  }

  // Gender
  if (document.getElementById("male").checked != true || document.getElementById("female").checked != true) {
    _els.errorAppend(_els.gender, "Gender");
  }
  if ((document.getElementById('male').checked || document.getElementById('female').checked) && _els.gender.errorDiv) {
    _els.gender.errorDiv.remove();
    delete _els.gender.errorDiv;
    errorsCount--;
  }

  if (errorsCount > 0) {
    console.log('error');
  }
  else {
    var gender;
    if (document.getElementById("male").checked == true) { gender = 'male'; }
    if (document.getElementById("female").checked == true) { gender = 'female'; }

    var user = {
      'username': _els.username.value,
      'password': _els.password.value,
      'fname': _els.fname.value,
      'lname': _els.lname.value,
      'email': _els.email.value,
      'gender': gender,
      'location': _els.location.value
    };

    users.push(user);
    localStorage.usersData = JSON.stringify(users);
    load(JSON.parse(localStorage.usersData));
  }

});
