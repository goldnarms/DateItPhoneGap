/// <reference path="user.ts" />
/// <reference path="item.ts" />
module dateIt {
    export interface DateItItem {
        id: number;
        itemId: number;
        item: dateIt.Item;
        userId: number;
        user: dateIt.User;
        expireDate: Date;
    }
}