import { DataTypes, Model } from 'sequelize';
import db from '.';
import Metche from './Metche';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    underscored: true,
    timestamps: false,
    tableName: 'teams',
  },
);

Team.hasMany(Metche, { foreignKey: 'homeTeamId', as: 'homeTeamId' });
Team.hasMany(Metche, { foreignKey: 'awayTeamId', as: 'awayTeamId' });

Metche.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeamId' });
Metche.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeamId' });

export default Team;
