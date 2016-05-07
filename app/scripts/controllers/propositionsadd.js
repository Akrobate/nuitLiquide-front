'use strict';

/**
 * @ngdoc function
 * @name democratieLiquideApp.controller:PropositionsaddCtrl
 * @description
 * # PropositionsaddCtrl
 * Controller of the democratieLiquideApp
 */
angular.module('democratieLiquideApp')
  .controller('PropositionsaddCtrl', function ($scope, $http, $location, serverApi) {
   
    console.log("digest : " + serverApi.getDigest());
   
    // Modèle standart d'une proposition
    $scope.proposition = {};
    $scope.proposition.description = "";    
    $scope.proposition.label = "";
	$scope.proposition.domainId = 1;  
    $scope.generalValidated = false;
    
    $scope.$watch('generalValidated', function(newValue) {
  		
	});
	
	$scope.update = function() {
		// Champs obligatoires
		if (this.checkGeneralpropositionInformation()) {
			var params = $scope.proposition;			
			serverApi.createProposition(params, function(data) {
				console.log(data);
				
				$timeout(function() {
					$location.path('/propositions');
					$scope.$apply();
				});
				
			});
		} else {
			console.log("Missing Fields");
		}
	};	
   
   
   
   
   
   
	
	/**
	 *	Verifications champs obligatoires
	 *
	 */
	
	$scope.checkGeneralpropositionInformation = function() {
	
		var valid = true;
		
		if ($scope.proposition.label == "") {
			valid = false;
			console.log("checker : false : title");
		}
		
		if ($scope.proposition.description == "") {
			valid = false;
			console.log("checker : false : description");			
		}

		$scope.generalValidated = valid;
		return valid;
	};
	
	
	/*
	
	  taOptions.toolbar = [
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
      ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
      ['html', 'insertImage','insertLink', 'insertVideo', 'wordcount', 'charcount']
  ];
  
  */

});
