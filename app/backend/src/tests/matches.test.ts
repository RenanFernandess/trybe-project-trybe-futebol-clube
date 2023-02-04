import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/Match';
import matchesMock, { matchMock } from './mocks/matches.mock';
import { MATCH_NOT_FOUND } from '../errors/messages';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota "/matches"', () => {

  afterEach(sinon.restore);

  describe('Testa a rota GET "/matches"', () => {
    it('Verifica se as partidas são retornadas.', async () => {
      sinon.stub(Match, 'findAll').resolves(matchesMock as unknown as Match[]);
      const res: Response = await chai.request(app).get('/matches').send();

      expect(res.status).to.be.equal(200);
      expect(res.body.length).to.be.equal(2);
      expect(res.body[0]).to.have.all.keys(['id', 'homeTeamId', 'homeTeamGoals', 'awayTeamId', 'awayTeamGoals', 'inProgress', 'homeTeam', 'awayTeam']);
      expect(res.body).to.be.deep.equal(matchesMock);
    });
  });
  describe('Testa a rota GET "/:id"', () => {
    it('Verifica se a partida é retornadas.', async () => {
      sinon.stub(Match, 'findByPk').resolves(matchMock as unknown as Match);
      const res: Response = await chai.request(app).get('/matches/:id').send();

      expect(res.status).to.be.equal(200);
      expect(res.body).to.have.all.keys(['id', 'homeTeamId', 'homeTeamGoals', 'awayTeamId', 'awayTeamGoals', 'inProgress', 'homeTeam', 'awayTeam']);
      expect(res.body.homeTeam).to.have.property('teamName');
      expect(res.body.homeTeam).not.to.have.property('id');
      expect(res.body.awayTeam).to.have.property('teamName');
      expect(res.body.awayTeam).not.to.have.property('id');
    });

    it(`Verifica se a partida não for encontrada retorna o statusCode 404 e a message "${MATCH_NOT_FOUND}".`, async () => {
      sinon.stub(Match, 'findByPk').resolves(null);
      const res: Response = await chai.request(app).get('/matches/:id').send();

      expect(res.status).to.be.equal(404);
      expect(res.body.message).to.be.equal(MATCH_NOT_FOUND);
    });
  });
  describe('Testa a rota POST "/"', () => {});
  describe('Testa a rota PATCH "/:id/finish"', () => {});
  describe('Testa a rota PATCH "/:id"', () => {});
});