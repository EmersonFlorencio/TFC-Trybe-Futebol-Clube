import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const router = Router();
const matchesController = new MatchesController();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

export default router;
