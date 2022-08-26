import * as express from 'express';
import LoginController from './controllers/login.controller';
import errorMiddleware from './errors/error';
import LoginMiddleware from './middlewares/login.middleware';
import LoginService from './services/login.service';
import 'express-async-errors';
import TeamController from './controllers/team.controller';
import TeamService from './services/team.service';
import MatchController from './controllers/matches.controller';
import MatchService from './services/matches.service';

class App {
  public app: express.Express;
  private _loginController = new LoginController(new LoginService());
  private _loginMiddleware = new LoginMiddleware();
  private _teamController = new TeamController(new TeamService());
  private _matchController = new MatchController(new MatchService());

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post(
      '/login',
      this._loginMiddleware.requestValidation,
      this._loginMiddleware.loginApprovalValidation,
      this._loginController.login,
    );
    this.app.get(
      '/login/validate',
      this._loginController.getProfile,
    );
    this.app.get('/teams', this._teamController.getAllTeams);
    this.app.get('/teams/:id', this._teamController.getTeamsById);
    this.app.get('/matches', this._matchController.getAllMatches);
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
