'use strict';

/**
 * @ngdoc service
 * @name democratieLiquideApp.user
 * @description
 * # user
 * Service in the democratieLiquideApp.
 */
angular.module('democratieLiquideApp')
  .service('user', ['localStorageService','serverApi','$rootScope', function (localStorageService, serverApi, $rootScope) {

    this.connected = false;
    this.data = {};
    
    this.setConnected = function(data) {
	  	this.connected = true;
    	localStorageService.set('user', data);    
    }
    
    
    this.setDisconected = function() {
	  this.connected = false;
	  localStorageService.set('user', {});    
    }
    

    this.tryToConnect = function() {
		var usr = localStorageService.get('user');
		var self = this;
		  
		 serverApi.getAuthSecret(function() {
			  if (typeof usr.connection != 'undefined') {
				  if (typeof usr.connection.login != 'undefined') {
				 	 serverApi.connect(usr.connection.login, usr.connection.password, function(data) {
							data.connection = usr.connection;
							console.log(data);
							if(data.status == 418) {
								console.log("USER AUTHENTIFICATED / Digest : " + serverApi.getDigest());
								self.setConnected(data);
								$rootScope.$emit('user:connected');
							} else {
								console.log("USER DENIED");
							}
						});		  		
				  }
			}
		});
		console.log("Local Stored User data");
		console.log(usr);
    }

	this.tryToConnect();
	
}]);
