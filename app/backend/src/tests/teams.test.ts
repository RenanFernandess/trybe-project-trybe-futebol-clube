import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/Team';
import teamsMock, { teamMock } from './mocks/teams.mock';
import { TEAM_NOT_FOUND } from '../errors/messages';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o Teams', () => {

  afterEach(sinon.restore);

  describe('Testa a rota GET "/teams"', () => {
    it('Verifica se os times são retornados.', async () => {
      sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);
      const res: Response = await chai.request(app).get('/teams').send();

      expect(res.status).to.be.equal(200);
      expect(res.body.length).to.be.equal(2);
      expect(res.body).to.be.deep.equal(teamsMock);
    });
  });

  describe('Testa a rota GET "/teams/:id"', () => {
    it('Verifica se o time é retornado.', async () => {
      sinon.stub(Team, 'findByPk').resolves(teamMock as Team);
      const res: Response = await chai.request(app).get('/teams/:id').send();

      expect(res.status).to.be.equal(200);
      expect(res.body.id).to.be.equal(1);
      expect(res.body).to.be.deep.equal(teamMock.dataValues);
    });

    it(`Verifica se o time não for encontrado retorna o statusCode 404 e a message "${TEAM_NOT_FOUND}".`, async () => {
      sinon.stub(Team, 'findByPk').resolves(null);
      const res: Response = await chai.request(app).get('/teams/:id').send();

      expect(res.status).to.be.equal(404);
      expect(res.body.message).to.be.equal(TEAM_NOT_FOUND);
    });
  });
});