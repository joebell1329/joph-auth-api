import { JAuthServer } from '../server';
import { JAuthDb } from '../db';
import { singleton } from 'tsyringe';
import { Next, Request, Response } from 'restify';

@singleton()
export class HomeController {

  constructor(private jauthServer: JAuthServer) {}

  public register() {
    this.jauthServer._server.get('/', (req, res, next) => this.getRoot(req, res, next));
  }

  private getRoot(req: Request, res: Response, next: Next) {
    res.send('Hello');
  }

}
