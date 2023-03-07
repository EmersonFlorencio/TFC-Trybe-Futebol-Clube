import { ModelStatic } from 'sequelize';
import IMatch from '../interfaces/IMatches';
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

  async createMatches(body: IMatch): Promise<IResponse> {
    const { homeTeamId, awayTeamId } = body;

    const verifyHomeTeam = await this.model.findByPk(homeTeamId);
    const verifyAwayTeam = await this.model.findByPk(awayTeamId);

    console.log('teste home time', verifyHomeTeam);
    console.log('teste away time', verifyAwayTeam);

    if (!verifyHomeTeam) {
      return { status: 404, message: 'There is no team with such id!' };
    }

    if (!verifyAwayTeam) {
      return { status: 404, message: 'There is no team with such id!' };
    }

    const result = await this.model.create({ ...body, inProgress: true });

    return { status: 201, message: result };
  }
}

export default MatchesService;
