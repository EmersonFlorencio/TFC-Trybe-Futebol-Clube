import { ModelStatic } from 'sequelize';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

class MatchesService {
  protected model: ModelStatic<MatchesModel> = MatchesModel;
  protected teamModel: ModelStatic<TeamsModel> = TeamsModel;

  async getAllMatches(): Promise<MatchesModel[]> {
    const result = await this.model.findAll({ include: [
      { model: TeamsModel, as: 'homeTeam' },
      { model: TeamsModel, as: 'awayTeam' },
    ] });

    return result;
  }
}

export default MatchesService;
