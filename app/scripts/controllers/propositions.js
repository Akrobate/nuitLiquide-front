'use strict';

/**
 * @ngdoc function
 * @name democratieLiquideApp.controller:PropositionsCtrl
 * @description
 * # PropositionsCtrl
 * Controller of the democratieLiquideApp
 */
angular.module('democratieLiquideApp')
	.controller('PropositionsCtrl', function ($scope, $http, $location, serverApi) {

		$scope.propositions = [];

		var updateList = function() {
			serverApi.getPropositions(function(data) {
				console.log(data);
				$scope.propositions = data;
				$scope.$apply();
			});  
		};

		updateList();
		
		$scope.$on("$destroy", function(){

		});
  
	});
