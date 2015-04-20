$.doLoginBtn.addEventListener('click', doLoginBtnClicked);

function doLoginBtnClicked() {

  // create instance of the user model
  var user = Alloy.createModel('User');

  // call the extended model’s function
  user.login($.email.value, $.password.value, userActionResponseHandler);
};

function userActionResponseHandler(_resp) {
  if (_resp.success === true) {

    // Do stuff after successful login.
    Alloy.Globals.loggedIn = true;
    Alloy.Globals.CURRENT_USER = _resp.model;

    $.parentController.loginSuccessAction(_resp);

  } else {
    // Show the error message and let the user try again.
    alert("loginFailed", _resp.error.message);

    Alloy.Globals.CURRENT_USER = null;
    Alloy.Globals.loggedIn = false;
  }
};
/*
function doCreateAcctBtnClicked() {
  if ($.acct_password.value !== $.acct_password_confirmation.value) {
    alert("Please re-enter information");
    return;
  }
  var params = {
    first_name : $.acct_fname.value,
    last_name : $.acct_lname.value,
    username : $.acct_email.value,
    email : $.acct_email.value,
    password : $.acct_password.value,
    password_confirmation : $.acct_password_confirmation.value,
  };
  var user = Alloy.createModel('User');
  user.createAccount(params, userActionResponseHandler);
};*/

$.index.open();
$.loginView.show();