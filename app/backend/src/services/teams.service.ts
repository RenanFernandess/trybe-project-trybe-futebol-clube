import { TTeams } from '../types';
import Team from '../database/models/Team';

export default class TeamService {
  public getAll = (): Promise<TTeams[]> => Team.findAll();

  public findById = async (id: number | string): Promise<TTeams | null> => {
    const team = await Team.findByPk(id);
    return team?.dataValues;
  };
}
