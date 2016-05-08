'use strict';

/**
 * @ngdoc function
 * @name democratieLiquideApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the democratieLiquideApp
 */
angular.module('democratieLiquideApp')
.controller('DashboardCtrl', function ($scope, serverApi) {

	$scope.propositions = {};


	var updateList = function() {
		serverApi.getPropositions(function(data) {
			console.log(data);
			$scope.propositions = data;
			$scope.$apply();
		});  
	};

	//updateList();

	serverApi.getPropositions(function(data) {
		console.log(data);
		$scope.propositions.block1 = data;
		$scope.$apply();
	});  


	serverApi.getPropositionsFiltered({'vote': ['Y']}, function(data) {
		console.log(data);
		$scope.propositions.block2 = data;
		$scope.$apply();
	});  
	
		
	serverApi.getPropositionsFiltered({'vote': ['N']}, function(data) {
		console.log(data);
		$scope.propositions.block3 = data;
		$scope.$apply();
	});  


	serverApi.getPropositionsFiltered({'vote': ['B']}, function(data) {
		console.log(data);
		$scope.propositions.block4 = data;
		$scope.$apply();
	});  

});
