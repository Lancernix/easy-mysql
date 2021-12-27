import { Pool, PoolOptions } from 'mysql2';
import Query from './query';
import Transaction from './transaction';
export default class Client extends Query {
    pool: Pool;
    constructor(config: PoolOptions);
    /**
     * basic query method
     * @param sql (prepared) sql statement
     * @param values values corresponding to placeholders
     * @returns sql execute result
     */
    _query(sql: string, values?: unknown | unknown[] | {
        [param: string]: unknown;
    }): Promise<[import("mysql2/typings/mysql/lib/protocol/packets/OkPacket") | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader") | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket")[], import("mysql2/typings/mysql/lib/protocol/packets/FieldPacket")[]]>;
    beginTransaction(): Promise<Transaction>;
    autoTransction(scope: (tran: Transaction) => unknown, ctx?: Record<string, unknown>): Promise<unknown>;
    /**
     * escape value for preventing sql injection
     * @param params input value
     * @returns escaped string value
     */
    escape(params: unknown): string;
}
