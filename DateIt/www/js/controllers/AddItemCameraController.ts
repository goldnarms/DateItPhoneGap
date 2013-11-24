/// <reference path="../_all.ts" />
module dateIt {
    'use strict';
    export interface IAddItemCameraScope extends dateIt.ISafeApplyScope {
        addDateItItem: (item: dateIt.DateItItem) => void;
        takePicture: () => void;
    }
    export class AddItemCameraController {
        public injection(): any[] {
            return ["$scope", "$log", "$location", "datacontext", AddItemCameraController];
        }

        constructor(private $scope: IAddItemCameraScope, private $log: ng.ILogService, private $location: ng.ILocationService, private dataContext: dateIt.IDatacontext) {
            $scope.takePicture = () => this.takePicture();
        }

        takePicture(): void {
            // limit capture operation to 3 images
            var options = { destinationType: Camera.DestinationType.DATA_URL};

            if (navigator && navigator.camera) {
                navigator.camera.getPicture((picture) => {
                    
                },
                    (error) => {
                        this.$log.error(error);
                    }, options);
            }
        }
    }
}