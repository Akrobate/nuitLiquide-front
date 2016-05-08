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
		
		
		// Params Zone
		$scope.propositionId = $routeParams.id;
		
		
		// Vote Zone
		$scope.selectedVote = "";
		$scope.voteDisabled = true;
		$scope.alreadyVoted = false;		
		
		
		// Proposition zone
		$scope.description = "";
		$scope.label = "";
		
		
		// Tech Zone
		var self = this;
		
		
		serverApi.getProposition($scope.propositionId, function(data){
			// Everything is all right
			data = data.pop();	
			$scope.description = data.description;
			$scope.label = data.label;
			$timeout(function() {
				$scope.$apply();
			});
		}) 
		
		
		// Get Vote status
		
		serverApi.getVoteFromPropositionId($scope.propositionId, function(data) {
			if (data.length > 0) {
				$scope.alreadyVoted = true;
				data = data.pop();
				$scope.selectedVote = self.mapDecodeVote(data.myVote);
				console.log("Seeelected vote from init");
				console.log($scope.selectedVote);
			} else {
				$scope.alreadyVoted = false;
			}	
		});
		
		

		$scope.selectVote = function(vote) {
			$scope.selectedVote = vote;
			console.log("Vote : " + vote);
			$scope.voteDisabled = false;
			$timeout(function() {
				$scope.$apply();
			});
		};
		
		
		
		$scope.addMyVote = function() {
		
			var frontvote = $scope.selectedVote;
			var vote = self.mapEncodeVote(frontvote);
			
			serverApi.vote($scope.propositionId, vote, function(data) {
				console.log(data);
				$scope.alreadyVoted = true;
				$timeout(function() {
					$scope.$apply();
				});
			});
		
		};
		
		
		$scope.editMyVote = function ()	{
			$scope.alreadyVoted = false;
			$timeout(function() {
					$scope.$apply();
			});
		};
		
		
		/**
		 *	Fonction de mapping de l'enum de vote entre 
		 *	la couche api et le front
		 *	pour contre neutre vers Y N B
		 */
		
		this.mapEncodeVote = function(frontvote){
			var vote = "";
			switch (frontvote) {
					case 'pour':
						vote = 'Y';
						break;
					case 'contre':
						vote = 'N';				
						break;
					case 'neutre':
						vote = 'B';				
						break;
				}
			return vote;
		};
		
		
		/**
		 *	Fonction de mapping de l'enum de vote entre 
		 *	la couche api et le front
		 *	pour Y N B vers contre neutre 
		 */
		 
		this.mapDecodeVote = function(frontvote){
			var vote = "";
			switch (frontvote) {
					case 'Y':
						vote = 'pour';
						break;
					case 'N':
						vote = 'contre';				
						break;
					case 'B':
						vote = 'neutre';				
						break;
				}
			return vote;
		};		
				
	});
	
