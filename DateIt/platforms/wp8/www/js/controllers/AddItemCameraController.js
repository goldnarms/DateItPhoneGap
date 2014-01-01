/// <reference path="../_all.ts" />
var dateIt;
(function (dateIt) {
    'use strict';

    var AddItemCameraController = (function () {
        function AddItemCameraController($scope, $log, $location, dataContext) {
            var _this = this;
            this.$scope = $scope;
            this.$log = $log;
            this.$location = $location;
            this.dataContext = dataContext;
            $scope.takePicture = function () {
                return _this.takePicture();
            };
        }
        AddItemCameraController.prototype.injection = function () {
            return ["$scope", "$log", "$location", "datacontext", AddItemCameraController];
        };

        AddItemCameraController.prototype.takePicture = function () {
            var _this = this;
            // limit capture operation to 3 images
            var options = { destinationType: Camera.DestinationType.DATA_URL };

            if (navigator && navigator.camera) {
                navigator.camera.getPicture(function (picture) {
                }, function (error) {
                    _this.$log.error(error);
                }, options);
            }
        };
        return AddItemCameraController;
    })();
    dateIt.AddItemCameraController = AddItemCameraController;
})(dateIt || (dateIt = {}));
