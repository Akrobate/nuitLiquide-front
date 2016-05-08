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
	this.date = null;

	this.calltype = "POST";

	this.email = null;
	this.password = null;


	var self = this;


	/**
	 *	Initialisation de once
	 */

	this.nonce = Math.floor((Math.random() * 100000) + 1);
	console.log("Nonce : " + this.nonce );
	
	
	/**
	 *	Methode qui charge tous les jobs publiés
	 *	
	 */

	
	this.requestApi = function(query, callback) {
		var parent = this;
		//console.log(sessionStorage.token);


		/*
		if (this.token == null) {
			var tmp = angular.fromJson(sessionStorage.token);
			//console.log(tmp);
			if (tmp !== undefined) {
				this.token = tmp;
			}
		}
		
		if (this.digest == null) {
			var tmp = angular.fromJson(sessionStorage.digest);
			console.log("Digest : " + tmp);
			if (tmp != undefined) {
				this.digest = tmp;
			}
		}
		*/
		
		
		//console.log(this.token);
		
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
		
		console.log("Before ajax call");
		/*
		,
			error: function(data) {
			
				return callback(data);	
			}
			*/
		$.ajax({
			url: this.apiPath + "/" + query.module + "/" + query.action,
			type: this.calltype,
			data: JSON.stringify(query.params),
			contentType:"application/json; charset=utf-8",
			dataType: 'json',
			/*
			success: function(data) {
				console.log("===Api request Success callback ===");
				console.log(data);
				
				return callback(data);		 	
			},
			*/
			error: function(data) {
				//console.log("===Api request Error callback ===");
				//console.log(data);
				return callback(data);	
			} 
		}).done(function(data){
			//console.log("===Api request Done callback ===");
			//console.log(data);
			return callback(data);	
		});
	};
    
    
	this.quickRequestApi = function(module, action, params, callback) {
		var query = {};
		query.module = module;
		query.action = action;
		query.params = params;
		this.requestApi(query, callback);
	};
	
	
	this.getCurrentDate = function() {
	  	var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){
			dd='0'+dd
		} 
		if(mm<10){
			mm='0'+mm
		} 
		var today = dd+'/'+mm+'/'+yyyy;
		var date = today;
		return date;
	}
	
	
	this.getToken = function() {
		return this.token;
	}


	this.getNonce = function() {
		return this.nonce;
	}


	this.getDigest = function() {
		this.digest	= this.email + this.password + this.date + this.token + this.nonce;
		return this.digest;
	}


    
	/**
	 *	Methode de connection
	 *	
	 */

    this.connect = function(login, password, callback) {
    
    	var query = {};
		query.module = 'authentication';
		query.action = 'login';
		query.calltype = 'POST';
		
		var params = {};
		params.email = login;
		params.password = password;	
		params.date = this.getCurrentDate();
		params.nonce = this.nonce;

		this.email = login;
		this.password = password;	
		this.date = this.getCurrentDate();
		this.nonce = this.nonce;
		
		query.params = params;

		this.digest	= login + password + params.date + this.token + this.nonce;
		 
		this.requestApi(query, function(data) {
			return callback(data);
		});
	
	}
    
  
  	

	/**
	 *	On récupere le token des que le serverAPI est invoké
	 *	On le stock dans les variables membres de la classe
	 *
	 */
  
    
   	/**
	 *	Methode qui recuperant la clef secrete pour navigation
	 *	
	 */
	
	this.getAuthSecret = function(callback) {
		var self = this;
		var query = {};
		query.module = 'authentication';
		query.action = 'secret';
		query.calltype = 'POST';
		this.requestApi(query, function(data) {
			self.token = data.token;
			console.log(self.token);
			callback(data);
		});
	};
	
	
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
	 *	Methode qui verifie la connection
	 *	
	 */
	
	this.checkConnection = function(callback) {
		var query = {};
		query.module = 'user';
		query.action = 'access';
		this.requestApi(query, callback);
	}
	
	
	/**
	 *	Methode se deconnecte
	 *	@todo
	 */
	
	this.logout = function(callback) {
		var query = {};
		query.module = 'users';
		query.action = 'logout';
		this.requestApi(query, callback);
	}
	
	
	/**
	 *	Methode verifyUser les user
	 *	
	 */
	
	this.verifyUser = function(email, callback) {
		var query = {};
		var params = {}
		params.email = email;
		query.module = 'user';
		query.action = 'verify';
		query.calltype = 'POST';
		query.params = params;
		this.requestApi(query, callback);
		
	}
	

	/**
	 *	Methode verifyUser les user
	 *	
	 */
	
	this.getPropositions = function(callback) {
		var query = {};
		var params = {}
		params.digest = this.getDigest();
		params.date = this.date;
		
		query.module = 'proposition';
		query.action = "get";
		query.calltype = 'POST';
		
		query.params = params;
		this.requestApi(query, callback);
		
	}


	/**
	 *	Methode verifyUser les user
	 *	
	 */
	
	this.createProposition = function(params, callback) {
		var query = {};
		params.digest = this.getDigest();
		params.date = this.date;
		
		query.module = 'proposition';
		query.action = "create";
		query.calltype = 'POST';
		query.params = params;
		this.requestApi(query, callback);
	}
	
	
	/**
	 *	Methode get one proposition
	 *	
	 */
	
	this.getProposition = function(id, callback) {
		var query = {};
		var params = {}
		params.digest = this.getDigest();
		params.date = this.date;
		params.propositionId = id;
		
		query.module = 'proposition';
		query.action = "get";
		query.calltype = 'POST';
		
		query.params = params;
		this.requestApi(query, callback);
		
	}
	


	/**
	 *	Methode get one domain
	 *	
	 */
	
	this.getDomains = function(callback) {
		var query = {};
		var params = {}
		params.digest = this.getDigest();
		params.date = this.date;
		
		query.module = 'domain';
		query.action = "get";
		query.calltype = 'POST';
		
		query.params = params;
		this.requestApi(query, callback);
		
	}
     
     
     
   	/**
	 *	Methode Vote
	 *	vote ENUM(N,B,Y) No Blanc Yes
	 */
	
	this.vote = function(propositionId, vote, callback) {
		var query = {};
		var params = {}
		params.digest = this.getDigest();
		params.date = this.date;
		params.propositionId = propositionId;
		params.vote = vote;
		
		
		query.module = 'proposition';
		query.action = "vote";
		query.calltype = 'POST';
		
		query.params = params;
		this.requestApi(query, callback);
		
	}  
     
     
         
   	/**
	 *	Methode get User Vote
	 *	
	 */
	
	this.getVoteFromPropositionId = function(propositionId, callback) {
		var query = {};
		var params = {}
		params.digest = this.getDigest();
		params.date = this.date;
		params.propositionId = propositionId;
		params.vote = ['Y', 'B', 'N'];
		
		
		query.module = 'proposition';
		query.action = "get";
		query.calltype = 'POST';
		
		query.params = params;
		this.requestApi(query, callback);
		
	} 
     
     
   	/**
   	 *	Méthode rendant un utilisateur expert
     *	
	 */
	
	this.becomeExpert = function(domainId, skills, callback) {
		var query = {};
		var params = {}
		params.digest = this.getDigest();
		params.date = this.date;
		params.domainId = domainId;
		params.skills = skills;
		
		query.module = 'expert';
		query.action = 'create';
		query.calltype = 'POST';
		
		query.params = params;
		this.requestApi(query, callback);
	} 
     
});
