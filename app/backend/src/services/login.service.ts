import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import Users from '../database/models/Users';
import UnauthorizedError from '../errors/unauthorized.error';

dotenv.config();
class LoginService {
  public login = async (email: string, _password: string) => {
    const user = await Users.findOne({
      raw: true,
      where: { email },
    }) || { password: '' };

    const { password: userPassword, ...userWithoutPassword } = user;

    const generateToken = (
      jwt.sign(
        userWithoutPassword,
        process.env.JWT_SECRET as string,
        {
          expiresIn: '7d',
          algorithm: 'HS256',
        },
      )
    );

    return generateToken;
  };

  public verifyToken = async (token: string) => {
    const verifyUserToken = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!token) throw new UnauthorizedError('Invalid token');

    const { email } = verifyUserToken as jwt.JwtPayload;

    const findUser = await Users.findOne({
      raw: true,
      where: { email },
    }) as Users;

    return findUser.role;
  };
}

export default LoginService;
