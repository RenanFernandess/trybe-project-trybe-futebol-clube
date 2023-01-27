import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { TMatches } from '../types';

export default class MatchService {
  public getAll = (inProgress: boolean | undefined): Promise<Match[]> => Match.findAll({
    include: [
      { model: Team, as: 'homeTeam' },
      { model: Team, as: 'awayTeam' },
    ],
    where: (typeof inProgress === 'boolean') ? { inProgress } : {},
  });

  public findById = async (id: number | string): Promise<TMatches> => {
    const { dataValues } = await Match.findByPk(id, {
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    }) || { dataValues: null };
    return dataValues;
  };
}
