import { createPool, Pool, PoolOptions } from 'mysql2';
import Query from './query';
import Transaction from './transaction';

export default class Client extends Query {
  pool: Pool;

  constructor(config: PoolOptions) {
    super();
    this.pool = createPool(config);
  }

  /**
   * basic query method
   * @param sql (prepared) sql statement
   * @param values values corresponding to placeholders
   * @returns sql execute result
   */
  async _query(sql: string, values?: unknown | unknown[] | { [param: string]: unknown }) {
    return this.pool.promise().execute(sql, values);
  }

  /**
   * manual begin transaction method
   * @returns Transaction instance
   */
  async beginTransaction() {
    const conn = await this.pool.promise().getConnection();
    // start transaction
    conn.beginTransaction();
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
