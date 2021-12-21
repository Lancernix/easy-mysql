import { createPool, createConnection, ConnectionOptions, Pool, RowDataPacket } from 'mysql2';
import { SelectParams, CountAndDelParams, InsertParams, UpdateParams } from './typing';
import { getColumns, getOrder, getLimit, getWhere, getColAndVals, getSet } from './option';
import { COUNT, DELETE, FROM, INSERT, INTO, SELECT, SET, UPDATE, VALUES, WHRER } from './constant';

class MySQLClient {
  pool: Pool;

  constructor(config: ConnectionOptions) {
    this.pool = createPool(config);
  }

  // 内部调用查询函数
  async _query(sql: string, values: any | any[] | { [param: string]: any }) {
    return this.pool.promise().execute(sql, values);
  }

  // select
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
      console.log(error);
    }
  }

  // count
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
      console.log(error);
    }
  }

  // insert
  async insert(params: InsertParams) {
    const { table, value } = params;
    const { columnStr, valStr, valArr } = getColAndVals(value);
    const sql = `${INSERT} ${INTO} ${table} ${columnStr} ${VALUES} ${valStr};`;
    try {
      const [rows, _fields] = await this._query(sql, valArr);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  // update
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
      console.log(error);
    }
  }

  // delete
  async delete(params: CountAndDelParams) {
    const { table, where } = params;
    const { str: whereStr, arr: optionValues } = getWhere(where);
    const sql = `${DELETE} ${FROM} ${table}${whereStr};`;
    try {
      const [rows, _fields] = await this._query(sql, optionValues);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}

export default MySQLClient;
