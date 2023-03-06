import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  private _service: MatchesService;

  constructor() {
    this._service = new MatchesService();
  }

  async getAllMatches(req: Request, res: Response) {
    const matches = await this._service.getAllMatches();
    return res.status(200).json(matches);
  }
}

export default MatchesController;
