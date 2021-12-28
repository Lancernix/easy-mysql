import mysql from './index';

const { Client, literal } = mysql;
const client = new Client({
  host: 'localhost',
  port: 3306,
  database: 'test',
  user: 'local',
  password: '123456',
  // dateStrings: true,
});

const TABLE = 'node_mysql_test';

const test = async () => {
  const result = await client.select({
    table: TABLE,
    column: ['ids', 'name'],
    where: { eq: { name: 'kate' } },
  });
  console.log(result);
};

test();
