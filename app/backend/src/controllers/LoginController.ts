import { Request, Response } from 'express';
import UserService from '../services/LoginService';

class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  async login(req: Request, res: Response) {
    const response = await this.service.verifyLogin(req.body);

    if (response.includes('Invalid')) {
      return res.status(400).json({ message: response });
    }

    return res.status(200).json({ token: response });
  }
}

export default UserController;
