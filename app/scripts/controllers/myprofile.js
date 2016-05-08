'use strict';

/**
 * @ngdoc function
 * @name democratieLiquideApp.controller:MyprofileCtrl
 * @description
 * # MyprofileCtrl
 * Controller of the democratieLiquideApp
 */
angular.module('democratieLiquideApp')
  .controller('MyprofileCtrl', function ($scope) {



	$scope.tabprofilevisibility = true;
	$scope.tabexpertisevisibility = false;
	$scope.tabmessagesvisibility = false;	
	$scope.activeValue = 'tabprofilevisibility';

	// Tabs controller
	
	
	
	$scope.showTab = function(id) {
		console.log(id);
		$scope.tabprofilevisibility = false;
		$scope.tabexpertisevisibility = false;
		$scope.tabmessagesvisibility = false;
		$scope[id] = true;
		$scope.activeValue = id;
	}



  });
