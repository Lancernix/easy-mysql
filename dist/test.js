const MySQLClient = require('./index1').default;
const EOperator = require('./typing').EOperator;

const client = new MySQLClient({
  host: '10.188.36.4',
  port: '8002',
  database: 'faq',
  user: 'tom',
  password: '123456',
});

const test = async () => {
  const res = await client.select({
    table: 'issue',
    columns: ['system', 'status', 'create_user_id'],
    options: [
      [EOperator.eq, 'status', 1],
      [EOperator.like, 'create_user_id', '014%'],
      [EOperator.or, []],
    ],
    limit: 50,
  });
  console.log(res);
};

// test();

let a = {};
console.log(Object.keys(a).length);
