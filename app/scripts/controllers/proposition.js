'use strict';

/**
 * @ngdoc function
 * @name democratieLiquideApp.controller:PropositionCtrl
 * @description
 * # PropositionCtrl
 * Controller of the democratieLiquideApp
 */
angular.module('democratieLiquideApp')
	.controller('PropositionCtrl', function ($scope, $routeParams, serverApi) {
		console.log($routeParams.id);
		console.log($routeParams);
		

		$scope.label = "Titre de la proposition";		
		$scope.description = "Description de la proposition. Description de la proposition. Description de la proposition.";
		
		serverApi.getProposition($routeParams.id, function(data){
		
			console.log(data);
		
		
		}) 
		
		
		
		
				
	});
	
