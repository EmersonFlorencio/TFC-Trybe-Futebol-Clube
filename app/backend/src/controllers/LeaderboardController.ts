import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  private _service: LeaderboardService;

  constructor() {
    this._service = new LeaderboardService();
  }

  async leaderboardHome(req: Request, res: Response) {
    const result = await this._service.leaderboardHome();

    return res.status(200).json(result);
  }
}

export default LeaderboardController;
