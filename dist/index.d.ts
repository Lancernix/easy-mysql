import { ConnectionOptions, Pool, Query } from 'mysql2';
declare class MySQLClient {
    pool: Pool;
    constructor(config: ConnectionOptions);
    _query(sql: string, values: any | any[] | {
        [param: string]: any;
    }): Promise<Query>;
    select(params: IQueryParams): Promise<Query>;
}
export default MySQLClient;
