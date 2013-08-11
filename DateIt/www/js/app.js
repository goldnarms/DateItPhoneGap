'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $routeProvider.when('/infridge', { templateUrl: '/partials/inFridge.html', controller: InFridgeController });
      $routeProvider.when('/addByText', { templateUrl: 'partials/addByText.html', controller: AddItemController });
      $routeProvider.otherwise({ redirectTo: '/view1' });
      //$locationProvider.html5Mode(true).hashPrefix('!');
  }]);
