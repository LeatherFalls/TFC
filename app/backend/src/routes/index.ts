import TeamService from '../services/team.service';
import TeamsController from '../controllers/team.controller';
import MatchService from '../services/matches.service';
import MatchController from '../controllers/matches.controller';
import MatchMiddleware from '../middlewares/matches.middleware';
import LoginService from '../services/login.service';
import LoginController from '../controllers/login.controller';
import LoginMiddleware from '../middlewares/login.middleware';

const loginService = new LoginService();
const loginController = new LoginController(loginService);
const loginMiddleware = new LoginMiddleware();

const teamsService = new TeamService();
const teamsController = new TeamsController(teamsService);

const matchService = new MatchService();
const matchController = new MatchController(matchService);
const matchMiddleware = new MatchMiddleware(teamsService);

export {
  loginService,
  loginController,
  loginMiddleware,
  teamsController,
  matchController,
  matchMiddleware,
};
