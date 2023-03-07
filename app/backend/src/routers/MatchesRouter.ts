import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import validateToken from '../middleware/validateToken';

const router = Router();
const matchesController = new MatchesController();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  validateToken,
  (req: Request, res: Response) => matchesController.updateStatus(req, res),
);
router.patch(
  '/:id',
  validateToken,
  (req: Request, res: Response) => matchesController.updateMatchesGoals(req, res),
);
router.post(
  '/',
  validateToken,
  (req: Request, res: Response) => matchesController.createMatches(req, res),
);

export default router;
