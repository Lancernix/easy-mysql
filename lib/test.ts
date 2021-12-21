import MySQLClient from './index';
import { Row } from './typing';

const client = new MySQLClient({
  host: '101.42.92.75',
  port: 3306,
  database: 'sql_exam',
  user: 'sqladminuser',
  password: '123sql_ADMIN_user456',
  // dateStrings: true,
});

const test = async () => {
  const res = await client.select({
    table: 'issue',
    column: ['issue_id', 'system', 'directory_id', 'issue_title', 'create_time'],
    where: {
      // eq: {
      //   // directory_id: 'eas4e3g1g4vs',
      //   // create_user_id: '01412009',
      // },
      gt: { create_time: new Date('2021-11-15 17:40:35') },
      // ne: {},
      // bw: { create_time: [new Date('2021-11-15 17:30:01'), new Date('2021-11-15 17:45:01')] },
      // in: { issue_id: [50, 55] },
      or: [{ eq: { directory_id: 'goik7yndy3p9' } }, { eq: { directory_id: 'eas4e3g1g4vs' } }],
    },
    order: { issue_id: 'asc', issue_title: 'desc' },
    limit: 10,
  });
  console.log(res);
};

const test1 = async () => {
  const res = await client.delete({
    table: 'issue',
    // where: {
    //   eq: { issue_id: 50 },
    // },
  });
  // console.log(res.sql);
  // console.log(res.optionValues);
};

// test();
test1();
