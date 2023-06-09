import IToken from './token';
import ILogin from './login';
import IUser from './user';
import ITeam, { ITeamMatches } from './team';
import IMatch, { IMatchTeams } from './match';
import ILeaderboard, { ILeaderboardInit } from './leaderboard';
import IScore, { IScoreWithId } from './score';

export default IToken;
export {
  ILogin,
  IUser,
  ITeam,
  IMatch,
  ITeamMatches,
  IMatchTeams,
  ILeaderboard,
  ILeaderboardInit,
  IScore,
  IScoreWithId,
};
