'use strict';

describe('Controller: AmendementsCtrl', function () {

  // load the controller's module
  beforeEach(module('democratieLiquideApp'));

  var AmendementsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AmendementsCtrl = $controller('AmendementsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
