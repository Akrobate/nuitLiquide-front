'use strict';

/**
 * @ngdoc directive
 * @name democratieLiquideApp.directive:isActive
 * @description
 * # isActive
 */
angular.module('democratieLiquideApp')
  .directive('isActive', ['$location', function(location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        var clazz = attrs.isActive;
        var path = $(element).find('a').attr('ng-href');
        path = path.substring(1); //hack because path does not return including hashbang
        scope.location = location;
        scope.$watch('location.path()', function(newPath) {
          if (path === newPath) {
            element.addClass(clazz);
          } else {
            element.removeClass(clazz);
          }
        });
      }
    };
  }]);
 
