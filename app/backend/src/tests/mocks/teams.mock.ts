const teamsMock = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
]

export default teamsMock;

export const teamMock = {
  dataValues: {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  get id() { return this.dataValues.id },
  get teamName() { return this.dataValues.teamName },
};

export const teamsWithMatches = [
  {
    "teamName": "São Paulo",
    "homeTeam": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1,
        "homeTeamId": 16
      },
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 0,
        "homeTeamId": 16
      }
    ],
    "awayTeam": [
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 3
      },
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1
      }
    ]
  },
  {
    "teamName": "Internacional",
    "homeTeam": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1,
        "homeTeamId": 9
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 4,
        "homeTeamId": 9
      },
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1,
        "homeTeamId": 9
      }
    ],
    "awayTeam": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 2
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 1
      }
    ]
  },
  {
    "teamName": "Corinthians",
    "homeTeam": [
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 0,
        "homeTeamId": 4
      },
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1,
        "homeTeamId": 4
      }
    ],
    "awayTeam": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 4
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 1
      }
    ]
  },
  {
    "teamName": "Botafogo",
    "homeTeam": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 0,
        "homeTeamId": 3
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 4,
        "homeTeamId": 3
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 0,
        "homeTeamId": 3
      }
    ],
    "awayTeam": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 0
      },
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      }
    ]
  },
  {
    "teamName": "Flamengo",
    "homeTeam": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1,
        "homeTeamId": 7
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 1,
        "homeTeamId": 7
      }
    ],
    "awayTeam": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 0
      },
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 0
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 1
      }
    ]
  },
  {
    "teamName": "Cruzeiro",
    "homeTeam": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1,
        "homeTeamId": 5
      },
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 2,
        "homeTeamId": 5
      }
    ],
    "awayTeam": [
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 4,
        "awayTeamGoals": 2
      },
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 3
      }
    ]
  },
  {
    "teamName": "Palmeiras",
    "homeTeam": [
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "homeTeamId": 12
      },
      {
        "homeTeamGoals": 4,
        "awayTeamGoals": 2,
        "homeTeamId": 12
      },
      {
        "homeTeamGoals": 4,
        "awayTeamGoals": 1,
        "homeTeamId": 12
      }
    ],
    "awayTeam": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 3
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 4
      }
    ]
  },
  {
    "teamName": "São José-SP",
    "homeTeam": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 1,
        "homeTeamId": 15
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 3,
        "homeTeamId": 15
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 1,
        "homeTeamId": 15
      }
    ],
    "awayTeam": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 2
      }
    ]
  },
  {
    "teamName": "Avaí/Kindermann",
    "homeTeam": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 3,
        "homeTeamId": 1
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 3,
        "homeTeamId": 1
      },
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1,
        "homeTeamId": 1
      }
    ],
    "awayTeam": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 0
      }
    ]
  },
  {
    "teamName": "Bahia",
    "homeTeam": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 2,
        "homeTeamId": 2
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 1,
        "homeTeamId": 2
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 1,
        "homeTeamId": 2
      }
    ],
    "awayTeam": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 0
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      }
    ]
  },
  {
    "teamName": "Real Brasília",
    "homeTeam": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 0,
        "homeTeamId": 13
      },
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 0,
        "homeTeamId": 13
      }
    ],
    "awayTeam": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 1
      }
    ]
  },
  {
    "teamName": "Ferroviária",
    "homeTeam": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 1,
        "homeTeamId": 6
      },
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1,
        "homeTeamId": 6
      }
    ],
    "awayTeam": [
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 0
      }
    ]
  },
  {
    "teamName": "Grêmio",
    "homeTeam": [
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 1,
        "homeTeamId": 8
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 0,
        "homeTeamId": 8
      }
    ],
    "awayTeam": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 3
      },
      {
        "homeTeamGoals": 4,
        "awayTeamGoals": 1
      }
    ]
  },
  {
    "teamName": "Santos",
    "homeTeam": [
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 1,
        "homeTeamId": 14
      },
      {
        "homeTeamGoals": 5,
        "awayTeamGoals": 1,
        "homeTeamId": 14
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 1,
        "homeTeamId": 14
      }
    ],
    "awayTeam": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      }
    ]
  },
  {
    "teamName": "Minas Brasília",
    "homeTeam": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 1,
        "homeTeamId": 10
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "homeTeamId": 10
      },
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 3,
        "homeTeamId": 10
      },
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 0,
        "homeTeamId": 10
      }
    ],
    "awayTeam": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 0
      }
    ]
  },
  {
    "teamName": "Napoli-SC",
    "homeTeam": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 0,
        "homeTeamId": 11
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "homeTeamId": 11
      }
    ],
    "awayTeam": [
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 0
      },
      {
        "homeTeamGoals": 5,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 0
      }
    ]
  }
];
