/// <reference path="../_all.ts" />

module dateIt {
    'use strict';
    declare var WindowsAzure: any;
    export interface IDatacontext {
        getDateItItems(): any; 
        getItems(): any;
        getItemByName(name: string): any;
        login(provider: string): any;
        logout(): any;
        addDateItItem(item: dateIt.DateItItem, callback: Function): void;
        addItem(item: dateIt.Item): any;
        getCurrentUser(): any;
    }

    export class DatacontextService implements IDatacontext {
        private client: any;

        public injection(): any[] {
            return [DatacontextService];
        }
        constructor() {
            this.client = new WindowsAzure.MobileServiceClient("https://dateit.azure-mobile.net/", "epvrqDRqGFqTPTjzhGajZJXlOyNvky95");
        }
        getDateItItems(): any {
            var dateItTable = this.client.getTable('DateItItem');
            return dateItTable.read();
        }

        getItemByName(itemName: string): any{
            var dateItTable = this.client.getTable('Item');
            return dateItTable.where({ name: itemName }).read();
        }

        getItems(): any {
            var dateItTable = this.client.getTable('Item');
            return dateItTable.read();
        }

        addDateItItem(item: dateIt.DateItItem, callback: Function) {
            this.client.getTable("DateItItem").insert(item).done(callback);
        }

        addItem(item: dateIt.Item) {
            return this.client.getTable("Item").insert(item);
        }

        logout(): any{
            console.log("DataContext logout");
            this.client.logout();
        }

        login(provider: string): any {
            console.log("DataContext login");
            return this.client.login(provider);
        }

        getCurrentUser(): any{
            return this.client.currentUser;
        }
    }
}