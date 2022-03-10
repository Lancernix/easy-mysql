import { FieldPacket, OkPacket, PoolConnection, QueryError, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import Query from './query';
import { BasicType } from './types';

export default class Transaction extends Query {
  conn: PoolConnection | null;
  retryCount: number;

  constructor(conn: PoolConnection, retryCount: number) {
    super();
    this.conn = conn;
    this.retryCount = retryCount;
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
      return useLiteral ? await this.conn!.query(sql) : await this.conn!.execute(sql, values);
    } catch (err) {
      if (retryCount > 0 && (err as QueryError).code === 'ECONNRESET') {
        console.error({ msg: 'connreset error!!!', err });
        return this._subQuery(useLiteral, retryCount - 1, sql, values);
      } else {
        throw err;
      }
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
