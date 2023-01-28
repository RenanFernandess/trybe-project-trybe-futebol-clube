type Tkey = ('home' | 'away' | '');
export default Tkey;

export type TLeaderBoardInit = {
  goalsFavor: number,
  goalsOwn: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
};

export type TLeaderBoard = {
  name: string,
  totalPoints: number,
  goalsFavor: number,
  goalsOwn: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsBalance: number,
  totalGames: number,
  efficiency: string,
};
