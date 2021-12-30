import { PoolConnection } from 'mysql2/promise';
import Query from './query';

export default class Transaction extends Query {
  conn: PoolConnection | null;

  constructor(conn: PoolConnection) {
    super();
    this.conn = conn;
  }

  /**
   * basic query method
   * @param sql (prepared) sql statement
   * @param values values corresponding to placeholders
   * @returns sql execute result
   */
  async _query(sql: string, values?: unknown | unknown[] | { [param: string]: unknown }) {
    try {
      return await this.conn!.execute(sql, values);
    } catch (error) {
      throw error;
    }
  }

  checkConn() {
    if (!this.conn) {
      throw new Error('transaction has committed or rollbacked!');
    }
  }

  async commit() {
    this.checkConn();
    try {
      return this.conn!.commit();
    } finally {
      this.conn!.release();
      this.conn = null;
    }
  }

  async rollback() {
    this.checkConn();
    try {
      return this.conn!.rollback();
    } finally {
      this.conn!.release();
      this.conn = null;
    }
  }
}
