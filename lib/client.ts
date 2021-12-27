import { createPool, Pool, PoolOptions } from 'mysql2';
import Connection from './connection';
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
    return await this.pool.promise().execute(sql, values);
  }

  async beginTransaction() {
    try {
      const conn = await this.pool.promise().getConnection();
      return new Transaction(conn);
    } catch (error) {
      throw error;
    }
  }

  async autoTransction(scope: (tran: Transaction) => unknown, ctx?: Record<string, unknown>) {
    ctx = ctx || {};
    if (!ctx._transactionConnection) {
      ctx._transactionConnection = await this.beginTransaction();
    }
    const tran = ctx._transactionConnection;

    if (!ctx._transactionScopeCount) {
      ctx._transactionScopeCount = 1;
    } else {
      (ctx._transactionScopeCount as number)++;
    }
    try {
      const result = await scope(tran as Transaction);
      (ctx._transactionScopeCount as number)--;
      if (ctx._transactionScopeCount === 0) {
        ctx._transactionConnection = null;
        await (tran as Transaction).commit();
      }
      return result;
    } catch (err) {
      if (ctx._transactionConnection) {
        ctx._transactionConnection = null;
        await (tran as Transaction).rollback();
      }
      throw err;
    }
  }

  /**
   * escape value for preventing sql injection
   * @param params input value
   * @returns escaped string value
   */
  escape(params: unknown): string {
    return this.pool.escape(params);
  }
}
