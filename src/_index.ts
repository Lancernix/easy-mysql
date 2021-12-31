import { OkPacket, RowDataPacket } from 'mysql2';
import mysqlx from './index';

const { Client } = mysqlx;
const client = new Client({
  host: 'localhost',
  port: 3306,
  database: 'test',
  user: 'local',
  password: '123456',
});
const TABLE = 'node_mysql_test';

const test = async () => {
  const res = await client.delete({
    table: TABLE,
    where: {
      eq: { id: 36 },
    },
  });
  console.log(res);
};

test();
