import Client from '../../src/client';

jest.mock('../../src/client');

it('We can check if the consumer called the class constructor', () => {
  const client = new Client({
    host: 'localhost',
    port: 3306,
    database: 'test',
    user: 'local',
    password: '123456',
  });
  expect(Client).toHaveBeenCalledTimes(1);
});
