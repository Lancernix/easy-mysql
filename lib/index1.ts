import { createPool, createConnection, ConnectionOptions, Pool, FieldPacket } from 'mysql2';
import { Operator, IQueryParams, OperatorError, OptionError, TOrOption } from './typing';
import { commonOpFunc, bwOpFunc, inAndNiOpFunc, orOpFunc } from './oprator1';

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
    const { table, column: columns, where, order: orders, limit = 1, offset = 0 } = params;
    let sql: string,
      columnStr: string,
      whereStr: string,
      optionValues: unknown[] = [],
      order: string,
      limitStr: string;
    // columns
    columnStr = typeof columns === undefined || !columns?.length ? '*' : columns.join(', ');
    // order
    if (typeof orders === undefined || !orders?.length) {
      order = '';
    } else {
      order = orders.reduce(item => ` ${item[0]} ${item[1].toUpperCase},`, ' ORDER BY').replace(/,$/, '');
    }
    // limit
    limitStr = ` LIMIT ${offset}, ${limit}`;
    // where
    if (typeof where === undefined || !where?.length) {
      whereStr = '';
    } else {
      whereStr = ' WHERE ';
      for (let i = 0; i < where.length; i++) {
        if (!(where[i] instanceof Array) || !where[i].length) {
          throw OptionError('every option should be a non-empty array!');
        }
        const item = where[i];
        switch (item[0]) {
          case Operator.eq:
          case Operator.gt:
          case Operator.lt:
          case Operator.ge:
          case Operator.le:
          case Operator.ne:
          case Operator.like:
            const [_str, _values] = commonOpFunc(item);
            whereStr += _str;
            optionValues.push(..._values);
            break;
          case Operator.bw:
            const [_strBw, _valuesBw] = bwOpFunc(item);
            whereStr += _strBw;
            optionValues.push(..._valuesBw);
            break;
          case Operator.in:
          case Operator.ni:
            const [_strI, _valuesI] = inAndNiOpFunc(item);
            whereStr += _strI;
            optionValues.push(..._valuesI);
            break;
          case Operator.or:
            const [_strOr, _valuesOr] = orOpFunc(item as TOrOption);
            whereStr += _strI;
            optionValues.push(..._valuesI);
            break;
          default:
            throw OperatorError(`${item[0]} is not a valid operator!`);
        }
        i !== where.length - 1 && (whereStr += ' AND ');
      }
    }
    // prepared statement
    sql = `SELECT ${columnStr} FROM ${table}${whereStr}${order}${limitStr}`;
    // console.log(sql);
    // console.log(optionValues);
    const [rows, _fields] = await this._query(sql, optionValues);
    return rows;
  }

  async count(params: IQueryParams) {
    return await this.select();
  }
}

export default MySQLClient;
