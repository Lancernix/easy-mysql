import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
/**
 * error define
 */
export interface IOptionError extends Error {
}
export interface IOptionErrorConstructor extends ErrorConstructor {
    new (message?: string): IOptionError;
    (message?: string): IOptionError;
    readonly prototype: IOptionError;
}
export declare let OptionError: IOptionErrorConstructor;
export interface IOperatorError extends Error {
}
export interface IOperatorErrorConstructor extends ErrorConstructor {
    new (message?: string): IOperatorError;
    (message?: string): IOperatorError;
    readonly prototype: IOperatorError;
}
export declare let OperatorError: IOperatorErrorConstructor;
export interface IColumnValueError extends Error {
}
export interface IColumnValueErrorConstructor extends ErrorConstructor {
    new (message?: string): IColumnValueError;
    (message?: string): IColumnValueError;
    readonly prototype: IColumnValueError;
}
export declare let ColumnValueError: IColumnValueErrorConstructor;
/**
 * type define
 */
export declare const AND = "AND";
export declare const PLACEHOLDER = "?";
export declare enum EOperator {
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
export declare type TColumns = string[];
export declare type TOption = [EOperator, string | string[], unknown];
export declare type TOrOption = [EOperator.or, ...TOption[]];
export declare type TOrder = [string, 'desc' | 'asc'];
export declare type TOpFuncRet = [string, unknown[]];
export interface IQueryParams {
    table: string;
    columns?: TColumns[];
    options?: (TOption | TOrOption)[];
    orders?: TOrder[];
    limit?: number;
    offset?: number;
}
export declare type ResultRow = RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader;
