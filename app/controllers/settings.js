OS_IOS && $.logoutBtn.addEventListener("click", handleLogoutBtnClick);

var pushLib = require('pushNotifications');

$.handleLogoutMenuClick = function(_event) {
  handleLogoutBtnClick(_event);
};

function handleLogoutBtnClick(_event) {

  // push logout
  require('pushNotifications').logout(function() {

    Alloy.Globals.currentUser.logout(function(_response) {
      if (_response.success) {
        Ti.API.debug('user logged out');

        // clear any twitter/FB information
        require('sharing').deauthorize();

        // show login window
        $.parentController.userNotLoggedInAction();

      } else {
        Ti.API.error('error logging user out');
      }
    });
  });
};