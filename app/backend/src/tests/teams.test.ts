import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/Team';
import teamsMock, { teamMock } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o Teams', () => {
  describe('Testa a rota GET "/teams"', () => {
    it('Verifica se os times são retornados', async () => {
      sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);
      const res: Response = await chai.request(app).get('/teams').send();

      expect(res.body.length).to.be.equal(2);
      expect(res.body).to.be.deep.equal(teamsMock);
    });
  });
});