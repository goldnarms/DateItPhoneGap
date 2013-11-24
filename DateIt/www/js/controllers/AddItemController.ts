/// <reference path="../_all.ts" />
/// <reference path="../../Scripts/typings/moment/moment.d.ts" />
module dateIt {
    'use strict';
    export interface IAddItemScope extends dateIt.ISafeApplyScope {
        addDateItItem: (dateItItem: dateIt.DateItItem) => void;
        itemSelected: () => void;
        dateItItem: dateIt.DateItItem;
        uniqueItems: any;
        mstep: number;
        hstep: number;
        items: string[];
        selected: boolean;
    }

    export class AddItemController {
        public injection(): any[] {
            return ["$scope", "$log", "$location", "datacontext", AddItemController];
        }
        constructor(private $scope: IAddItemScope, private $log: ng.ILogService, private $location: ng.ILocationService, private datacontext: dateIt.IDatacontext) {
            $scope.addDateItItem = (item) => this.addDateItItem(item);
            $scope.itemSelected = () => this.itemSelected();
            $scope.dateItItem = <dateIt.DateItItem>{ expireDate: moment().toDate()};
            datacontext.getItems().then((result) =>{
                $scope.selected = undefined;
                $scope.items = result;
            });
        }

        itemSelected(): void {
            this.datacontext.getItemByName(this.$scope.dateItItem.name).done((results) => {
                this.$log.info(results);
                var item = <dateIt.Item>results[0];
                this.$scope.dateItItem.itemId = item.id;
                var date = moment();
                date.add("d", item.shelflifeInDays);
                this.$scope.dateItItem.expireDate = date.toDate();
            });
        }

        addDateItItem(dateItItem: dateIt.DateItItem): void {
            this.datacontext.getItemByName(this.$scope.dateItItem.name).done((results) => {
                this.$log.info(results);
                if (results.length == 0) {
                    var expireDate = moment(dateItItem.expireDate);
                    var shelfLife = expireDate.diff(moment(), "days");
                    var item = <dateIt.Item>{ name: dateItItem.name, shelflifeInDays: shelfLife };
                    this.datacontext.addItem(item);
                }
            });
            this.datacontext.addDateItItem(dateItItem, () => {
                this.$location.path("/");
            });
        }
    }
}