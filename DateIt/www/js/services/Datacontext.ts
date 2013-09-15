/// <reference path="../_all.ts" />

module dateIt {
    'use strict';
    declare var WindowsAzure: any;
    export interface IDatacontext {
        getDateItItems(): any;
        login(provider: string): any;
        addDateItItem(item: dateIt.DateItItem, callback: Function): void;
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

        addDateItItem(item: dateIt.DateItItem, callback: Function) {
            this.client.getTable("DateItItem").insert(item).success(callback);
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