import { createPool, createConnection, ConnectionOptions, Pool } from 'mysql2';

class RDSClient {
  pool: Pool;

  constructor(config: ConnectionOptions) {
    this.pool = createPool(config);
  }
}

export default RDSClient;
