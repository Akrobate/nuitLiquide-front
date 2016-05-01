'use strict';

describe('Controller: PropositionCtrl', function () {

  // load the controller's module
  beforeEach(module('democratieLiquideApp'));

  var PropositionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PropositionCtrl = $controller('PropositionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
