import { ConnectionOptions, Pool, RowDataPacket } from 'mysql2';
import { SelectParams, CountAndDelParams, InsertParams, UpdateParams } from './typing';
declare class MySQLClient {
    pool: Pool;
    constructor(config: ConnectionOptions);
    _query(sql: string, values: any | any[] | {
        [param: string]: any;
    }): Promise<[import("mysql2/typings/mysql/lib/protocol/packets/OkPacket") | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader") | RowDataPacket[] | RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket")[], import("mysql2/typings/mysql/lib/protocol/packets/FieldPacket")[]]>;
    select(params: SelectParams): Promise<import("mysql2/typings/mysql/lib/protocol/packets/OkPacket") | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader") | RowDataPacket[] | RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket")[] | undefined>;
    count(params: CountAndDelParams): Promise<number | undefined>;
    insert(params: InsertParams): Promise<import("mysql2/typings/mysql/lib/protocol/packets/OkPacket") | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader") | RowDataPacket[] | RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket")[] | undefined>;
    update(params: UpdateParams): Promise<import("mysql2/typings/mysql/lib/protocol/packets/OkPacket") | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader") | RowDataPacket[] | RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket")[] | undefined>;
    delete(params: CountAndDelParams): Promise<import("mysql2/typings/mysql/lib/protocol/packets/OkPacket") | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader") | RowDataPacket[] | RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket")[] | undefined>;
}
export default MySQLClient;
