import { PoolConnection } from 'mysql2/promise';
import Query from './query';

export default class Connection extends Query {
  conn: PoolConnection;
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
    return this.conn.execute(sql, values);
  }
}
