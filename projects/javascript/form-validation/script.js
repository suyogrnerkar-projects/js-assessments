var _els = {
  username: document.getElementById('uname'),
  password: document.getElementById('pwd'),
  fname: document.getElementById('fname'),
  lname: document.getElementById('lname'),
  email: document.getElementById('email'),
  location: document.getElementById('location'),
  gender: document.getElementById('gender'),
  save: document.getElementById('save'),
  table: document.getElementById('table'),
  errorAppend: function (elem, message) {
    if (elem.errorDiv === undefined) {
      elem.insertAdjacentHTML("afterend",
        `<p id='${elem.id}_error'><span style='color:red'>Please enter the ${message}</span></p>`);
      elem.errorDiv = document.getElementById(elem.id + '_error');
      errorsCount++;
    }
  }
};

var users = localStorage.usersData ? JSON.parse(localStorage.usersData) : [],
  errorsCount = 0;

if (localStorage.usersData) {
  load(JSON.parse(localStorage.usersData));
}

function load(usersData) {
  var row, cell;
  for (var user of usersData) {
    row = _els.table.insertRow();
    for (var prop in user) {
      cell = row.insertCell();
      cell.innerText = user[prop];
    }
  }
}

function add_new(user) {
  row = _els.table.insertRow();
  for (var prop in user) {
    cell = row.insertCell();
    cell.innerText = user[prop];
  }
}

function isValidEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}


_els.save.addEventListener('click', function () {

  var input_boxes = [
    _els.username,
    _els.password,
    _els.fname,
    _els.lname,
    _els.location
  ]

  input_boxes.forEach(function (elm) {
    if (elm.value === "") {
      _els.errorAppend(elm, elm.parentElement.textContent);
    }
    if (elm.value && elm.errorDiv) {
      elm.errorDiv.remove();
      delete elm.errorDiv;
      errorsCount--;
    }
  });

  // Email
  if (_els.email.value === "" || !isValidEmail(_els.email.value)) {
    _els.errorAppend(_els.email, "Email");
  }
  if (_els.email.value && _els.email.errorDiv && isValidEmail(_els.email.value)) {
    _els.email.errorDiv.remove();
    delete _els.email.errorDiv;
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
    add_new(user);
  }

});
