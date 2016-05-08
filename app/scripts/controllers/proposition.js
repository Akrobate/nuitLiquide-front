'use strict';

/**
 * @ngdoc function
 * @name democratieLiquideApp.controller:PropositionCtrl
 * @description
 * # PropositionCtrl
 * Controller of the democratieLiquideApp
 */
angular.module('democratieLiquideApp')
	.controller('PropositionCtrl', function ($scope, $routeParams, serverApi, $timeout) {
		console.log($routeParams.id);
		console.log($routeParams);
		
		
		$scope.description = "";
		$scope.label = "";
		
		
		//$scope.label = "Titre de la proposition";		
		//$scope.description = "Description de la proposition. Description de la proposition. Description de la proposition.";
		
		serverApi.getProposition($routeParams.id, function(data){
			// Everything is all right
			console.log(data);
			console.log(" Everything is all right");
						
						console.log("Description : " + data.description);
			data = data.pop();	
			$scope.description = data.description;
			$scope.label = data.label;
			$timeout(function() {
				
					$scope.$apply();
				});
		
		}) 
		
		
		
		
				
	});
	
