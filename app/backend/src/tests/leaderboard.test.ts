import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/Team';
import { teamsWithMatches } from './mocks/teams.mock';
import leaderboardHomeMock from './mocks/leaderboard.mock';

chai.use(chaiHttp);
const { expect } = chai;

const keys = [
  'name',
  'goalsFavor',
  'goalsOwn',
  'totalVictories',
  'totalDraws',
  'totalLosses',
  'totalGames',
  'totalPoints',
  'goalsBalance',
  'efficiency',
];

describe('Testa o Liaderboard', () => {
  
  afterEach(() => sinon
  .stub(Team, 'findAll')
  .resolves(teamsWithMatches as unknown as Team[]));

  afterEach(sinon.restore);

  describe('Testa a rota GET "leaderboard/home"', () => {
    it('Verifica se retorna o status 200 e a tabela de lideres em ordem decrescente.', async () => {
      const res: Response = await chai.request(app).get('/leaderboard/home').send();
  
      expect(res.status).to.be.equal(200);
      expect(res.body[0]).to.have.all.keys(keys);
      expect(res.body).to.be.deep.equal(leaderboardHomeMock);
    });
  });

});