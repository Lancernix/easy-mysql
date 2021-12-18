/**
 * constant define
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

/**
 * type define
 */
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

export type OrOptionValue = Record<SingleOperator, SingleOptionValue> | Record<MultiOperator, MultiOptionValue>;
// | Record<SingleOperator.eq, SingleOptionValue>
// | Record<SingleOperator.ne, SingleOptionValue>
// | Record<SingleOperator.ge, SingleOptionValue>
// | Record<SingleOperator.gt, SingleOptionValue>
// | Record<SingleOperator.le, SingleOptionValue>
// | Record<SingleOperator.lt, SingleOptionValue>
// | Record<SingleOperator.like, SingleOptionValue>
// | Record<MultiOperator.bw, MultiOptionValue>
// | Record<MultiOperator.in, MultiOptionValue>
// | Record<MultiOperator.ni, MultiOptionValue>;

type OrOption = Record<OrOperator, Partial<OrOptionValue>[]>;

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

export type TOption = [Operator, string | string[], unknown];

export type TOrOption = [Operator.or, ...TOption[]];

export type Order = [string, 'desc' | 'asc'];

export type OpFuncRet = [string, (string | number)[]];

export interface IQueryParams {
  table: string;
  column?: string[];
  where?: Option;
  order?: Order[];
  limit?: number;
  offset?: number;
}
