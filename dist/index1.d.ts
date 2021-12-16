import { ConnectionOptions, Pool, FieldPacket } from 'mysql2';
import { IQueryParams, ResultRow } from './typing';
declare class MySQLClient {
    pool: Pool;
    constructor(config: ConnectionOptions);
    _query(sql: string, values: any | any[] | {
        [param: string]: any;
    }): Promise<[ResultRow, FieldPacket[]]>;
    select(params: IQueryParams): Promise<ResultRow>;
}
export default MySQLClient;
