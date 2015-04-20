exports.definition = {
	config: {

		adapter: {
			type: "acs",
			collection_name: "users"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			
			
		login : function(_login, _password, _callback) {
			
        var self = this;
        this.config.Cloud.Users.login({
          login : _login,
          password : _password
        }, function(e) {
          if (e.success) {
            var user = e.users[0];
            
            //Delete the alert below once we get the application running.
			alert("You have successfully logged in!");
			
			
            // save session id
            Ti.App.Properties.setString('sessionId', e.meta.session_id);
            Ti.App.Properties.setString('user', JSON.stringify(user));
            _callback && _callback({
              success : true,
              model : new model(user)
            });
          } else {
            Ti.API.error(e);
            _callback && _callback({
              success : false,
              model : null,
              error : e
            });
          }
        });
      },
      
      
      logout : function(_callback) {
        var cloud = this.config.Cloud;
        var TAP = Ti.App.Properties;

        cloud.Users.logout(function(e) {
          if (e.success) {
            var user = e.users[0];
            TAP.removeProperty("sessionId");
            TAP.removeProperty("user");

            // callback clearing out the user model
            _callback && _callback({
              success : true,
              model : null
            });
          } else {
            Ti.API.error(e);
            _callback && _callback({
              success : false,
              model : null,
              error : e
            });
          }
        });
      },
			
			
		});

		return Model;
	},//end extendModel
	
	
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};//end extend collection