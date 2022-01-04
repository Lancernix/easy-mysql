import Client from './client';
import { escape } from 'mysql2';

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

export default {
  Client,
  escape,
};
