import { Request, Response } from 'express';
import UserService from '../services/LoginService';

class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  async login(req: Request, res: Response) {
    const { status, message } = await this.service.verifyLogin(req.body);

    console.log('teste controller', message);

    if (status === 401) {
      return res.status(status).json({ message });
    }

    return res.status(status).json({ token: message });
  }
}

export default UserController;
