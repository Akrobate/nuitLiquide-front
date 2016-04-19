'use strict';

describe('Controller: VoteaddCtrl', function () {

  // load the controller's module
  beforeEach(module('democratieLiquideApp'));

  var VoteaddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VoteaddCtrl = $controller('VoteaddCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
