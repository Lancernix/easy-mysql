/**
 * error define
 */
export interface IOptionError extends Error {}

export interface IOptionErrorConstructor extends ErrorConstructor {
  new (message?: string): IOptionError;
  (message?: string): IOptionError;
  readonly prototype: IOptionError;
}

export let OptionError: IOptionErrorConstructor;

export interface IOperatorError extends Error {}

export interface IOperatorErrorConstructor extends ErrorConstructor {
  new (message?: string): IOperatorError;
  (message?: string): IOperatorError;
  readonly prototype: IOperatorError;
}

export let OperatorError: IOperatorErrorConstructor;

export interface IColumnValueError extends Error {}

export interface IColumnValueErrorConstructor extends ErrorConstructor {
  new (message?: string): IColumnValueError;
  (message?: string): IColumnValueError;
  readonly prototype: IColumnValueError;
}

export let ColumnValueError: IColumnValueErrorConstructor;

/**
 * type define
 */
export const AND = 'AND';

export const PLACEHOLDER = '?';

export enum EOperator {
  eq = '=',
  ne = '!=',
  gt = '>',
  lt = '<',
  ge = '>=',
  le = '<=',
  like = 'LIKE',
  bw = 'BETWEEN',
  in = 'IN',
  ni = 'NOT IN',
  or = 'OR',
}

export type TColumns = string[];

export type TOption = [EOperator, string | string[], unknown];

export type TOrOption = [EOperator.or, ...TOption[]];

export type TOrder = [string, 'desc' | 'asc'];

export type TOpFuncRet = [string, unknown[]];

export interface IQueryParams {
  table: string;
  columns?: TColumns[];
  options?: (TOption | TOrOption)[];
  orders?: TOrder[];
  limit?: number;
  offset?: number;
}
