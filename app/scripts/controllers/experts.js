'use strict';

/**
 * @ngdoc function
 * @name democratieLiquideApp.controller:ExpertsCtrl
 * @description
 * # ExpertsCtrl
 * Controller of the democratieLiquideApp
 */
angular.module('democratieLiquideApp')
  .controller('ExpertsCtrl', function ($scope) {
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
