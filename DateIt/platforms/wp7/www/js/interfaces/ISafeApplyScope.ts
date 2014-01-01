/// <reference path="../_all.ts" />
module dateIt {
    export interface ISafeApplyScope extends ng.IScope {
        $safeApply: Function;
    }
}