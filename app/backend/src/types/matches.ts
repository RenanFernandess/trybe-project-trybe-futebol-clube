type TMatchesTeam = {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam: {
    teamName: string,
  },
  awayTeam: {
    teamName: string,
  },
};

export default TMatchesTeam;

export type TMatchesAdd = {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
};

export type TMatches = {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
};

export type TMatchesdb = {
  id: number,
} & TMatches;

export type TScore = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};
