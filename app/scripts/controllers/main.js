'use strict';

/**
 * @ngdoc function
 * @name democratieLiquideApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the democratieLiquideApp
 */

angular.module('democratieLiquideApp')
	.controller('MainCtrl', function ($scope, $http, $location, serverApi, user, $timeout, $rootScope) {
		
		
		$scope.registration = {};
		$scope.registration.password = "";
		$scope.registration.password2 = "";
		$scope.registration.disablesubmit = false;
		
		//user.tryToConnect();
		
		
		
		$rootScope.$on('user:connected', function(){
      	  $timeout(function() {
				$scope.$apply();
				console.log("User connected works");
			});
     	 });
		
		
		
		$scope.connect = function() {
			var connection = {
				login: $scope.connection.login,
				password: $scope.connection.password,
			};

			console.log(connection);    
			serverApi.connect(connection.login, connection.password, function(data) {
			
				data.connection = connection;
				console.log(data);
				if(data.status == 418) {
					console.log("USER AUTHENTIFICATED / Digest : " + serverApi.getDigest());
					user.setConnected(data);
					$timeout(function() {
						$location.path('/about');
						$scope.$apply();
					});
				} else {
					console.log("USER DENIED");
//					$location.path('/');
//					$scope.$apply();
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
