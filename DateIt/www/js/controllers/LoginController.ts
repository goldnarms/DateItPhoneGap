/// <reference path="../interfaces/isafeapplyscope.ts" />

module dateIt {
    'use strict';
    export interface LoginScope extends dateIt.ISafeApplyScope {
        login: () => void;
        logout: () => void;
        userName: string;
        password: string;
        isLoggedIn: boolean;
        user: any;
    }
    export class LoginController {
        public injection(): any[] {
            return ["$scope", "$log", "$location", "datacontext", LoginController];
        }
        constructor(private $scope: LoginScope, private $log: ng.ILogService, private $location: ng.ILocationService, private datacontext: dateIt.IDatacontext) {
            $scope.isLoggedIn = datacontext.getCurrentUser !== null;
            $log.info(datacontext.getCurrentUser());
            $scope.user = datacontext.getCurrentUser();
            $scope.login = () => this.login();
            $scope.logout = () => this.logout();
        }

        logout(): void {
            this.$log.info("Logout klikket");
            this.datacontext.logout();
            this.$scope.isLoggedIn = this.datacontext.getCurrentUser() !== null;
            this.$scope.user = null;
            this.$log.info(this.datacontext.getCurrentUser());
            this.$log.info("IsLoggedIn: " + this.$scope.isLoggedIn);
        }

        login(): void {
            this.$log.info("Login klikket");
            this.datacontext.login("facebook")
                .then((u) => {
                    this.$log.info(u);
                    this.$scope.isLoggedIn = this.datacontext.getCurrentUser() !== null;
                    this.$scope.user = this.datacontext.getCurrentUser();
                    this.$log.info(this.datacontext.getCurrentUser());
                    this.$log.info("IsLoggedIn: " + this.$scope.isLoggedIn);
                    this.$scope.$apply();
                })
            , ((error) => {
                alert(error);
            });
        }
    }
}