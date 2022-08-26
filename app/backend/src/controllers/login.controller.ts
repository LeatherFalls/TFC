import { RequestHandler } from 'express';
import LoginService from '../services/login.service';

class LoginController {
  constructor(private loginService: LoginService) { }

  public login:RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const token = await this.loginService.login(email, password);

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  public getProfile:RequestHandler = async (req, res, next) => {
    try {
      const token = req.headers.authorization;

      if (!token) return res.status(401).json({ message: 'Token not found' });

      const role = await this.loginService.verifyToken(token);

      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  };
}

export default LoginController;
