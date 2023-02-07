import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/Team';
import { teamsWithMatches } from './mocks/teams.mock';
import leaderboardHomeMock, { leaderboardAwayMock, leaderboardMock } from './mocks/leaderboard.mock';

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
    it('Verifica se retorna o status 200 e a tabela de classificação dos times em ordem decrescente.', async () => {
      const res: Response = await chai.request(app).get('/leaderboard/home').send();
  
      expect(res.status).to.be.equal(200);
      expect(res.body[0]).to.have.all.keys(keys);
      expect(res.body[0].name).to.be.match(/Santos/i);
      expect(res.body[0]).to.be.deep.equal(leaderboardHomeMock[0]);
      expect(res.body).to.be.deep.equal(leaderboardHomeMock);
    });
  });
  
  describe('Testa a rota GET "leaderboard/away"', () => {
    it('Verifica se retorna o status 200 e a tabela de classificação dos times em ordem decrescente.', async () => {
      const res: Response = await chai.request(app).get('/leaderboard/away').send();
  
      expect(res.status).to.be.equal(200);
      expect(res.body[0]).to.have.all.keys(keys);
      expect(res.body[0].name).to.be.match(/Palmeiras/i);
      expect(res.body[0]).to.be.deep.equal(leaderboardAwayMock[0]);
      expect(res.body).to.be.deep.equal(leaderboardAwayMock);
    });
  });

  describe('Testa a rota GET "leaderboard"', () => {
    it('Verifica se retorna o status 200 e a tabela de classificação geral dos times em ordem decrescente.', async () => {
      const res: Response = await chai.request(app).get('/leaderboard').send();
  
      expect(res.status).to.be.equal(200);
      expect(res.body[0]).to.have.all.keys(keys);
      expect(res.body[0].name).to.be.match(/Palmeiras/i);
      expect(res.body[0]).to.be.deep.equal(leaderboardMock[0]);
      expect(res.body).to.be.deep.equal(leaderboardMock);
    });
  });
});