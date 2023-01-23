import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './Team';

class Metche extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Metche.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    homeTeamId: DataTypes.INTEGER,
    homeTeamGoals: DataTypes.INTEGER,
    awayTeamId: DataTypes.INTEGER,
    awayTeamGoals: DataTypes.INTEGER,
    inProgress: DataTypes.BOOLEAN,
  },
  {
    sequelize: db,
    underscored: true,
    timestamps: false,
    tableName: 'metches',
  },
);

Metche.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeamId' });
Metche.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeamId' });

Team.hasMany(Metche, { foreignKey: 'homeTeamId', as: 'homeTeamId' });
Team.hasMany(Metche, { foreignKey: 'awayTeamId', as: 'awayTeamId' });

export default Metche;
