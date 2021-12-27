/**
 * basic query class, implements the CURD methods
 */
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { CountAndDelParams, InsertParams, SelectParams, UpdateParams } from './typing';
export default class Query {
    /**
     * basic query method, subclass should override this method
     * @param _sql (prepared) sql statement
     * @param _values values corresponding to placeholders
     * @returns sql execute result
     */
    _query(_sql: string, _values?: unknown | unknown[] | {
        [param: string]: unknown;
    }): Promise<[RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]]>;
    /**
     * query method
     * @param sql (prepared) sql statement
     * @param values values corresponding to placeholders
     * @returns sql execute result
     */
    query(sql: string, values?: unknown | unknown[] | {
        [param: string]: unknown;
    }): Promise<[OkPacket | ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | OkPacket[], FieldPacket[]]>;
    /**
     * select method
     * @param params a object including table、column、where、order、limit and offset attributes
     * @returns sql execute result
     */
    select(params: SelectParams): Promise<OkPacket | ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | OkPacket[]>;
    /**
     * select count method
     * @param params a object including table and where attributes
     * @returns row count
     */
    count(params: CountAndDelParams): Promise<number | undefined>;
    /**
     * insert method
     * @param params a object including table and value attributes
     * @returns sql execute result
     */
    insert(params: InsertParams): Promise<OkPacket | ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | OkPacket[]>;
    /**
     * update method
     * @param params a object including table、value and where attributes
     * @returns sql execute result
     */
    update(params: UpdateParams): Promise<OkPacket | ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | OkPacket[]>;
    /**
     * delete method
     * @param params a object including table and where attributes
     * @returns sql execute result
     */
    delete(params: CountAndDelParams): Promise<OkPacket | ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | OkPacket[]>;
}
