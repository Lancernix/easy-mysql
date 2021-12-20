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

// 单值操作符
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
  [key: string]: string | number | Date;
}
type SingleOption = Record<SingleOperator, SingleOptionValue>;

// 双（多）值操作符
export enum MultiOperator {
  bw = 'bw',
  in = 'in',
  ni = 'ni',
}
export interface MultiOptionValue {
  [key: string]: string[] | number[] | Date[];
}
type MultiOption = Record<MultiOperator, MultiOptionValue>;

// OR操作符
export enum OrOperator {
  or = 'or',
}
export type OrOptionValue = Record<SingleOperator, SingleOptionValue> | Record<MultiOperator, MultiOptionValue>;

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

export type Option = Partial<SingleOption & MultiOption & OrOption>;

export interface Order {
  [key: string]: 'desc' | 'asc';
}

export type OpFuncRet = [string, (string | number | Date)[]];

export interface IQueryParams {
  table: string;
  column?: string[];
  where?: Option;
  order?: Order;
  limit?: number;
  offset?: number;
}
