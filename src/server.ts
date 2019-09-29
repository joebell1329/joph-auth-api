import { createServer, plugins, Server } from 'restify';
import { singleton } from 'tsyringe';
import jsonBodyParser = plugins.jsonBodyParser;

@singleton()
export class JAuthServer {

  _server: Server;

  constructor() {
    this._server = createServer();
    this._server.use(jsonBodyParser());
  }

  public start() {
    this._server.listen(8000, () => {
      console.log('Server listening on port 8000');
    });
  }

}
