import * as express from 'express';
import errorMiddleware from './errors/error';
import 'express-async-errors';
import loginRouter from './routes/login.route';
import teamsRouter from './routes/teams.route';
import matchRouter from './routes/matches.route';
import leaderboardRouter from './routes/leaderboard.route';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();

    this.app.get('/', (req, res) => res.json({ ok: true }));
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

    this.app.use('/login', loginRouter);

    this.app.use('/teams', teamsRouter);

    this.app.use('/matches', matchRouter);

    this.app.use('/leaderboard', leaderboardRouter);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
