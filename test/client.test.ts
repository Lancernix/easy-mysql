import { ResultSetHeader } from 'mysql2';
import Client from '../src/client';

const TABLE = 'node_mysql_test';

const client = new Client({
  host: 'localhost',
  port: 3306,
  database: 'test',
  user: 'local',
  password: '123456',
  dateStrings: true,
});

// ****** query test start ******
it('async query without placeholders', async () => {
  const result = await client.query(`SELECT id, name, age FROM ${TABLE} WHERE id = 27;`);
  expect(result).toEqual([{ id: 27, name: 'kate', age: 50 }]);
});

it('simple async query with placeholders', async () => {
  const result = await client.query(`SELECT id, name, age FROM ${TABLE} WHERE id >= ? AND status = ?;`, [50, 0]);
  expect(result).toEqual([
    { id: 54, name: 'harden', age: 44 },
    { id: 57, name: 'harden', age: 26 },
  ]);
});
// ****** query test end ******

// ****** select test start ******
it('simple async select', async () => {
  const result = await client.select({
    table: TABLE,
    column: ['id', 'name', 'age'],
    where: {
      eq: { id: 52 },
    },
  });
  expect(result).toEqual([{ id: 52, name: 'lux', age: 90 }]);
});

it('simple async select with non-existent id', async () => {
  const result = await client.select({
    table: TABLE,
    column: ['id', 'name', 'age'],
    where: {
      eq: { id: 100 },
    },
  });
  expect(result).toEqual([]);
});

it('async select with empty column array', async () => {
  const result = await client.select({
    table: TABLE,
    column: [],
    where: {
      eq: { name: 'lux' },
    },
  });
  expect(result).toEqual([
    {
      id: 52,
      name: 'lux',
      age: 90,
      status: 1,
      created_time: '2021-12-31 17:35:41',
      msg: 'message',
    },
  ]);
});

it('async select without column param', async () => {
  const result = await client.select({
    table: TABLE,
    where: {
      eq: { name: 'lux' },
    },
  });
  expect(result).toEqual([
    {
      id: 52,
      name: 'lux',
      age: 90,
      status: 1,
      created_time: '2021-12-31 17:35:41',
      msg: 'message',
    },
  ]);
});

it('async select without where param', async () => {
  const result = await client.select({
    table: TABLE,
    column: ['id', 'name'],
    limit: 2,
  });
  expect(result).toEqual([
    { id: 23, name: 'tom' },
    { id: 24, name: 'tim' },
  ]);
});

it('async select with limit and offset params', async () => {
  const result = await client.select({
    table: TABLE,
    column: ['id', 'name'],
    where: {
      eq: { status: 1 },
    },
    limit: 3,
    offset: 1,
  });
  expect(result).toEqual([
    { id: 24, name: 'tim' },
    { id: 25, name: 'jerry' },
    { id: 26, name: 'james' },
  ]);
});

it('async select with order params', async () => {
  const result = await client.select({
    table: TABLE,
    column: ['id', 'name'],
    where: {
      eq: { status: 1 },
      le: { id: 26 },
    },
    limit: 3,
    order: { id: 'desc' },
  });
  expect(result).toEqual([
    { id: 26, name: 'james' },
    { id: 25, name: 'jerry' },
    { id: 24, name: 'tim' },
  ]);
});

it('async select with complex where options', async () => {
  const result = await client.select({
    table: TABLE,
    column: ['id', 'name'],
    where: {
      eq: { status: 1, name: 'harden' },
      gt: { age: 33 },
      bw: { id: [50, 56] },
      ni: { id: [53] },
    },
  });
  expect(result).toEqual([{ id: 56, name: 'harden' }]);
});

it('async select with where simple or options', async () => {
  const result = await client.select({
    table: TABLE,
    column: ['id', 'name'],
    where: {
      eq: { status: 1 },
      le: { age: 32 },
      or: [{ eq: { name: 'harden' } }, { eq: { name: 'tim' } }],
    },
    limit: 10,
  });
  expect(result).toEqual([
    { id: 24, name: 'tim' },
    { id: 42, name: 'harden' },
    { id: 55, name: 'harden' },
  ]);
});

it('async select with where complex or options', async () => {
  const result = await client.select({
    table: TABLE,
    column: ['id', 'name'],
    where: {
      or: [{ eq: { name: 'harden', status: 0 }, le: { age: 30 } }, { eq: { name: 'tim' } }],
    },
    limit: 10,
  });
  expect(result).toEqual([
    { id: 24, name: 'tim' },
    { id: 57, name: 'harden' },
  ]);
});
// ****** select test end ******

// ****** insert test start ******
it('async single insert', async () => {
  const result = await client.insert({
    table: TABLE,
    value: {
      name: 'timo',
      age: '9',
      status: 0,
    },
  });
  expect(result.affectedRows).toEqual(1);
});

it('async multi insert', async () => {
  const result = await client.insert({
    table: TABLE,
    value: [
      {
        name: 'yasuo',
        age: '21',
        status: 1,
      },
      {
        name: 'yohn',
        age: '24',
        status: 1,
      },
      {
        name: 'akl',
        age: '26',
        status: 0,
      },
    ],
  });
  expect(result.affectedRows).toEqual(3);
});
// ****** insert test end ******

// ****** update test start ******
it('async update', async () => {
  const result = await client.update({
    table: TABLE,
    value: { msg: 'update timo message' },
    where: {
      eq: { name: 'timo' },
    },
  });
  expect(result.affectedRows).toEqual(1);
});

it('async update without empty value param', async () => {
  try {
    await client.update({
      table: TABLE,
      value: {},
      where: {
        eq: { name: 'timo' },
      },
    });
  } catch (e) {
    expect((e as Error).message).toEqual(`update's value should be a non-empty plain object!`);
  }
});
// ****** update test end ******

// ****** delete test start ******
it('async delete', async () => {
  const result = await client.delete({
    table: TABLE,
    where: {
      eq: { name: 'akl' },
    },
  });
  expect(result.affectedRows).toEqual(1);
});
// ****** delete test end ******

// ****** count test start ******
it('async count', async () => {
  const result = await client.count({
    table: TABLE,
    where: {
      eq: { status: 1 },
    },
  });
  expect(result).toEqual(13);
});
// ****** count test end ******

// ****** transaction test start ******
it('async transaction success', async () => {
  const tran = await client.beginTransaction();
  try {
    const res = await tran.select({
      table: TABLE,
      column: ['id'],
      where: { eq: { name: 'yohn' } },
    });
    expect(res).toEqual([{ id: 60 }]);
    const res1 = await tran.update({
      table: TABLE,
      value: { msg: 'update yohn message wohhhhh' },
      where: { eq: { id: res[0].id } },
    });
    expect(res1.affectedRows).toEqual(1);
    await tran.commit();
  } catch (e) {
    await tran.rollback();
  }
});

it('async transaction error', async () => {
  const tran = await client.beginTransaction();
  try {
    const res = await tran.select({
      table: TABLE,
      column: ['id'],
      where: { eq: { name: 'yohn' } },
    });
    expect(res).toEqual([{ id: 60 }]);
    const res1 = await tran.update({
      table: TABLE,
      value: { msg: 'update yohn message wohhhhh' },
      where: { eq: { ids: res[0].id } },
    });
    expect(res1.affectedRows).toEqual(1);
    await tran.commit();
  } catch (e) {
    await tran.rollback();
    expect((e as Error).message).toEqual(`Unknown column 'ids' in 'where clause'`);
  }
});
// ****** transaction test end ******

// ****** auto transaction test start ******
it('async auto transaction', async () => {
  const result = await client.autoTransaction(async tran => {
    const res = await tran.select({
      table: TABLE,
      column: ['id'],
      where: { eq: { name: 'yohn' } },
    });
    expect(res).toEqual([{ id: 60 }]);
    const res1 = await tran.update({
      table: TABLE,
      value: { msg: 'update yohn message' },
      where: { eq: { id: res[0].id } },
    });
    expect(res1.affectedRows).toEqual(1);
    const result = await tran.insert({
      table: TABLE,
      value: {
        name: 'vn',
        age: 77,
      },
    });
    return result;
  });
  expect((result as ResultSetHeader).affectedRows).toEqual(1);
});

it('async auto transaction error', async () => {
  try {
    const result = await client.autoTransaction(async tran => {
      const res = await tran.select({
        table: TABLE,
        column: ['id'],
        where: { eq: { name: 'yohn' } },
      });
      expect(res).toEqual([{ id: 60 }]);
      const res1 = await tran.update({
        table: TABLE,
        value: { msg: 'update yohn message' },
        where: { eq: { ids: res[0].id } },
      });
      expect(res1.affectedRows).toEqual(1);
      const result = await tran.insert({
        table: TABLE,
        value: {
          name: 'vn',
          age: 77,
        },
      });
      return result;
    });
    expect((result as ResultSetHeader).affectedRows).toEqual(1);
  } catch (e) {
    expect((e as Error).message).toEqual(`Unknown column 'ids' in 'where clause'`);
  }
});
// ****** auto transaction test end ******

it('disconnect', async () => {
  // this test function make no sense, just for us to finish the test successfully
  // note: disconnect must be called at the last！！
  client.pool.end();
});
