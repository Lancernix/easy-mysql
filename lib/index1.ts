import { createPool, createConnection, ConnectionOptions, Pool, Query } from 'mysql2';
import { EOperator, IQueryParams, OperatorError, OptionError, TOrOption } from './typing';
import { commonOpFunc, bwOpFunc, inAndNiOpFunc, orOpFunc } from './oprator1';

class MySQLClient {
  pool: Pool;

  constructor(config: ConnectionOptions) {
    this.pool = createPool(config);
  }

  // 内部调用查询函数
  async _query(sql: string, values: any | any[] | { [param: string]: any }): Promise<Query> {
    return this.pool.execute(sql, values);
  }

  // getConnection() {
  //   const onErr = (err: NodeJS.ErrnoException) => {
  //     err.name = 'MySQLConnectionError';
  //     throw err;
  //   };

  //   const onConnection = params => {
  //     return;
  //   };
  //   return this.pool.getConnection();
  // }

  async select(params: IQueryParams): Promise<Query> {
    const { table, columns, options, orders, limit = 1, offset = 0 } = params;
    let sql: string,
      columnStr: string,
      where: string,
      optionValues: unknown[] = [],
      order: string,
      limitStr: string;
    // columns
    columnStr = typeof columns === undefined || !columns?.length ? '*' : columns.join(', ');
    // order
    if (typeof orders === undefined || !orders?.length) {
      order = '';
    } else {
      order = orders.reduce(item => ` ${item[0]} ${item[1].toUpperCase},`, 'ORDER BY').replace(/,$/, '');
    }
    // limit
    limitStr = `LIMIT ${offset}, ${limit}`;
    // where
    if (typeof options === undefined || !options?.length) {
      where = '';
    } else {
      where = 'WHRER ';
      for (let i = 0; i < options.length; i++) {
        if (!(options[i] instanceof Array) || !options[i].length) {
          throw OptionError('every option should be a non-empty array!');
        }
        const item = options[i];
        switch (item[0]) {
          case EOperator.eq:
          case EOperator.gt:
          case EOperator.lt:
          case EOperator.ge:
          case EOperator.le:
          case EOperator.ne:
          case EOperator.like:
            const [_str, _values] = commonOpFunc(item);
            where += _str;
            optionValues.push(..._values);
            break;
          case EOperator.bw:
            const [_strBw, _valuesBw] = bwOpFunc(item);
            where += _strBw;
            optionValues.push(..._valuesBw);
            break;
          case EOperator.in:
          case EOperator.ni:
            const [_strI, _valuesI] = inAndNiOpFunc(item);
            where += _strI;
            optionValues.push(..._valuesI);
            break;
          case EOperator.or:
            const [_strOr, _valuesOr] = orOpFunc(item as TOrOption);
            where += _strI;
            optionValues.push(..._valuesI);
            break;
          default:
            throw OperatorError(`${item[0]} is not a valid operator!`);
        }
        i !== options.length - 1 && (where += ' AND ');
      }
    }
    // prepared statement
    sql = `SELECT ${columnStr} FROM ${table} ${where} ${order} ${limitStr}`;
    console.log(sql);
    console.log(optionValues);
    return this._query(sql, optionValues);
  }
}

export default MySQLClient;
