/**
 * error define
 */
export interface IOptionError extends Error {}

export interface OptionErrorConstructor extends ErrorConstructor {
  new (message?: string): IOptionError;
  (message?: string): IOptionError;
  readonly prototype: IOptionError;
}

export let OptionError: OptionErrorConstructor;

export interface IOperatorError extends Error {}

export interface OperatorErrorConstructor extends ErrorConstructor {
  new (message?: string): IOperatorError;
  (message?: string): IOperatorError;
  readonly prototype: IOperatorError;
}

export let OperatorError: OperatorErrorConstructor;

export interface ColumnValueError extends Error {}

export interface ColumnValueErrorConstructor extends ErrorConstructor {
  new (message?: string): ColumnValueError;
  (message?: string): ColumnValueError;
  readonly prototype: ColumnValueError;
}

export let ColumnValueError: ColumnValueErrorConstructor;
/**
 * type define
 */
export const SELECT = 'SELECT';

export const FROM = 'FROM';

export const INSERT = 'INSERT';

export const AND = 'AND';

export const OR = 'OR';

export const WHRER = 'WHERE';

export const ORDER = 'ORDER BY';

export const LIMIT = 'LIMIT';

export const PLACEHOLDER = '?';

export enum SingleOperator {
  eq = 'eq',
  ne = 'ne',
  gt = 'gt',
  lt = 'lt',
  ge = 'ge',
  le = 'le',
  like = 'like',
}

export interface SingleOptionValue {
  column: string;
  value: string | number;
}

type SingleOption = Record<SingleOperator, SingleOptionValue | SingleOptionValue[]>;

export enum MultiOperator {
  bw = 'bw',
  in = 'in',
  ni = 'ni',
}

export interface MultiOptionValue {
  column: string;
  value: (string | number)[];
}

type MultiOption = Record<MultiOperator, MultiOptionValue | MultiOptionValue[]>;

export enum OrOperator {
  or = 'or',
}

export type OrOptionValue = Record<SingleOperator, SingleOptionValue> & Record<MultiOperator, MultiOptionValue>;

type OrOption = Record<OrOperator, Partial<OrOptionValue>>;

const a: OrOption = {
  or: {
    eq: { column: 'l', value: '1' },
    bw: { column: 'm', value: [1, 2] },
  },
};

export enum Operator {
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

export type Option = SingleOption & MultiOption & OrOption;

export type Columns = string[];

export type TOption = [Operator, string | string[], unknown];

export type TOrOption = [Operator.or, ...TOption[]];

export type TOrder = [string, 'desc' | 'asc'];

export type OpFuncRet = [string, (string | number)[]];

export interface IQueryParams {
  table: string;
  column?: Columns[];
  // where?: (TOption | TOrOption)[];
  where?: Option;
  order?: TOrder[];
  limit?: number;
  offset?: number;
}
