/// <reference path='../_all.ts' />
module dateIt {
    'use strict';
    export interface IFridgeScope extends dateIt.ISafeApplyScope {
        inFridgeItems: dateIt.DateItItem[];
    }

    export class FridgeController {

        public injection(): any[] {
            return ["$scope", "$log", "datacontext", FridgeController];
        }

        constructor(private $scope: IFridgeScope, private $log: ng.ILogService, private datacontext: dateIt.IDatacontext) {
            datacontext.getDateItItems().done((results: dateIt.DateItItem[]) => {
                //console.log(JSON.stringify(results));
                $scope.inFridgeItems = results;
                $scope.$safeApply();
            }, (err) => {
                    alert("Error: " + err);
                });
        }
    }
}