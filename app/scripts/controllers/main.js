'use strict';

/**
 * @ngdoc function
 * @name democratieLiquideApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the democratieLiquideApp
 */

angular.module('democratieLiquideApp')
	.controller('MainCtrl', function ($scope, $http, $location, serverApi, user) {
		//serverApi.requestApi();

		$scope.registration = {};
		$scope.registration.password = "";
		$scope.registration.password2 = "";
		$scope.registration.disablesubmit = false;
		
		
		$scope.connect = function() {
			var connection = {
				login: $scope.connection.login,
				password: $scope.connection.password,
			};
		  
			console.log(connection);    
			serverApi.connect(connection.login, connection.password, function(data) {
			
				console.log(data);
				if(data.status == 418) {
					console.log("USER AUTHENTIFICATED");
					console.log("digest just after connection" + serverApi.getDigest());
				
					user.connected = true;
					user.data = data;
					$location.path('/about');
					$scope.$apply();
				} else {
					console.log("USER DENIED");
					user.connected = false;
					user.data = {};
					$location.path('/');
					$scope.$apply();
				}
			
			});	
		}





		$scope.register = function() {
			var registration = {
				email: $scope.registration.login,
				password: $scope.registration.password,
			};
			
			console.log(registration);    
			serverApi.postCreateUser(registration, function(data) {
			
				console.log(data);
				console.log("Heeeeeerrrreeeee11111");
				serverApi.verifyUser(registration.email, function(res) {
					console.log(res);
					console.log("Heeeeeerrrreeeee22222");
					
				});
				
				/*
				console.log("Heeeeeerrrreeeee");
				
				if(data.data.status == 'connected') {
					console.log("USER SUSCRIBED");
					// console.log(data);
					$scope.connected = 'ok';
					connected = 'ok';
					$location.path('/about');
					$scope.$apply();
				} else {
					console.log("USER NOT SUSCRIBED");
					console.log(data);
					$scope.connected = 'nop';
					connected = 'nop';
					$location.path('/');
					$scope.$apply();
				}*/
			});        
		}




		$scope.$watch("registration.password2", function() {
			if ($scope.registration.password2 != "") {
				if ($scope.registration.password == $scope.registration.password2) {
					$scope.registration.notidentical = "has-success";
					$scope.registration.disablesubmit = false;
				} else {
					$scope.registration.notidentical = "has-error";
					$scope.registration.disablesubmit = true;
				}
			}
		});
	});
