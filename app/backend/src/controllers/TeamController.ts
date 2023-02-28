import { Request, Response } from 'express';
import TeamService from '../services/TeamServices';

class TeamController {
  private service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  async getAll(req: Request, res: Response) {
    const teams = await this.service.getAll();
    res.status(200).json(teams);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.service.getById(Number(id));

    if (!team) {
      return res.status(404).json({ messege: 'Team not Found' });
    }

    return res.status(200).json(team);
  }
}

export default TeamController;
