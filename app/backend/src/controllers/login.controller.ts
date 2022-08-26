import { RequestHandler } from 'express';
import UnauthorizedError from '../errors/unauthorized.error';
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

  public getProfile:RequestHandler = async (req, res) => {
    const { authorization: token } = req.headers;

    if (!token) throw new UnauthorizedError('Invalid token');

    console.log(token);

    const role = await this.loginService.verifyToken(token);

    return res.status(200).json({ role });
  };
}

export default LoginController;
