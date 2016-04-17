'use strict';

describe('Controller: PropositionsaddCtrl', function () {

  // load the controller's module
  beforeEach(module('democratieLiquideApp'));

  var PropositionsaddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PropositionsaddCtrl = $controller('PropositionsaddCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
