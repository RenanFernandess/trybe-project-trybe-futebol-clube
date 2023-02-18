import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch } from '../interfaces';

export default class MatchModel {
  public create = (match: Omit<IMatch, 'id'>) => Match.create(match);

  public update = (
    fields: Partial<IMatch>,
    where: Partial<IMatch>,
  ) => Match.update(fields, { where });

  public findAll = (where: Partial<IMatch> = {}) => Match.findAll({
    include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ],
    where,
  });

  public findById = (id: string) => Match.findByPk(id, {
    include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });
}
