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

        DatacontextService.prototype.getItemByName = function (itemName) {
            var dateItTable = this.client.getTable('Item');
            return dateItTable.where({ name: itemName }).read();
        };

        DatacontextService.prototype.getItems = function () {
            var dateItTable = this.client.getTable('Item');
            return dateItTable.read();
        };

        DatacontextService.prototype.addDateItItem = function (item, callback) {
            this.client.getTable("DateItItem").insert(item).done(callback);
        };

        DatacontextService.prototype.getByBarcode = function (barcode) {
            var dateItTable = this.client.getTable('DateItItem');
            dateItTable.where("Barcode", "eq", barcode);
            return dateItTable.read();
        };

        DatacontextService.prototype.addItem = function (item) {
            return this.client.getTable("Item").insert(item);
        };

        DatacontextService.prototype.logout = function () {
            console.log("DataContext logout");
            this.client.logout();
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
