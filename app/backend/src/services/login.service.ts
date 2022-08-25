import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import Users from '../database/models/Users';

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
    const verifyUser = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    return Users.findOne({ where: { email: verifyUser.email } });
  };
}

export default LoginService;
