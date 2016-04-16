'use strict';

/**
 * @ngdoc function
 * @name democratieLiquideApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the democratieLiquideApp
 */

angular.module('democratieLiquideApp')
	.controller('MainCtrl', function ($scope, $http, $location, serverApi) {
		//serverApi.requestApi();

		$scope.registration = {};
		$scope.registration.password = "";
		$scope.registration.password2 = "";
		$scope.registration.disablesubmit = false;

		serverApi.getAuthSecret(function(data) {
			console.log(data);
		});


		$scope.connect = function() {
			var connection = {
				login: $scope.connection.login,
				password: $scope.connection.password,
			};
		    
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
		
			var token = serverApi.getToken();
			var nonce = serverApi.getNonce();
			var date = today;
			
			var sDigest = crypto.createHmac('sha1', connection.password).update(connection.password).digest('hex');
            sDigest     = crypto.createHmac('sha1', date).update(sDigest).digest('hex');
            sDigest     = crypto.createHmac('sha1', token).update(sDigest).digest('hex');
            sDigest     = crypto.createHmac('sha1', nonce).update(sDigest).digest('hex');
			
			
			console.log("========");    
			console.log(sDigest);    
			
			
			return;
			console.log(connection);    
			serverApi.connect(connection.login, connection.password, function(data) {
			console.log(data);
			if(data.data.status == 'connected') {
			console.log("USER AUTHENTIFICATED");
			// console.log(data);
			connected = 'ok';
			$scope.connected = connected;
			$location.path('/about');
			$scope.$apply();
			} else {
			console.log("USER DENIED");
			console.log(data);
			connected = 'nop';
			$scope.connected = connected;
			$location.path('/login');
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
				}
			});        
		}




		$scope.$watch("registration.password2", function() {
			console.log($scope);
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