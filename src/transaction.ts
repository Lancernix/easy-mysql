// import { FieldPacket, OkPacket, PoolConnection, QueryError, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { PoolConnection } from 'promise-mysql';
import * as Bluebird from 'bluebird';
import Query from './query';
import { BasicType } from './types';
import Literal from './literal';

export default class Transaction extends Query {
  conn: Bluebird<PoolConnection> | null;

  constructor(conn: Bluebird<PoolConnection>) {
    super();
    this.conn = conn;
  }

  /**
   * basic query method
   * @param sql (prepared) sql statement
   * @param values values corresponding to placeholders
   * @returns sql execute result
   */
  protected async _query(sql: string, values?: BasicType[]) {
    let useLiteral = false;
    const resolvedConn = await this.conn;
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
      return resolvedConn!.query(sql);
    }
    return resolvedConn!.query(sql, values);
  }

  // private query method with retry
  // protected async _subQuery(
  //   useLiteral: boolean,
  //   retryCount: number,
  //   sql: string,
  //   values?: BasicType[],
  // ): Promise<[RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]]> {
  //   console.log(`retryCount:${retryCount}`);
  //   try {
  //     return useLiteral ? await this.conn!.query(sql) : await this.conn!.execute(sql, values);
  //   } catch (err) {
  //     if (retryCount > 0 && (err as QueryError).code === 'ECONNRESET') {
  //       console.error({ msg: 'connreset error!!!', err });
  //       return this._subQuery(useLiteral, retryCount - 1, sql, values);
  //     } else {
  //       throw err;
  //     }
  //   }
  // }

  checkConn() {
    if (!this.conn) {
      throw new Error('transaction has committed or rollbacked!');
    }
  }

  async commit() {
    this.checkConn();
    const resolvedConn = await this.conn;
    try {
      return resolvedConn!.commit();
    } finally {
      resolvedConn!.release();
      this.conn = null;
    }
  }

  async rollback() {
    this.checkConn();
    const resolvedConn = await this.conn;
    try {
      return resolvedConn!.rollback();
    } finally {
      resolvedConn!.release();
      this.conn = null;
    }
  }
}
