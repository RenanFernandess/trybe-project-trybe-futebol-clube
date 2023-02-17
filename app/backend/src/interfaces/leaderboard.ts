export interface ILeaderBoardInit {
  goalsFavor: number,
  goalsOwn: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
}

export default interface ILeaderboard extends ILeaderBoardInit {
  name: string,
  totalPoints: number,
  goalsBalance: number,
  totalGames: number,
  efficiency: string,
}
