import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamsModel from './TeamsModel';

class MatchesModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    homeTeamId: {
      type: INTEGER,
      allowNull: false,
      references: { model: 'teams', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    awayTeamId: {
      type: INTEGER,
      allowNull: false,
      references: { model: 'teams', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    underscored: true,
    timestamps: false,
    tableName: 'matches',
  },
);

MatchesModel.belongsTo(TeamsModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
TeamsModel.hasMany(MatchesModel, { foreignKey: 'homeTeamId', as: 'matchesHome' });

MatchesModel.belongsTo(TeamsModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });
TeamsModel.hasMany(MatchesModel, { foreignKey: 'awayTeamId', as: 'matchesAway' });

export default MatchesModel;
