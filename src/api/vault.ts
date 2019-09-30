import { singleton } from 'tsyringe';
import { JAuthServer } from '../server';
import { JAuthDb } from '../db';
import { Next, Request, Response } from 'restify';

@singleton()
export class VaultController {

  private baseUrl = '/vault';

  constructor(private jauthServer: JAuthServer, private jauthDb: JAuthDb) { }

  public register() {
    this.jauthServer._server.get(`${this.baseUrl}`, (req, res, next) => this.getVaultForUser(req, res, next));
    this.jauthServer._server.post(`${this.baseUrl}`, (req, res, next) => this.createVault(req, res, next));
    this.jauthServer._server.put(`${this.baseUrl}`, (req, res, next) => this.updateVault(req, res, next));
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

  private getVaultForUser(req: Request, res: Response, next: Next) {
    const vaultCollection = this.jauthDb._db.collection('vaults');
    vaultCollection.findOne({ email: req.query.email }, (err, result) => {
      if (err) {
        res.status(500);
        res.send();
      }
      res.send(result);
    });
  }

  private updateVault(req: Request, res: Response, next: Next) {
    const vaultCollection = this.jauthDb._db.collection('vaults');
    vaultCollection.findOneAndReplace({ email: req.body.email }, req.body, (err, result) => {
      if (err) {
        res.status(500);
        res.send();
      }
      res.send(result);
    });
  }

}
