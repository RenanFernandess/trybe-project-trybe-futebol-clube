import { TTeams } from '../types';
import Team from '../database/models/Team';

export default class TeamService {
  public getAll = (): Promise<TTeams[]> => Team.findAll();

  public findById = (id: number | string): Promise<TTeams | null> => Team.findByPk(id);
}
