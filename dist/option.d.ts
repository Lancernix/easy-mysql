import { Order, Option } from './typing';
export declare const getColumns: (columns: string[] | undefined) => string;
export declare const getOrder: (orders: Order[] | undefined) => string;
export declare const getLimit: (offset: number, limit: number) => string;
export declare const getWhere: (where: Option | undefined) => {
    str: string;
    arr: (string | number)[];
};
