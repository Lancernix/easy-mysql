import mysql from './index';

const { Client } = mysql;
const client = new Client({
  host: '101.42.92.75',
  port: 3306,
  database: 'sql_exam',
  user: 'sqladminuser',
  password: '123sql_ADMIN_user456',
  // dateStrings: true,
});

const test = async () => {
  await client.autoTransction(async tran => {
    tran.insert({
      table: 'terms',
      value: {
        term_name: '学期2',
      },
    });
    const res = await tran.count({ table: 'terms' });
    console.log(res);
  });
};

const test1 = async () => {
  const res = await client.query(`SELECT COUNT(*) FROM users WHERE id = ${client.escape('1')}`);
  console.log(res);
};

test();
// test1();
