'use strict';

describe('Controller: PropositionsCtrl', function () {

  // load the controller's module
  beforeEach(module('democratieLiquideApp'));

  var PropositionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PropositionsCtrl = $controller('PropositionsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
