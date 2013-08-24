'use strict';
/* App Controllers */


function InFridgeController($scope) {
    var client = new WindowsAzure.MobileServiceClient("https://dateit.azure-mobile.net/", "epvrqDRqGFqTPTjzhGajZJXlOyNvky95");
    var dateItTable = client.getTable('DateItItem');
    var query = dateItTable.read().done(function (results) {
        //console.log(JSON.stringify(results));
        $scope.inFridgeItems = results;
        $scope.$apply();
    }, function (err) {
        alert("Error: " + err);
    });
    
}
InFridgeController.$inject = ["$scope"];


function AddItemController($scope, $location) {
    $scope.addDateItItem = function() {
        var client = new WindowsAzure.MobileServiceClient("https://dateit.azure-mobile.net/", "epvrqDRqGFqTPTjzhGajZJXlOyNvky95");
        var item = { name: $scope.name, shelflifeInDays: $scope.shelflifeInDays };
        client.getTable("DateItItem").insert(item).success(function() {
            $location.path("/");
            $scope.$apply();
        });
    };
}
AddItemController.$inject = ["$scope", "$location"];
