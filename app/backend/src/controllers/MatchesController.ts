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

  async updateStatus(req: Request, res: Response) {
    const { id } = req.params;

    const { status, message } = await this._service.updatefinishedStatus(Number(id));

    return res.status(status).json({ message });
  }

  async updateMatchesGoals(req: Request, res: Response) {
    const { id } = req.params;

    const { status, message } = await this._service.updateMatchesGoals(Number(id), req.body);

    return res.status(status).json({ message });
  }

  async createMatches(req: Request, res: Response) {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const { status, message } = await this._service.createMatches(req.body);

    if (status === 404) {
      return res.status(status).json({ message });
    }

    return res.status(status).json(message);
  }
}

export default MatchesController;
