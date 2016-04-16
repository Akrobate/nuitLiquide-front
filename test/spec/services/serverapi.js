'use strict';

describe('Service: serverApi', function () {

  // load the service's module
  beforeEach(module('democratieLiquideApp'));

  // instantiate service
  var serverApi;
  beforeEach(inject(function (_serverApi_) {
    serverApi = _serverApi_;
  }));

  it('should do something', function () {
    expect(!!serverApi).toBe(true);
  });

});
