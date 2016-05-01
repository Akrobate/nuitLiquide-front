'use strict';

/**
 * @ngdoc function
 * @name democratieLiquideApp.controller:PropositionCtrl
 * @description
 * # PropositionCtrl
 * Controller of the democratieLiquideApp
 */
angular.module('democratieLiquideApp')
	.controller('PropositionCtrl', function ($scope, $routeParams) {
		console.log($routeParams.id);
		console.log($routeParams);
	});
	
