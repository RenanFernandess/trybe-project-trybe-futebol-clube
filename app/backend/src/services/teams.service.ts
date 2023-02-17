import Team from '../database/models/Team';
import HttpError from '../errors';
import { TEAM_NOT_FOUND } from '../errors/messages';
import { ITeam } from '../interfaces';

export default class TeamService {
  public getAll = (): Promise<ITeam[]> => Team.findAll();

  public findById = async (id: number | string): Promise<ITeam | null> => {
    const team = await Team.findByPk(id);
    if (!team) throw new HttpError(404, TEAM_NOT_FOUND);
    return team.dataValues;
  };
}
