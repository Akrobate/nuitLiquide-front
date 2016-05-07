'use strict';

/**
 * @ngdoc function
 * @name democratieLiquideApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the democratieLiquideApp
 */
angular.module('democratieLiquideApp')
	.controller('LogoutCtrl', function ($scope, $location, serverApi, user, $timeout, $rootScope) {

		user.setDisconected();

		// Todo call api de deconnection

		
		$location.path('/');
		
		
		$timeout(function() {
			$scope.$apply();
		});
	});
