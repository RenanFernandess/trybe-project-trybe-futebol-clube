import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { ITeam } from '../interfaces';

export default class TeamModel {
  public findAll = (where?: Partial<ITeam>) => Team.findAll({ where });

  public findById = (id: string | number) => Team.findByPk(id);

  public findTeamWhithMatches = () => {
    const options = { model: Match, where: { inProgress: false }, as: 'homeTeam' };
    return Team.findAll({
      attributes: { exclude: ['id'] },
      include: [
        { ...options, attributes: ['homeTeamGoals', 'awayTeamGoals', 'homeTeamId'] },
        { ...options, as: 'awayTeam', attributes: ['homeTeamGoals', 'awayTeamGoals'] },
      ] });
  };
}
