import IScore, { IScoreWithId } from './score';

export default interface ITeam {
  id: number,
  teamName: string,
}

export interface ITeamMatches extends ITeam {
  homeTeam: IScoreWithId[],
  awayTeam: IScore[],
}
