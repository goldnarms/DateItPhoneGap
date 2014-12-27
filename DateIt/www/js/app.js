/// <reference path='_all.ts' />
var dateIt;
(function (dateIt) {
    'use strict';

    XMLHttpRequest.prototype.withCredentials = false;
    var services = angular.module("dateIt.Services", []);
    services.service("datacontext", dateIt.DatacontextService.prototype.injection());

    var controllers = angular.module("dateIt.Controllers", []);
    controllers.controller("fridgeCtrl", dateIt.FridgeController.prototype.injection());
    controllers.controller("loginCtrl", dateIt.LoginController.prototype.injection());
    controllers.controller("addItemCtrl", dateIt.AddItemController.prototype.injection());

    var directives = angular.module("dateIt.Directives", []);
    directives.directive("footer", dateIt.Footer.prototype.injection());
    var app = angular.module("dateIt", ["ngRoute", "ngStorage", "ui.bootstrap", "Scope.safeApply", "dateIt.Controllers", "dateIt.Services", "dateIt.Directives", "angularMoment", "LocalStorageModule"]);

    //.service("datacontext", dateIt.DatacontextService.prototype.injection());;
    // Declare app level module which depends on filters, and services
    app.config([
        '$routeProvider',
        '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider.when('/infridge', {
                templateUrl: '/partials/inFridge.html',
                controller: "fridgeCtrl"
            });
            $routeProvider.when('/addByText', {
                templateUrl: 'partials/addByText.html',
                controller: "addItemCtrl"
            });
            $routeProvider.when('/login', {
                templateUrl: 'partials/login.html',
                controller: "loginCtrl"
            });

            $routeProvider.otherwise({ redirectTo: '/login' });
            //$locationProvider.html5Mode(true).hashPrefix('!');
        }
    ]);
})(dateIt || (dateIt = {}));
