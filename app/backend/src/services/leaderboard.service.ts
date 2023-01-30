import { Tkey, TLeaderBoard, TLeaderBoardInit, TScoreWithId, TTeamsMatches } from '../types';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class LeaderboardService {
  private _obj: TLeaderBoardInit;
  constructor() {
    this._obj = {
      goalsFavor: 0,
      goalsOwn: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };
  }

  public findAll = async (path: string) => {
    const options = { model: Match, where: { inProgress: false }, as: 'homeTeam' };
    const matchs = await Team.findAll({
      attributes: { exclude: ['id'] },
      include: [{ ...options, attributes: ['homeTeamGoals', 'awayTeamGoals', 'homeTeamId'] },
        { ...options, as: 'awayTeam', attributes: ['homeTeamGoals', 'awayTeamGoals'] }],
    }) as unknown as TTeamsMatches[];
    return matchs.map(this._generate(path.slice(1) as Tkey)).sort(this._sort);
  };

  private _generate = (key: Tkey) => (team: TTeamsMatches): TLeaderBoard => {
    const { teamName, homeTeam, awayTeam } = team;
    const matchs = (key) ? ({ home: homeTeam, away: awayTeam })[key] : [...homeTeam, ...awayTeam];
    return {
      name: teamName,
      ...matchs.reduce(this._calculate, { ...this._obj }),
      totalGames: matchs.length,
      get totalPoints() { return (this.totalVictories * 3) + this.totalDraws; },
      get goalsBalance() { return this.goalsFavor - this.goalsOwn; },
      get efficiency() { return ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2); },
    };
  };

  private _calculate = (acc: TLeaderBoardInit, cur: TScoreWithId): TLeaderBoardInit => {
    const { goalsFavor, goalsOwn, totalVictories, totalDraws, totalLosses } = acc;
    const { awayTeamGoals, homeTeamGoals, homeTeamId } = cur;
    const [one, two] = homeTeamId ? [homeTeamGoals, awayTeamGoals] : [awayTeamGoals, homeTeamGoals];
    return {
      goalsFavor: one + goalsFavor,
      goalsOwn: two + goalsOwn,
      totalVictories: (one > two) ? (totalVictories + 1) : totalVictories,
      totalDraws: (one === two) ? (totalDraws + 1) : totalDraws,
      totalLosses: (one < two) ? (totalLosses + 1) : totalLosses,
    };
  };

  private _sort = (a: TLeaderBoard, b: TLeaderBoard) => (
    b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
}
