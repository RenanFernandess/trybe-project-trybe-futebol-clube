type TTeams = {
  id: number,
  teamName: string,
};

export default TTeams;

export type TScoreWithId = {
  homeTeamId?: number,
  homeTeamGoals: number,
  awayTeamGoals: number
};

export type TTeamsMatches = {
  teamName: string,
  homeTeam: TScoreWithId[],
  awayTeam: TScoreWithId[],
};
