import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class TeamModel {
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
