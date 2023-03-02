import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import userModel from '../database/models/UserModel';
import ILogin from '../interfaces/Ilogin';
import generateToken from '../ultils/jwtToken';

class UserService {
  private model: ModelStatic<userModel> = userModel;

  async verifyLogin(body: ILogin): Promise<string> {
    const findUser = await this.model.findOne({ where: { email: body.email } });

    if (!findUser?.email || findUser.password.length < 6) {
      return 'Invalid email or password';
    }

    const checkPassword = bcrypt.compareSync(body.password, findUser.password);

    if (!checkPassword) {
      return 'Invalid email or password';
    }

    const { id, email, role, username } = findUser;

    const token = generateToken({ id, email, role, username });

    return token;
  }
}

export default UserService;
