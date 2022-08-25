import { compare } from 'bcryptjs';
import { RequestHandler } from 'express';
import Users from '../database/models/Users';

export default class LoginMiddleware {
  public requestValidation:RequestHandler = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  };

  public loginApprovalValidation:RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await Users.findOne({
      raw: true,
      where: { email },
    }) || { password: '' };

    const comparePasswords = await compare(password, user.password);

    if (comparePasswords === false) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    next();
  };
}
