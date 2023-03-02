import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateLogin from '../middleware/validateLogin';

const router = Router();
const loginController = new LoginController();

router.post('/', validateLogin, (req: Request, res: Response) => loginController.login(req, res));

export default router;
