import { Tkey } from '../types';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { ILeaderboard, ILeaderboardInit, IScoreWithId, ITeamMatches } from '../interfaces';

export default class LeaderboardService {
  private _initial: ILeaderboardInit = {
    goalsFavor: 0,
    goalsOwn: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
  };

  public findAll = async (path: string) => {
    const options = { model: Match, where: { inProgress: false }, as: 'homeTeam' };
    const matchs = await Team.findAll({
      attributes: { exclude: ['id'] },
      include: [
        { ...options, attributes: ['homeTeamGoals', 'awayTeamGoals', 'homeTeamId'] },
        { ...options, as: 'awayTeam', attributes: ['homeTeamGoals', 'awayTeamGoals'] },
      ] }) as unknown as ITeamMatches[];
    return matchs.map(this._generate(path.slice(1) as Tkey)).sort(this._sort);
  };

  private _generate = (key: Tkey) => (team: ITeamMatches): ILeaderboard => {
    const { teamName, homeTeam, awayTeam } = team;
    const matchs = (key) ? ({ home: homeTeam, away: awayTeam })[key] : [...homeTeam, ...awayTeam];
    return {
      name: teamName,
      ...matchs.reduce(this._calculate, { ...this._initial }),
      totalGames: matchs.length,
      get totalPoints() { return (this.totalVictories * 3) + this.totalDraws; },
      get goalsBalance() { return this.goalsFavor - this.goalsOwn; },
      get efficiency() { return ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2); } };
  };

  private _calculate = (acc: ILeaderboardInit, cur: IScoreWithId): ILeaderboardInit => {
    const { totalVictories, totalDraws, totalLosses } = acc;
    const { awayTeamGoals, homeTeamGoals, homeTeamId } = cur;
    const [one, two] = homeTeamId ? [homeTeamGoals, awayTeamGoals] : [awayTeamGoals, homeTeamGoals];
    acc.goalsFavor += one;
    acc.goalsOwn += two;
    acc.totalVictories = (one > two) ? (totalVictories + 1) : totalVictories;
    acc.totalDraws = (one === two) ? (totalDraws + 1) : totalDraws;
    acc.totalLosses = (one < two) ? (totalLosses + 1) : totalLosses;
    return acc;
  };

  private _sort = (a: ILeaderboard, b: ILeaderboard) => (
    b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
}
