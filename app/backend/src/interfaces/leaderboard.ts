export interface ILeaderboardInit {
  goalsFavor: number,
  goalsOwn: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
}

export default interface ILeaderboard extends ILeaderboardInit {
  name: string,
  totalPoints: number,
  goalsBalance: number,
  totalGames: number,
  efficiency: string,
}
