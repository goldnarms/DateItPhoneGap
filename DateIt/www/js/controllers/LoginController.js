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
            $scope.login = function () {
                return _this.login();
            };
        }
        LoginController.prototype.injection = function () {
            return ["$scope", "$log", "$location", "datacontext", LoginController];
        };

        LoginController.prototype.login = function () {
            var _this = this;
            this.$log.info("Login klikket");
            this.datacontext.login("facebook").then(function () {
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
//# sourceMappingURL=LoginController.js.map
