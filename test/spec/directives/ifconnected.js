'use strict';

describe('Directive: ifConnected', function () {

  // load the directive's module
  beforeEach(module('democratieLiquideApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<if-connected></if-connected>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ifConnected directive');
  }));
});
