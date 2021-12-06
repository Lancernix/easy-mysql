/**
 * error declare
 */
declare interface IOptionError extends Error {}

declare interface IOptionErrorConstructor extends ErrorConstructor {
  new (message?: string): IOptionError;
  (message?: string): IOptionError;
  readonly prototype: IOptionError;
}

declare const OptionError: IOptionErrorConstructor;

declare interface IOperatorError extends Error {}

declare interface IOperatorErrorConstructor extends ErrorConstructor {
  new (message?: string): IOperatorError;
  (message?: string): IOperatorError;
  readonly prototype: IOperatorError;
}

declare const OperatorError: IOperatorErrorConstructor;

declare interface IColumnValueError extends Error {}

declare interface IColumnValueErrorConstructor extends ErrorConstructor {
  new (message?: string): IColumnValueError;
  (message?: string): IColumnValueError;
  readonly prototype: IColumnValueError;
}

declare const ColumnValueError: IColumnValueErrorConstructor;

/**
 * type declare
 */
declare const AND = 'AND';

declare const PLACEHOLDER = '?';

declare enum EOperator {
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

declare type TColumns = string[];

declare type TOption = [EOperator, string | string[], unknown];

declare type TOrder = [string, 'desc' | 'asc'];

declare interface IQueryParams {
  table: string;
  columns?: TColumns[];
  options?: TOption[];
  orders?: TOrder[];
  limit?: number;
  offset?: number;
}
