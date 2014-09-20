'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'debounce'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/buy', {templateUrl: 'partials/buy.html', controller: 'BuyCtrl'});
  $routeProvider.when('/sell', {templateUrl: 'partials/sell.html', controller: 'SellCtrl'});
  $routeProvider.when('/user', {templateUrl: 'partials/user.html', controller: 'UserCtrl'});
  $routeProvider.otherwise({redirectTo: '/user'});
}]);
