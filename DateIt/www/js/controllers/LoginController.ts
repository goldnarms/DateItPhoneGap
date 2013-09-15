﻿/// <reference path="../interfaces/isafeapplyscope.ts" />

module dateIt {
    'use strict';
    export interface LoginScope extends dateIt.ISafeApplyScope {
        login: Function;
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
            $scope.user = datacontext.getCurrentUser;
            $scope.login = () => this.login();
        }

        login() {
            this.$log.info("Login klikket");
            this.datacontext.login("facebook")
                .then(() => {
                    this.$scope.isLoggedIn = this.datacontext.getCurrentUser !== null;
                    this.$log.info("IsLoggedIn: " + this.$scope.isLoggedIn);
                })
            , ((error) => {
                alert(error);
            });
        }
    }
}