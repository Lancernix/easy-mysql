/**
 * basic query class, implements the CURD methods
 */
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { getColAndVals, getColumns, getLimit, getOrder, getSet, getWhere } from './clause';
import { COUNT, DELETE, FROM, INSERT, INTO, SELECT, SET, UPDATE, VALUES } from './constant';
import { CountAndDelParams, InsertParams, SelectParams, UpdateParams } from './typing';

export default class Query {
  /**
   * basic query method, subclass should override this method
   * @param _sql (prepared) sql statement
   * @param _values values corresponding to placeholders
   * @returns sql execute result
   */
  async _query(
    _sql: string,
    _values?: unknown | unknown[] | { [param: string]: unknown },
  ): Promise<[RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]]> {
    throw new Error('subclass must override this method');
  }

  /**
   * query method
   * @param sql (prepared) sql statement
   * @param values values corresponding to placeholders
   * @returns sql execute result
   */
  async query(sql: string, values?: unknown | unknown[] | { [param: string]: unknown }) {
    return this._query(sql, values);
  }

  /**
   * select method
   * @param params a object including table、column、where、order、limit and offset attributes
   * @returns sql execute result
   */
  async select(params: SelectParams) {
    const { table, column, where, order, limit = 1, offset = 0 } = params;
    // column
    const columnStr = getColumns(column);
    // order
    const orderStr = getOrder(order);
    // limit
    const limitStr = getLimit(offset, limit);
    // where & optionValues
    const { str: whereStr, arr: optionValues } = getWhere(where);
    // prepared statement
    const sql = `${SELECT} ${columnStr} ${FROM} ${table}${whereStr}${orderStr}${limitStr};`;
    try {
      const [rows, _fields] = await this._query(sql, optionValues);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  /**
   * select count method
   * @param params a object including table and where attributes
   * @returns row count
   */
  async count(params: CountAndDelParams): Promise<number | undefined> {
    const { table, where } = params;
    // where
    const whereStr = getWhere(where).str;
    // optionValues
    const optionValues = getWhere(where).arr;
    // prepared statement
    const sql = `${SELECT} ${COUNT} ${FROM} ${table}${whereStr};`;
    try {
      const [rows, _fields] = await this._query(sql, optionValues);
      return (rows as RowDataPacket)[0][`${COUNT}`];
    } catch (error) {
      throw error;
    }
  }

  /**
   * insert method
   * @param params a object including table and value attributes
   * @returns sql execute result
   */
  async insert(params: InsertParams) {
    const { table, value } = params;
    const { columnStr, valStr, valArr } = getColAndVals(value);
    const sql = `${INSERT} ${INTO} ${table} ${columnStr} ${VALUES} ${valStr};`;
    try {
      const [rows, _fields] = await this._query(sql, valArr);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  /**
   * update method
   * @param params a object including table、value and where attributes
   * @returns sql execute result
   */
  async update(params: UpdateParams) {
    const { table, value, where } = params;
    const { setStr, setVal } = getSet(value);
    const { str: whereStr, arr: optionValues } = getWhere(where);
    const sql = `${UPDATE} ${table} ${SET} ${setStr}${whereStr};`;
    const valArr = [...setVal, ...optionValues];
    try {
      const [rows, _fields] = await this._query(sql, valArr);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  /**
   * delete method
   * @param params a object including table and where attributes
   * @returns sql execute result
   */
  async delete(params: CountAndDelParams) {
    const { table, where } = params;
    const { str: whereStr, arr: optionValues } = getWhere(where);
    const sql = `${DELETE} ${FROM} ${table}${whereStr};`;
    try {
      const [rows, _fields] = await this._query(sql, optionValues);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}
