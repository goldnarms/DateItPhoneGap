'use strict';
/* App Controllers */


function InFridgeController($scope) {
    var client = new WindowsAzure.MobileServiceClient("https://dateit.azure-mobile.net/", "epvrqDRqGFqTPTjzhGajZJXlOyNvky95");
    $scope.inFridgeItems = client.getTable('DateItItem');
}
InFridgeController.$inject = [$scope];


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
AddItemController.$inject = [$scope, $location];
