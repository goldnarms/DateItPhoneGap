/// <reference path="../_all.ts" />
module dateIt {
    'use strict';

    export class Footer implements ng.IDirective {
        public restrict: string;
        public templateUrl: string;
        public replace: boolean;

        public injection(): any[]{
            return [() => { return new Footer(); }];
        }
        constructor() {
            this.restrict = "A";
            this.templateUrl = "../../partials/footer.html";
            this.replace = true;
        }
    }
}
