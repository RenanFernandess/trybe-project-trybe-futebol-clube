const matchesMock = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamId": 9,
    "homeTeamGoals": 1,
    "awayTeamId": 14,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Internacional"
    },
    "awayTeam": {
      "teamName": "Santos"
    }
  },
];

export default matchesMock;

export const matchMock = {
  dataValues: {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  get "id"() { return this.dataValues.id },
  get "homeTeamId"() { return this.dataValues.homeTeamId },
  get "homeTeamGoals"() { return this.dataValues.homeTeamGoals },
  get "awayTeamId"() { return this.dataValues.awayTeamId },
  get "awayTeamGoals"() { return this.dataValues.awayTeamGoals },
  get "inProgress"() { return this.dataValues.inProgress },
  get "homeTeam"() { return this.dataValues.homeTeam },
  get "awayTeam"() { return this.dataValues.awayTeam },
};

export const matchPost = {
  "homeTeamId": 16,
  "homeTeamGoals": 1,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
};

export const postEqualTeams = {
  "homeTeamId": 16,
  "homeTeamGoals": 1,
  "awayTeamId": 16,
  "awayTeamGoals": 1,
};
