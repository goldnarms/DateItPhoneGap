/// <reference path="user.ts" />
/// <reference path="item.ts" />
module dateIt {
    export interface DateItItem {
        id: number;
        itemId: number;
        item: dateIt.Item;
        userId: any;
        user: dateIt.User;
        expireDate: Date;
        name: string;
        imageUrl: string;
    }
}