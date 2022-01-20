/**
 * type define
 */
import Literal from './literal';

export type BasicType = string | number | Date | Literal;

export interface Row {
  [key: string]: BasicType;
}

// single value operator
export enum SingleOperator {
  eq = 'eq',
  ne = 'ne',
  gt = 'gt',
  lt = 'lt',
  ge = 'ge',
  le = 'le',
  like = 'like',
}

export type SingleOptionValue = Row;
type SingleOption = Record<SingleOperator, SingleOptionValue>;

// multiple value operator
export enum MultiOperator {
  bw = 'bw',
  in = 'in',
  ni = 'ni',
}
export interface MultiOptionValue {
  [key: string]: BasicType[];
}
type MultiOption = Record<MultiOperator, MultiOptionValue>;

// or operator
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

export type OpFuncRet = [string, BasicType[]];

export interface SelectParams {
  table: string;
  column?: string[];
  where?: Option;
  order?: Order;
  limit?: number;
  offset?: number;
}

export type CountAndDelParams = Pick<SelectParams, 'table' | 'where'>;
export interface InsertParams {
  table: string;
  value: Row | Row[];
}

export interface UpdateParams {
  table: string;
  value: Row;
  where?: Option;
}
