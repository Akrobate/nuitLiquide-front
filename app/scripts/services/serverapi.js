'use strict';

/**
 * @ngdoc service
 * @name democratieLiquideApp.serverApi
 * @description
 * # serverApi
 * Service in the democratieLiquideApp.
 */
angular.module('democratieLiquideApp')
  .service('serverApi', function () {

    // AngularJS will instantiate a singleton by calling "new" on this function
	this.apiPath = "http://localhost:3333/api/v1";
	this.token = null;
	this.digest = null;
	this.nonce = null;
	this.calltype = "POST";


	this.getToken = function() {
		return this.token;
	}


	this.getNonce = function() {
		return this.nonce;
	}

    
	/**
	 *	Methode de connection
	 *	
	 */

    this.connect = function(login, password, callback) {
		var params = {};
		params.login = login;
		params.password = password;	
		this.quickRequestApi('users', 'login', params, callback);
	}
    
    
   	/**
	 *	Methode qui recuperant la clef secrete pour navigation
	 *	
	 */
	
	this.getAuthSecret = function(callback) {
		var query = {};
		query.module = 'authentication';
		query.action = 'secret';
		query.calltype = 'GET';
		this.requestApi(query, callback);
	}
	
	
	
  	/**
	 *	Methode qui recuperant la clef secrete pour navigation
	 *	
	 */
	
	this.postCreateUser = function(params, callback) {
		var query = {};
		query.module = 'user';
		query.action = 'create';
		query.calltype = 'POST';
		query.params = params;
		this.requestApi(query, callback);
	}
	
	
	
	/**
	 *	Methode qui charge tous les jobs
	 *	
	 */
	
	this.checkConnection = function(callback) {
		var query = {};
		query.module = 'users';
		query.action = 'access';
		this.requestApi(query, callback);
	}
	
	
	/**
	 *	Methode qui charge tous les jobs
	 *	
	 */
	
	this.logout = function(callback) {
		var query = {};
		query.module = 'users';
		query.action = 'logout';
		this.requestApi(query, callback);
	}
	
	
	/**
	 *	Methode qui charge tous les jobs
	 *	
	 */
	
	this.loadAllSkills = function(callback) {
		var query = {};
		query.module = 'skills';
		query.action = 'getall';
		this.requestApi(query, callback);
	}
	


	/**
	 *	Methode qui charge tous les jobs publiés
	 *	
	 */

	
	this.requestApi = function(query, callback) {
		var parent = this;
		console.log(sessionStorage.token);

		if (this.token == null) {
			var tmp = angular.fromJson(sessionStorage.token);
			console.log(tmp);
			if (tmp !== undefined) {
				this.token = tmp;
			}
		}
		
		if (this.digest == null) {
			var tmp = angular.fromJson(sessionStorage.digest);
			console.log(tmp);
			if (tmp != undefined) {
			this.digest = tmp;
			}
		}
		console.log(this.token);
		
		if (query.calltype === undefined) {
			this.calltype = "POST";
		
		} else {
			this.calltype = query.calltype;
		}
		
		if (query.params === undefined) {
			query.params = {};
		}
		
		query.params.token = this.token;
		query.params.digest = this.digest;
		
		$.ajax({
		url: this.apiPath + "/" + query.module + "/" + query.action,
			type: this.calltype,
			data: JSON.stringify(query.params),
			contentType:"application/json; charset=utf-8",
			dataType:"json",
			success: function(data) {
				if (parent.token != data.token) {
					sessionStorage.token = angular.toJson(data.token);
				}
				parent.token = data.token;
				return callback(data);		 	
			}
		});
	};
    
    
	this.quickRequestApi = function(module, action, params, callback) {
		var query = {};
		query.module = module;
		query.action = action;
		query.params = params;
		this.requestApi(query, callback);
	};
     
});
