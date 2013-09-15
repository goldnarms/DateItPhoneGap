/// <reference path="../_all.ts" />
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
            datacontext.getDateItItems().then(function (result) {
                var uniqueItems = _.pluck(result, 'name');
                var replacedItems = _.map(uniqueItems, function (i) {
                    return i.toString();
                });
                $log.info(replacedItems);
                var replaced = uniqueItems.toString().replace(/\"/g, '\'');

                $scope.uniqueItems = replacedItems;
            });
        }
        AddItemController.prototype.injection = function () {
            return ["$scope", "$log", "$location", "datacontext", AddItemController];
        };

        AddItemController.prototype.addDateItItem = function (item) {
            var _this = this;
            this.datacontext.addDateItItem(item, function () {
                _this.$location.path("/");
            });
        };
        return AddItemController;
    })();
    dateIt.AddItemController = AddItemController;
})(dateIt || (dateIt = {}));
//# sourceMappingURL=AddItemController.js.map
