/// <reference path="../interfaces/isafeapplyscope.ts" />
var dateIt;
(function (dateIt) {
    'use strict';

    var LoginController = (function () {
        function LoginController($scope, $log, $location, datacontext) {
            var _this = this;
            this.$scope = $scope;
            this.$log = $log;
            this.$location = $location;
            this.datacontext = datacontext;
            $scope.isLoggedIn = datacontext.getCurrentUser !== null;
            $log.info(datacontext.getCurrentUser());
            $scope.user = datacontext.getCurrentUser();
            $scope.login = function (provider) {
                return _this.login(provider);
            };
            $scope.logout = function () {
                return _this.logout();
            };
        }
        LoginController.prototype.injection = function () {
            return ["$scope", "$log", "$location", "datacontext", LoginController];
        };

        LoginController.prototype.logout = function () {
            this.$log.info("Logout klikket");
            this.datacontext.logout();
            this.$scope.isLoggedIn = this.datacontext.getCurrentUser() !== null;
            this.$scope.user = null;
            this.$log.info(this.datacontext.getCurrentUser());
            this.$log.info("IsLoggedIn: " + this.$scope.isLoggedIn);
        };

        LoginController.prototype.login = function (provider) {
            var _this = this;
            this.$log.info("Login klikket");
            this.datacontext.login(provider).then(function (u) {
                _this.$log.info(u);
                _this.$scope.isLoggedIn = _this.datacontext.getCurrentUser() !== null;
                _this.$scope.user = _this.datacontext.getCurrentUser();
                _this.$log.info(_this.datacontext.getCurrentUser());
                _this.$log.info("IsLoggedIn: " + _this.$scope.isLoggedIn);
                _this.$location.path("/infridge");
                _this.$scope.$apply();
            }), (function (error) {
                alert(error);
            });
        };
        return LoginController;
    })();
    dateIt.LoginController = LoginController;
})(dateIt || (dateIt = {}));
