import { singleton } from 'tsyringe';
import { JAuthServer } from '../server';
import { JAuthDb } from '../db';
import { Next, Request, Response } from 'restify';
import { ObjectId } from 'mongodb';

@singleton()
export class VaultController {

  private baseUrl = '/vault';

  constructor(private jauthServer: JAuthServer, private jauthDb: JAuthDb) { }

  public register() {
    this.jauthServer._server.post(`${this.baseUrl}`, (req, res, next) => this.createVault(req, res, next));
    this.jauthServer._server.get(`${this.baseUrl}/:id`, (req, res, next) => this.getVaultById(req, res, next));
  }

  private createVault(req: Request, res: Response, next: Next) {
    const vaultCollection = this.jauthDb._db.collection('vaults');
    vaultCollection.insertOne(req.body, (err, result) => {
      if (err) {
        res.status(500);
        res.send();
      }
      res.send(result);
    });
  }

  private getVaultById(req: Request, res: Response, next: Next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const vaultCollection = this.jauthDb._db.collection('vaults');
    vaultCollection.findOne({ _id: new ObjectId(req.params.id) }, (err, result) => {
      if (err) {
        res.status(500);
        res.send();
      }
      res.send(result);
    });
  }

}
