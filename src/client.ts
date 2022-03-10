import {
  createPool,
  FieldPacket,
  OkPacket,
  Pool,
  // PoolOptions,
  QueryError,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2';
import Query from './query';
import Transaction from './transaction';
import { BasicType, Config } from './types';

export default class Client extends Query {
  pool: Pool;

  constructor(config: Config) {
    super();
    const { connResetRetry, ...rest } = config;
    this.retryCount = connResetRetry || 3;
    this.pool = createPool(rest);
  }

  // private query method with retry
  protected async _subQuery(
    useLiteral: boolean,
    retryCount: number,
    sql: string,
    values?: BasicType[],
  ): Promise<[RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]]> {
    console.log(`retryCount:${retryCount}`);
    try {
      return useLiteral ? this.pool.promise().query(sql) : this.pool.promise().execute(sql, values);
    } catch (err) {
      if (retryCount > 0 && (err as QueryError).code === 'ECONNRESET') {
        console.error({ msg: 'connreset error!!!', err });
        return this._subQuery(useLiteral, retryCount - 1, sql, values);
      } else {
        throw err;
      }
    }
  }

  /**
   * manual begin transaction method
   * @returns Transaction instance
   */
  async beginTransaction() {
    const conn = await this.pool.promise().getConnection();
    // start transaction
    conn.beginTransaction();
    return new Transaction(conn, this.retryCount);
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
