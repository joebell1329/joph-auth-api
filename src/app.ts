import 'reflect-metadata';
import { JAuthServer } from './server';
import { container, singleton } from 'tsyringe';
import { HomeController } from './api/home';
import { VaultController } from './api/vault';

@singleton()
export class App {

  constructor(
    public jauthServer: JAuthServer,
    private homeController: HomeController,
    private vaultController: VaultController
  ) { }

  public registerRoutes() {
    this.homeController.register();
    this.vaultController.register();

  }

  public startApp() {
    this.jauthServer.start();
  }

}

const app = container.resolve(App);
app.registerRoutes();
app.startApp();
