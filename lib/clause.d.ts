import { Order, Option, Row } from './typing';
export declare const getColumns: (columns: string[] | undefined) => string;
export declare const getOrder: (order: Order | undefined) => string;
export declare const getLimit: (offset: number, limit: number) => string;
export declare const getWhere: (where: Option | undefined) => {
    str: string;
    arr: (string | number | Date)[];
};
export declare const getColAndVals: (value: Row | Row[]) => {
    columnStr: string;
    valStr: string;
    valArr: (string | number | Date)[];
};
export declare const getSet: (value: Row) => {
    setStr: string;
    setVal: (string | number | Date)[];
};
