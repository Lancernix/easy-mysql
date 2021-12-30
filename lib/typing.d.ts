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
    [key: string]: string | number | Date;
}
declare type SingleOption = Record<SingleOperator, SingleOptionValue>;
export declare enum MultiOperator {
    bw = "bw",
    in = "in",
    ni = "ni"
}
export interface MultiOptionValue {
    [key: string]: string[] | number[] | Date[];
}
declare type MultiOption = Record<MultiOperator, MultiOptionValue>;
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
export declare type Option = Partial<SingleOption & MultiOption & OrOption>;
export interface Order {
    [key: string]: 'desc' | 'asc';
}
export declare type OpFuncRet = [string, (string | number | Date)[]];
export interface SelectParams {
    table: string;
    column?: string[];
    where?: Option;
    order?: Order;
    limit?: number;
    offset?: number;
}
export declare type CountAndDelParams = Pick<SelectParams, 'table' | 'where'>;
export interface Row {
    [key: string]: string | number | Date;
}
export interface InsertParams {
    table: string;
    value: Row | Row[];
}
export interface UpdateParams {
    table: string;
    value: Row;
    where: Option;
}
export {};
