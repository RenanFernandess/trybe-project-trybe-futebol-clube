import { MatchModel, TeamModel } from '../models';
import HttpError from '../errors';
import EQUAL_TEAMS, {
  MATCH_NOT_FOUND,
  NOT_UPDATED,
  TEAM_NOT_FOUND,
} from '../errors/messages';
import { IMatchTeams, IMatch, IScore } from '../interfaces';
import Match from '../database/models/Match';

export default class MatchService {
  constructor(
    private _model: MatchModel,
    private _teamModel: TeamModel,
  ) {}

  private _checkTeamExists = async (id: string | number): Promise<void> => {
    if (!await this._teamModel.findById(id)) throw new HttpError(404, TEAM_NOT_FOUND);
  };

  public getAll = (inProgress: boolean | undefined): Promise<Match[]> => this._model.findAll(
    (typeof inProgress === 'boolean') ? { inProgress } : {},
  );

  public findById = async (id: string): Promise<IMatchTeams> => {
    const matches = await this._model.findById(id);
    if (!matches) throw new HttpError(404, MATCH_NOT_FOUND);
    return matches.dataValues;
  };

  public create = async (
    {
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
    }: Omit<IMatchTeams, 'id' | 'inProgress'>,
  ): Promise<IMatch> => {
    if (homeTeamId === awayTeamId) throw new HttpError(422, EQUAL_TEAMS);
    await this._checkTeamExists(homeTeamId);
    await this._checkTeamExists(awayTeamId);
    const match = await this._model.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });
    return match.dataValues;
  };

  public finish = async (id: string | number): Promise<string> => {
    const [result] = await this._model.update({ inProgress: false }, { id: Number(id) });
    if (!result) throw new HttpError(404, NOT_UPDATED);
    return 'finished';
  };

  public updateScore = async (id: string, { homeTeamGoals, awayTeamGoals }: IScore) => {
    const [result] = await this._model.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { id: Number(id) });
    if (!result) throw new HttpError(404, NOT_UPDATED);
  };
}
