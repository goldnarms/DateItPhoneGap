/// <reference path="../_all.ts" />
var dateIt;
(function (dateIt) {
    'use strict';

    var DatacontextService = (function () {
        function DatacontextService() {
            this.client = new WindowsAzure.MobileServiceClient("https://dateit.azure-mobile.net/", "epvrqDRqGFqTPTjzhGajZJXlOyNvky95");
        }
        DatacontextService.prototype.injection = function () {
            return [DatacontextService];
        };

        DatacontextService.prototype.getDateItItems = function () {
            var dateItTable = this.client.getTable('DateItItem');
            return dateItTable.read();
        };

        DatacontextService.prototype.addDateItItem = function (item, callback) {
            this.client.getTable("DateItItem").insert(item).success(callback);
        };

        DatacontextService.prototype.login = function (provider) {
            console.log("DataContext login");
            return this.client.login(provider);
        };

        DatacontextService.prototype.getCurrentUser = function () {
            return this.client.currentUser;
        };
        return DatacontextService;
    })();
    dateIt.DatacontextService = DatacontextService;
})(dateIt || (dateIt = {}));
//# sourceMappingURL=Datacontext.js.map
