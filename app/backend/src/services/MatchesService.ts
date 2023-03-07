import { ModelStatic } from 'sequelize';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import IResponse from '../interfaces/IResponse';
import IUpdateGoals from '../interfaces/IUpdateGoals';

class MatchesService {
  protected model: ModelStatic<MatchesModel> = MatchesModel;
  protected teamModel: ModelStatic<TeamsModel> = TeamsModel;

  async getAllMatches(): Promise<IResponse> {
    const result = await this.model.findAll({ include: [
      { model: TeamsModel, as: 'homeTeam' },
      { model: TeamsModel, as: 'awayTeam' },
    ] });

    return { status: 200, message: result };
  }

  async getInProgress(inProgress: string): Promise<IResponse> {
    const matches = await this.model.findAll({ include: [
      { model: TeamsModel, as: 'homeTeam' },
      { model: TeamsModel, as: 'awayTeam' },
    ] });

    let result;

    if (inProgress.includes('true')) {
      result = matches.filter((match) => match.inProgress === true);
    }

    if (inProgress.includes('false')) {
      result = matches.filter((match) => match.inProgress === false);
    }

    return { status: 200, message: result };
  }

  async updatefinishedStatus(id: number): Promise<IResponse> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { status: 200, message: 'Finished' };
  }

  async updateMatchesGoals(id: number, body: IUpdateGoals): Promise<IResponse> {
    const { homeTeamGoals, awayTeamGoals } = body;

    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return { status: 200, message: 'Match updated successfully!' };
  }
}

export default MatchesService;
