import { TScore } from './matches';

type TTeams = {
  id: number,
  teamName: string,
};

export default TTeams;

export type TTeamsMatches = {
  teamName: string,
  homeTeam: TScore[],
  awayTeam: TScore[],
};
