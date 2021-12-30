import Client from './client';
import { literal, escape } from './util';

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

export default {
  Client,
  literal,
  escape,
};
