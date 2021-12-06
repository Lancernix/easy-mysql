import { createPool, createConnection, ConnectionOptions, Pool, Query } from 'mysql2';

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
    let _sql: string,
      _columnStr: string,
      _where: string,
      _optionValues: unknown[] = [],
      _order: string,
      _limit: string;
    _columnStr = typeof columns === undefined || !columns?.length ? '*' : columns.join(', ');
    if (typeof options === undefined || !options?.length) {
      _where = '';
    }
    _where = 'WHERE ';
    for (let i = 0; i < (options as TOption[]).length; i++) {
      let optionStr: string = '';
      const item = options as TOption[];
      if (item[i].length !== 3) {
        throw OptionError('every option need 3 elements!');
      }
      switch (item[i][0]) {
        case EOperator.eq:
        case EOperator.gt:
        case EOperator.lt:
        case EOperator.ge:
        case EOperator.le:
        case EOperator.ne:
        case EOperator.like:
          if (Array.isArray(item[i][2])) {
            throw ColumnValueError(`${item[i][0]} operator's column value is not a array!`);
          }
          optionStr = `${item[i][1]} ${item[i][0]} ${PLACEHOLDER}`;
          _optionValues.push(item[i][2]);
          break;
        case EOperator.bw:
          if (!Array.isArray(item[i][2]) || (item[i][2] as Array<unknown>).length !== 2) {
            throw ColumnValueError(`${item[i][0]} operator's column value should be a array with 2 element!`);
          }
          optionStr = `${item[i][1]} ${item[i][0]} ${PLACEHOLDER} ${AND} ${PLACEHOLDER}`;
          _optionValues.push(...(item[i][2] as Array<unknown>));
          break;
        case EOperator.in:
        case EOperator.ni:
          if (!Array.isArray(item[i][2]) || (item[i][2] as Array<unknown>).length === 0) {
            throw ColumnValueError(`${item[i][0]} operator's column value need a non-empty array!`);
          }
          optionStr = `${item[i][1]} ${item[i][0]} (`;
          for (let j = 0; i < (item[i][2] as Array<unknown>).length; j++) {
            optionStr += `${PLACEHOLDER}, `;
          }
          optionStr = optionStr.replace(/,\s$/, '') + ')';
          _optionValues.push(...(item[i][2] as Array<unknown>));
          break;
        // TODO: OR 如何实现
        case EOperator.or:
          if (
            !Array.isArray(item[i][1]) ||
            !Array.isArray(item[i][2]) ||
            item[i][1].length !== (item[i][2] as Array<unknown>).length
          ) {
            throw ColumnValueError(`OR operator's column names or values are invalid!`);
          }
          optionStr = '(';
          for (let j = 0; j < (item[i][1] as Array<unknown>).length; j++) {
            optionStr += `${item[i][1][j]} `;
          }
          break;
        default:
          throw OperatorError(`${item[i][0]} is not a valid operator!`);
      }
    }

    if (typeof orders === undefined || !orders?.length) {
      _order = '';
    }
    _order = (orders as TOrder[]).reduce(item => ` ${item[0]} ${item[1].toUpperCase},`, 'ORDER BY').replace(/,$/, '');
    _limit = `LIMIT ${offset}, ${limit}`;
    _sql = `SELECT ${_columnStr} FROM ${table} ${_where} ${_order} ${_limit}`;
    _optionValues = [''];

    return this._query(_sql, _optionValues);
  }
}

export default MySQLClient;
