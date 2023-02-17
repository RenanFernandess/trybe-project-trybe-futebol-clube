export default interface IScore {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IScoreWithId extends IScore {
  homeTeamId?: number,
}
