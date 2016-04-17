'use strict';

/**
 * @ngdoc overview
 * @name democratieLiquideApp
 * @description
 * # democratieLiquideApp
 *
 * Main module of the application.
 */
angular
  .module('democratieLiquideApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/myprofile', {
        templateUrl: 'views/myprofile.html',
        controller: 'MyprofileCtrl'
      })
      .when('/propositions', {
        templateUrl: 'views/propositions.html',
        controller: 'PropositionsCtrl'
      })
      .when('/propositionsadd', {
        templateUrl: 'views/propositionsadd.html',
        controller: 'PropositionsaddCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
