import { ConnectionOptions, Pool } from 'mysql2';
import { IQueryParams } from './typing';
declare class MySQLClient {
    pool: Pool;
    constructor(config: ConnectionOptions);
    _query(sql: string, values: any | any[] | {
        [param: string]: any;
    }): Promise<[import("mysql2/typings/mysql/lib/protocol/packets/OkPacket") | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader") | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket")[], import("mysql2/typings/mysql/lib/protocol/packets/FieldPacket")[]]>;
    select(params: IQueryParams): Promise<import("mysql2/typings/mysql/lib/protocol/packets/OkPacket") | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader") | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket")[]>;
}
export default MySQLClient;
