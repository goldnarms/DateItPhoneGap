/// <reference path="../_all.ts" />
var dateIt;
(function (dateIt) {
    'use strict';

    var Footer = (function () {
        function Footer() {
            this.restrict = "A";
            this.templateUrl = "../../partials/footer.html";
            this.replace = true;
        }
        Footer.prototype.injection = function () {
            return [function () {
                    return new Footer();
                }];
        };
        return Footer;
    })();
    dateIt.Footer = Footer;
})(dateIt || (dateIt = {}));
