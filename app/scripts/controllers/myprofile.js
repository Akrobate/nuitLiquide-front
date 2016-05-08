'use strict';

/**
 * @ngdoc function
 * @name democratieLiquideApp.controller:MyprofileCtrl
 * @description
 * # MyprofileCtrl
 * Controller of the democratieLiquideApp
 */
angular.module('democratieLiquideApp')
  .controller('MyprofileCtrl', function ($scope, $timeout, serverApi) {


	// Tabs controller
	$scope.tabprofilevisibility = true;
	$scope.tabexpertisevisibility = false;
	$scope.tabmessagesvisibility = false;	
	$scope.activeValue = 'tabprofilevisibility';

	// Domains
	$scope.domains = [];
	
	// Expert Zone
	$scope.expert = {};
	$scope.expert.domainId = 0;
	$scope.expert.skills = "";
	
	
	// Profile Zone
	$scope.profile = {};
	$scope.profile.email = "";
	
	
	// On récupere la liste des domaines
	serverApi.getDomains(function(data) {
		$scope.domains = data;
		console.log(data);
		$timeout(function() {
			$scope.$apply();
		});
	});


	// Tabs controller
	$scope.showTab = function(id) {
		console.log(id);
		$scope.tabprofilevisibility = false;
		$scope.tabexpertisevisibility = false;
		$scope.tabmessagesvisibility = false;
		$scope[id] = true;
		$scope.activeValue = id;
	};


	/**
	 *	Méthode pour devenir expert
	 *  
	 */

	$scope.becomeExpert = function() {
		if (this.checkGeneralExpertInformation()) {
			serverApi.becomeExpert($scope.expert.domainId, $scope.expert.skills, function(data){
				console.log("Vous etes devenu expert");
				console.log(data);
			});	
		}	
	}



	/**
	 *	Verifications champs 
	 *  obligatoires pour devenir expert
	 */
	
	$scope.checkGeneralExpertInformation = function() {
	
		var valid = true;

		if ($scope.expert.domainId == 0) {
			valid = false;
			console.log("checker : false : domainId");
		}
		
		if ($scope.expert.skills == "") {
			valid = false;
			console.log("checker : false : skills");			
		}

		$scope.generalValidated = valid;
		return valid;
	};
	
	
  });
