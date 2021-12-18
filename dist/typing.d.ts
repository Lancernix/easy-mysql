/**
 * constant define
 */
export declare const SELECT = "SELECT";
export declare const FROM = "FROM";
export declare const INSERT = "INSERT";
export declare const AND = "AND";
export declare const OR = "OR";
export declare const WHRER = "WHERE";
export declare const ORDER = "ORDER BY";
export declare const LIMIT = "LIMIT";
export declare const PLACEHOLDER = "?";
/**
 * type define
 */
export declare enum SingleOperator {
    eq = "eq",
    ne = "ne",
    gt = "gt",
    lt = "lt",
    ge = "ge",
    le = "le",
    like = "like"
}
export interface SingleOptionValue {
    column: string;
    value: string | number;
}
declare type SingleOption = Record<SingleOperator, SingleOptionValue | SingleOptionValue[]>;
export declare enum MultiOperator {
    bw = "bw",
    in = "in",
    ni = "ni"
}
export interface MultiOptionValue {
    column: string;
    value: (string | number)[];
}
declare type MultiOption = Record<MultiOperator, MultiOptionValue | MultiOptionValue[]>;
export declare enum OrOperator {
    or = "or"
}
export declare type OrOptionValue = Record<SingleOperator, SingleOptionValue> | Record<MultiOperator, MultiOptionValue>;
declare type OrOption = Record<OrOperator, Partial<OrOptionValue>[]>;
export declare enum Operator {
    eq = "=",
    ne = "!=",
    gt = ">",
    lt = "<",
    ge = ">=",
    le = "<=",
    like = "LIKE",
    bw = "BETWEEN",
    in = "IN",
    ni = "NOT IN",
    or = "OR"
}
export declare type Option = SingleOption & MultiOption & OrOption;
export declare type TOption = [Operator, string | string[], unknown];
export declare type TOrOption = [Operator.or, ...TOption[]];
export declare type Order = [string, 'desc' | 'asc'];
export declare type OpFuncRet = [string, (string | number)[]];
export interface IQueryParams {
    table: string;
    column?: string[];
    where?: Option;
    order?: Order[];
    limit?: number;
    offset?: number;
}
export {};
