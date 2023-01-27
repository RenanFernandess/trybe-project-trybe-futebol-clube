import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { TMatchesAdd, TMatchesdb, TMatchesTeam, TScore } from '../types';
import HttpError from '../errors';
import EQUAL_TEAMS, { TEAM_NOT_FOUND } from '../errors/messages';

export default class MatchService {
  public getAll = (inProgress: boolean | undefined): Promise<Match[]> => Match.findAll({
    include: [
      { model: Team, as: 'homeTeam' },
      { model: Team, as: 'awayTeam' },
    ],
    where: (typeof inProgress === 'boolean') ? { inProgress } : {},
  });

  public findById = async (id: number | string): Promise<TMatchesTeam> => {
    const matches = await Match.findByPk(id, {
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    if (!matches) throw new HttpError(404, TEAM_NOT_FOUND);
    return matches.dataValues;
  };

  public create = async (
    { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals }: TMatchesAdd,
  ): Promise<TMatchesdb> => {
    if (homeTeamId === awayTeamId) throw new HttpError(422, EQUAL_TEAMS);
    await this.findById(homeTeamId);
    await this.findById(awayTeamId);
    const match = await Match.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });
    return match.dataValues;
  };

  public finish = async (id: string | number): Promise<string> => {
    await Match.update({ inProgress: false }, { where: { id } });
    return 'finished';
  };

  public updateScore = async (id: string, { homeTeamGoals, awayTeamGoals }: TScore) => {
    await Match.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { where: { id } });
  };
}
