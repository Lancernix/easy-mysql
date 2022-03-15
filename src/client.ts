import { createPool, Pool } from 'promise-mysql';
import * as Bluebird from 'bluebird';
import Query from './query';
import Transaction from './transaction';
import { BasicType, Config } from './types';
import Literal from './literal';

export default class Client extends Query {
  pool: Bluebird<Pool>;

  constructor(config: Config) {
    super();
    this.pool = createPool(config);
  }

  // // private query method with retry
  // protected async _subQuery(
  //   useLiteral: boolean,
  //   retryCount: number,
  //   sql: string,
  //   values?: BasicType[],
  // ): Promise<[RowDataPacket[][] | OkPacket]> {
  //   console.log(`retryCount:${retryCount}`);
  //   try {
  //     return useLiteral ? this.pool.promise().query(sql) : this.pool.promise().execute(sql, values);
  //   } catch (err) {
  //     if (retryCount > 0 && (err as QueryError).code === 'ECONNRESET') {
  //       console.error({ msg: 'connreset error!!!', err });
  //       return this._subQuery(useLiteral, retryCount - 1, sql, values);
  //     } else {
  //       throw err;
  //     }
  //   }
  // }

  /**
   * basic query method
   * @param sql (prepared) sql statement
   * @param values values corresponding to placeholders
   * @returns sql execute result
   */
  protected async _query(sql: string, values?: BasicType[]) {
    let useLiteral = false;
    const resolvedPool = await this.pool;
    const escapedValues = values
      ? values.map(item => {
          if (item instanceof Literal) {
            useLiteral = true;
            return this.escape(item.text)
              .slice(1, -1)
              .replace(/\\(?=['"])/g, '');
          }
          return this.escape(item);
        })
      : [];
    if (useLiteral) {
      escapedValues.forEach(value => (sql = sql.replace(/\?/, value)));
      return resolvedPool.query(sql);
    }
    return resolvedPool.query(sql, values);
  }

  /**
   * manual begin transaction method
   * @returns Transaction instance
   */
  async beginTransaction() {
    const conn = (await this.pool).getConnection();
    // start transaction
    (await conn).beginTransaction();
    return new Transaction(conn);
  }

  /**
   * auto transaction method
   * @param scope function with query statements
   * @param ctx context, such koa's ctx or egg's ctx, make sure only one active transaction on this ctx
   * @returns transaction result
   */
  async autoTransaction(scope: (tran: Transaction) => unknown, ctx?: Record<string, unknown>) {
    ctx = ctx || {};
    if (!ctx._transactionConnection) {
      ctx._transactionConnection = await this.beginTransaction();
    }
    const tran = ctx._transactionConnection as Transaction;

    if (!ctx._transactionScopeCount) {
      ctx._transactionScopeCount = 1;
    } else {
      (ctx._transactionScopeCount as number)++;
    }
    try {
      const result = await scope(tran);
      (ctx._transactionScopeCount as number)--;
      if (ctx._transactionScopeCount === 0) {
        await (tran as Transaction).commit();
        ctx._transactionConnection = null;
      }
      return result;
    } catch (err) {
      if (ctx._transactionConnection) {
        await (tran as Transaction).rollback();
        ctx._transactionConnection = null;
      }
      throw err;
    }
  }
}
