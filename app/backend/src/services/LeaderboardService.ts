import Model from '../database/models';
import ILeaderboard from '../interfaces/ILeaderboard';

const queryHomeTeams = `SELECT 
t1.team_name AS name, 
(SUM(CASE WHEN t2.home_team_goals > t2.away_team_goals THEN 3 ELSE 0 END) 
+ SUM(CASE WHEN t2.home_team_goals = t2.away_team_goals THEN 1 ELSE 0 END)) AS totalPoints, 
(SUM(CASE WHEN t2.away_team_id = t1.id THEN 1 ELSE 0 END)) AS totalGames,
(SUM(CASE WHEN t2.home_team_goals > t2.away_team_goals THEN 1 ELSE 0 END)) AS totalVictories,
(SUM(CASE WHEN t2.home_team_goals = t2.away_team_goals THEN 1 ELSE 0 END)) AS totalDraws,
(SUM(CASE WHEN t2.home_team_goals < t2.away_team_goals THEN 1 ELSE 0 END)) AS totalLosses,
(SUM(t2.away_team_goals)) AS goalsFavor,
(SUM(t2.home_team_goals)) AS goalsOwn
FROM 
TRYBE_FUTEBOL_CLUBE.teams AS t1
INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS t2 ON t1.id = t2.away_team_id
WHERE 
t2.in_progress = 0
GROUP BY 
name
ORDER BY 
totalPoints DESC, 
totalVictories DESC, 
goalsFavor DESC, 
goalsOwn DESC;`;

class LeaderboardService {
  protected model = Model;

  async leaderboardHome(): Promise<ILeaderboard[]> {
    const [result] = await this.model.query(queryHomeTeams) as ILeaderboard[];
    console.log('teste service result leaderboard: ', result);

    return result as unknown as ILeaderboard[];
  }
}

export default LeaderboardService;
