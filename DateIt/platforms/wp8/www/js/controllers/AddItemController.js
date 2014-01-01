/// <reference path="../_all.ts" />
/// <reference path="../../Scripts/typings/moment/moment.d.ts" />
var dateIt;
(function (dateIt) {
    'use strict';

    var AddItemController = (function () {
        function AddItemController($scope, $log, $location, datacontext) {
            var _this = this;
            this.$scope = $scope;
            this.$log = $log;
            this.$location = $location;
            this.datacontext = datacontext;
            $scope.addDateItItem = function (item) {
                return _this.addDateItItem(item);
            };
            $scope.takePicture = function () {
                return _this.takePicture();
            };
            $scope.scanBarcode = function () {
                return _this.scanBarcode();
            };
            $scope.itemSelected = function () {
                return _this.itemSelected();
            };
            $scope.dateItItem = { expireDate: moment().toDate() };
            datacontext.getItems().then(function (result) {
                $scope.selected = undefined;
                $scope.items = result;
            });
        }
        AddItemController.prototype.injection = function () {
            return ["$scope", "$log", "$location", "datacontext", AddItemController];
        };

        AddItemController.prototype.itemSelected = function () {
            var _this = this;
            this.datacontext.getItemByName(this.$scope.dateItItem.name).done(function (results) {
                _this.$log.info(results);
                var item = results[0];
                _this.$scope.dateItItem.itemId = item.id;
                var date = moment();
                date.add("d", item.shelflifeInDays);
                _this.$scope.dateItItem.expireDate = date.toDate();
            });
        };

        AddItemController.prototype.addDateItItem = function (dateItItem) {
            var _this = this;
            this.datacontext.getItemByName(this.$scope.dateItItem.name).done(function (results) {
                _this.$log.info(results);
                if (results.length == 0) {
                    var expireDate = moment(dateItItem.expireDate);
                    var shelfLife = expireDate.diff(moment(), "days");
                    var item = { name: dateItItem.name, shelflifeInDays: shelfLife };
                    _this.datacontext.addItem(item);
                }
            });
            this.datacontext.addDateItItem(dateItItem, function () {
                _this.$location.path("/");
            });
        };

        AddItemController.prototype.takePicture = function () {
            var _this = this;
            var options = { destinationType: Camera.DestinationType.DATA_URL };

            if (navigator && navigator.camera) {
                navigator.camera.getPicture(function (picture) {
                    //this.$scope.dateItItem.imageUrl = picture.Url;
                }, function (error) {
                    _this.$log.error(error);
                }, options);
            }
        };

        AddItemController.prototype.scanBarcode = function () {
            //if (navigator && navigator.plugins.barcode) {
            //    navigator.barcode.scan((scanresult) => {
            //        if (this.datacontext.getByBarcode(scanresult.barcode)) {
            //            this.$scope.existingItem = this.datacontext.getByBarcode(scanresult.barcode);
            //        }
            //        else {
            //            this.$scope.existingItem = <dateIt.Item> { barcode: scanresult.barcode };
            //        }
            //    });
            //}
        };
        return AddItemController;
    })();
    dateIt.AddItemController = AddItemController;
})(dateIt || (dateIt = {}));
