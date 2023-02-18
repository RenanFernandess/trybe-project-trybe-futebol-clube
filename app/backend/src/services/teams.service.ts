import { TeamModel } from '../models';
import HttpError from '../errors';
import { TEAM_NOT_FOUND } from '../errors/messages';
import { ITeam } from '../interfaces';

export default class TeamService {
  constructor(private _model: TeamModel) {}

  public getAll = (): Promise<ITeam[]> => this._model.findAll();

  public findById = async (id: string): Promise<ITeam | null> => {
    const team = await this._model.findById(id);
    if (!team) throw new HttpError(404, TEAM_NOT_FOUND);
    return team.dataValues;
  };
}
