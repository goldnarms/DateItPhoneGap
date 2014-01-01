/// <reference path='../_all.ts' />
var dateIt;
(function (dateIt) {
    'use strict';

    var FridgeController = (function () {
        function FridgeController($scope, $log, datacontext) {
            this.$scope = $scope;
            this.$log = $log;
            this.datacontext = datacontext;
            datacontext.getDateItItems().done(function (results) {
                //console.log(JSON.stringify(results));
                $scope.inFridgeItems = results;
                $scope.$safeApply();
            }, function (err) {
                alert("Error: " + err);
            });
        }
        FridgeController.prototype.injection = function () {
            return ["$scope", "$log", "datacontext", FridgeController];
        };
        return FridgeController;
    })();
    dateIt.FridgeController = FridgeController;
})(dateIt || (dateIt = {}));
//# sourceMappingURL=FridgeController.js.map
