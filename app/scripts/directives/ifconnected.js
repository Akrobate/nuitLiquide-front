'use strict';

/**
 * @ngdoc directive
 * @name democratieLiquideApp.directive:ifConnected
 * @description
 * # ifConnected
 */
angular.module('democratieLiquideApp')
  .directive('ifConnected', function () {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        var showhide = attrs.ifConnected;
        scope.$watch(
			function () {
				return window.connected;
			}, function(n,o){
				console.log("changed ",n);		
				if (n == 'ok') {
					if (showhide == 'show') {
						element.show();
					} else {
						element.hide();
					}
					
				} else {
					if (showhide == 'show') {		
					   element.hide();
					} else {
					  element.show();
					}
				}
			});
      }
    };
});
