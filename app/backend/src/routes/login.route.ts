import * as express from 'express';
import LoginService from '../services/login.service';
import LoginController from '../controllers/login.controller';

const loginRouter = express.Router();

const loginService = new LoginService();

const loginController = new LoginController(loginService);

loginRouter.post(
  '/',
  loginController.login,
);

export default loginRouter;
