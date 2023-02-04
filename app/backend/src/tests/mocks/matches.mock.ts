const matchesMock = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "id": 16,
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "id": 8,
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
      "id": 9,
      "teamName": "Internacional"
    },
    "awayTeam": {
      "id": 14,
      "teamName": "Santos"
    }
  },
];

export default matchesMock;

export const matchMock = {
  dataVaules: {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "id": 16,
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "id": 8,
      "teamName": "Grêmio"
    }
  },
  get "id"() { return this.dataVaules.id },
  get "homeTeamId"() { return this.dataVaules.homeTeamId },
  get "homeTeamGoals"() { return this.dataVaules.homeTeamGoals },
  get "awayTeamId"() { return this.dataVaules.awayTeamId },
  get "awayTeamGoals"() { return this.dataVaules.awayTeamGoals },
  get "inProgress"() { return this.dataVaules.inProgress },
  get "homeTeam"() { return this.dataVaules.homeTeam },
  get "awayTeam"() { return this.dataVaules.awayTeam },
};
