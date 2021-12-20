import { createPool, createConnection, ConnectionOptions, Pool } from 'mysql2';
import { IQueryParams, SELECT, FROM } from './typing';
import { getColumns, getOrder, getLimit, getWhere } from './option';

class MySQLClient {
  pool: Pool;

  constructor(config: ConnectionOptions) {
    this.pool = createPool(config);
  }

  // 内部调用查询函数
  async _query(sql: string, values: any | any[] | { [param: string]: any }) {
    return this.pool.promise().execute(sql, values);
  }

  async select(params: IQueryParams) {
    const { table, column, where, order, limit = 1, offset = 0 } = params;
    if (table === void 0) {
      throw Error('table params is required!');
    }
    let sql: string,
      columnStr: string,
      whereStr: string,
      optionValues: (string | number)[],
      orderStr: string,
      limitStr: string;
    // column
    columnStr = getColumns(column);
    // order
    orderStr = getOrder(order);
    // limit
    limitStr = getLimit(offset, limit);
    // where
    whereStr = getWhere(where).str;
    // optionValues
    optionValues = getWhere(where).arr;
    // prepared statement
    sql = `${SELECT} ${columnStr} ${FROM} ${table}${whereStr}${orderStr}${limitStr}`;
    console.log(sql);
    console.log(optionValues);
    const [rows, _fields] = await this._query(sql, optionValues);
    return rows;
  }

  // async count(params: IQueryParams) {
  //   return await this.select();
  // }
}

export default MySQLClient;
