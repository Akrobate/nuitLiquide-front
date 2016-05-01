'use strict';

/**
 * @ngdoc service
 * @name democratieLiquideApp.user
 * @description
 * # user
 * Service in the democratieLiquideApp.
 */
angular.module('democratieLiquideApp')
  .service('user', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.connected = false;
    this.data = {};
});
