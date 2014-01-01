module dateIt {
    export interface Item {
        id: number;
        name: string;
        shelflifeInDays: number;
        barcode?: number;
        imageUrl?: string;
    }
}