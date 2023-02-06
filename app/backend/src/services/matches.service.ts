import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { TMatchesAdd, TMatchesdb, TMatchesTeam, TScore } from '../types';
import HttpError from '../errors';
import EQUAL_TEAMS, {
  MATCH_NOT_FOUND,
  NOT_UPDATED,
  TEAM_NOT_FOUND,
} from '../errors/messages';

export default class MatchService {
  public getAll = (inProgress: boolean | undefined): Promise<Match[]> => Match.findAll({
    include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ],
    where: (typeof inProgress === 'boolean') ? { inProgress } : {},
  });

  public findById = async (id: number | string): Promise<TMatchesTeam> => {
    const matches = await Match.findByPk(id, {
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (!matches) throw new HttpError(404, MATCH_NOT_FOUND);
    return matches.dataValues;
  };

  public create = async (
    { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals }: TMatchesAdd,
  ): Promise<TMatchesdb> => {
    if (homeTeamId === awayTeamId) throw new HttpError(422, EQUAL_TEAMS);
    await this._checkTeamExists(homeTeamId);
    await this._checkTeamExists(awayTeamId);
    const match = await Match.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });
    return match.dataValues;
  };

  private _checkTeamExists = async (id: number | string): Promise<void> => {
    if (!await Team.findByPk(id)) throw new HttpError(404, TEAM_NOT_FOUND);
  };

  public finish = async (id: string | number): Promise<string> => {
    const [result] = await Match.update({ inProgress: false }, { where: { id } });
    if (!result) throw new HttpError(404, NOT_UPDATED);
    return 'finished';
  };

  public updateScore = async (id: string, { homeTeamGoals, awayTeamGoals }: TScore) => {
    await Match.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { where: { id } });
  };
}
