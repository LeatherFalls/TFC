import * as express from 'express';
import LoginController from './controllers/login.controller';
import errorMiddleware from './errors/error';
import LoginMiddleware from './middlewares/login.middleware';
import LoginService from './services/login.service';
import 'express-async-errors';

class App {
  public app: express.Express;
  private _loginController = new LoginController(new LoginService());
  private _loginMiddleware = new LoginMiddleware();

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post(
      '/login',
      this._loginMiddleware.requestValidation,
      /* this._loginMiddleware.loginApprovalValidation, */
      this._loginController.login,
    );
    this.app.get(
      '/login/validate',
      this._loginController.getProfile,
    );
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(errorMiddleware);
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
