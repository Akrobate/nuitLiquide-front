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

		console.log("digest : " + serverApi.getDigest());


		var updateList = function() {
			serverApi.getPropositions(function(data) {
				console.log(data);
				//server.connect('skillstester', '987', connected);
				//$scope.propositions = data.data.propositions;
				//$scope.$apply();
			
			});  
		};

		updateList();

		$scope.$on("$destroy", function(){

		});
  
	});
