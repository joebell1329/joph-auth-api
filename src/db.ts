import { connect, Db, MongoClient } from 'mongodb';
import { singleton } from 'tsyringe';

@singleton()
export class JAuthDb {

  _client: MongoClient;
  _db: Db;

  constructor() {
    connect('mongodb://localhost:27017', (err, client) => {
      if (err) {
        console.error(err);
        process.exit(-1);
      }

      console.log('Connected to mongodb server');

      this._client = client;
      this._db = this._client.db('JAuthDb');
    });
  }

}
