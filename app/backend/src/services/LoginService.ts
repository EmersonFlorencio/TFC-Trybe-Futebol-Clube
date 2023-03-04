import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import userModel from '../database/models/UserModel';
import ILogin from '../interfaces/Ilogin';
import generateToken from '../ultils/jwtToken';
import IResponse from '../interfaces/IResponse';

class UserService {
  private model: ModelStatic<userModel> = userModel;
  private _emailRegex: RegExp;

  constructor() {
    this._emailRegex = /\S+@\S+\.\S+/;
  }

  async verifyLogin(body: ILogin): Promise<IResponse> {
    const verifyEmail = this._emailRegex.test(body.email);
    const findUser = await this.model.findOne({ where: { email: body.email } });

    if (findUser?.email === undefined || !verifyEmail) {
      return { status: 401, message: 'Invalid email or password' };
    }

    const checkPassword = bcrypt.compareSync(body.password, findUser.password);

    if (body.password.length < 6 || !checkPassword) {
      return { status: 401, message: 'Invalid email or password' };
    }

    const { id, email, role, username } = findUser;

    const token = generateToken({ id, email, role, username });

    return { status: 200, message: token };
  }
}

export default UserService;
