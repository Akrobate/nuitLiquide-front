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


	var updateList = function() {
		serverApi.getPropositions(function(data) {
			console.log(data);
			$scope.propositions = data;
			$scope.$apply();
		});  
	};

	updateList();




});
