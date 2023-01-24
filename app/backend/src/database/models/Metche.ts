import { DataTypes, Model } from 'sequelize';
import db from '.';

class Matche extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matche.init(
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
    tableName: 'matches',
  },
);

export default Matche;
