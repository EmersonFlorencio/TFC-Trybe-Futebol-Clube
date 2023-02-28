import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/TeamsModel';
import ITeams from '../interfaces/Iteams';

class TeamService {
  private model: ModelStatic<TeamsModel> = TeamsModel;

  async getAll(): Promise<ITeams[]> {
    const result = await this.model.findAll();
    return result;
  }

  async getById(id: number): Promise<ITeams | null> {
    const result = await this.model.findByPk(id);
    return result;
  }
}

export default TeamService;
