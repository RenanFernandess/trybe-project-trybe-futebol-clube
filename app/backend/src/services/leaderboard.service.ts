import { Tkey, TLeaderBoard, TLeaderBoardInit, TScore, TTeamsMatches } from '../types';
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
    const matchs = await Team.findAll({
      attributes: { exclude: ['id'] },
      include: [{
        model: Match,
        as: 'homeTeam',
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
        where: { inProgress: false },
      }, {
        model: Match,
        as: 'awayTeam',
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
        where: { inProgress: false },
      }],
    }) as unknown as TTeamsMatches[];
    return matchs.map(this._generate(path));
  };

  private _generate = (path: string) => (team: TTeamsMatches): TLeaderBoard => {
    const { teamName, homeTeam, awayTeam } = team;
    const key = path.slice(1) as Tkey;
    const matchs = (key) ? ({ home: homeTeam, away: awayTeam })[key] : [...homeTeam, ...awayTeam];
    return {
      name: teamName,
      ...matchs.reduce(this._calculate(key), { ...this._obj }),
      totalGames: matchs.length,
      get totalPoints() { return (this.totalVictories * 3) + this.totalDraws; },
      get goalsBalance() { return this.goalsFavor - this.goalsOwn; },
      get efficiency() { return ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2); },
    };
  };

  private _calculate = (key: Tkey) => (acc: TLeaderBoardInit, cur: TScore): TLeaderBoardInit => {
    const { awayTeamGoals, homeTeamGoals } = cur;
    const { goalsFavor, goalsOwn, totalVictories, totalDraws, totalLosses } = acc;
    const homeTeam = (key === 'home') ? homeTeamGoals : awayTeamGoals;
    const awayTeam = (key === 'home') ? awayTeamGoals : homeTeamGoals;
    return {
      goalsFavor: homeTeam + goalsFavor,
      goalsOwn: awayTeam + goalsOwn,
      totalVictories: (homeTeam > awayTeam) ? (totalVictories + 1) : totalVictories,
      totalDraws: (homeTeam === awayTeam) ? (totalDraws + 1) : totalDraws,
      totalLosses: (homeTeam < awayTeam) ? (totalLosses + 1) : totalLosses,
    };
  };
}
