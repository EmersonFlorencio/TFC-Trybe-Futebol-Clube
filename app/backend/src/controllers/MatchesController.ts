import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  private _service: MatchesService;

  constructor() {
    this._service = new MatchesService();
  }

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (!inProgress) {
      const { status, message } = await this._service.getAllMatches();
      return res.status(status).json(message);
    }

    const { status, message } = await this._service.getInProgress(inProgress as string);

    return res.status(status).json(message);
  }

  updateStatus = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { status, message } = await this._service.updatefinishedStatus(Number(id));

    return res.status(status).json({ message });
  };
}

export default MatchesController;
