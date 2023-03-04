import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateLogin from '../middleware/validateLogin';
import validateToken from '../middleware/validateToken';

const router = Router();
const loginController = new LoginController();

router.post('/', validateLogin, (req: Request, res: Response) => loginController.login(req, res));
router.get(
  '/role',
  validateToken,
  (_req: Request, res: Response) => res.status(200).json({ role: res.locals.user.role }),
);

export default router;
