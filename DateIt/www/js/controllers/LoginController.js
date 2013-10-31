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
            $scope.user = datacontext.getCurrentUser;
            $scope.login = function (provider) {
                return _this.login(provider);
            };
        }
        LoginController.prototype.injection = function () {
            return ["$scope", "$log", "$location", "datacontext", LoginController];
        };

        LoginController.prototype.login = function (provider) {
            var _this = this;
            this.datacontext.login(provider).then(function () {
                _this.$scope.isLoggedIn = _this.datacontext.getCurrentUser !== null;
                _this.$log.info("IsLoggedIn: " + _this.$scope.isLoggedIn);
            }), (function (error) {
                alert(error);
            });
        };
        return LoginController;
    })();
    dateIt.LoginController = LoginController;
})(dateIt || (dateIt = {}));
