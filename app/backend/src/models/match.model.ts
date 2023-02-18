import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch } from '../interfaces';

export default class MatchModel {
  public findAll = (where?: Partial<IMatch>) => Match.findAll({
    include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ],
    where,
  });
}
