import { createServer, plugins, Server } from 'restify';
import { singleton } from 'tsyringe';
import * as corsMiddleware from 'restify-cors-middleware';

@singleton()
export class JAuthServer {

  _server: Server;
  cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['Authorization'],
    exposeHeaders: ['Authorization']
  });

  constructor() {
    this._server = createServer();
    this._server.use(plugins.jsonBodyParser());
    this._server.use(plugins.queryParser());
    this._server.pre(this.cors.preflight);
    this._server.use(this.cors.actual);
  }

  public start() {
    this._server.listen(8000, () => {
      console.log('Server listening on port 8000');
    });
  }
}
