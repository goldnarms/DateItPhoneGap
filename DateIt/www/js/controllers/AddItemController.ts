/// <reference path="../_all.ts" />
module dateIt {
    'use strict';
    export interface IAddItemScope extends dateIt.ISafeApplyScope {
        addDateItItem: Function;
        dateItItem: dateIt.DateItItem;
        uniqueItems: string[];
    }

    export class AddItemController {
        public injection(): any[] {
            return ["$scope", "$log", "$location", "datacontext", AddItemController];
        }
        constructor(private $scope: IAddItemScope, private $log: ng.ILogService, private $location: ng.ILocationService, private datacontext: dateIt.IDatacontext) {
            $scope.addDateItItem = (item) => this.addDateItItem(item);
            datacontext.getDateItItems().then((result) =>{
                var uniqueItems = _.pluck(result, 'name');
                var replacedItems = _.map(uniqueItems, (i) => {return i.toString() })
                $log.info(replacedItems);
                var replaced = uniqueItems.toString().replace(/\"/g, '\'')

                $scope.uniqueItems = replacedItems;
            });
        }

        addDateItItem(item: dateIt.DateItItem): void {
            this.datacontext.addDateItItem(item, () => {
                this.$location.path("/");
            });
        }
    }
}