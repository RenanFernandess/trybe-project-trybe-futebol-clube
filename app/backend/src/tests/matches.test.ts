import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/Match';
import matchesMock from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota "/matches"', () => {
  describe('Testa a rota GET "/matches"', () => {
    it('Verifica se as matches são retornadas', async () => {
      sinon.stub(Match, 'findAll').resolves(matchesMock as unknown as Match[]);
      const res: Response = await chai.request(app).get('/matches').send();

      expect(res.body.length).to.be.equal(2);
      expect(res.body).to.be.deep.equal(matchesMock);
    });
  });
  describe('Testa a rota GET "/:id"', () => {});
  describe('Testa a rota POST "/"', () => {});
  describe('Testa a rota PATCH "/:id/finish"', () => {});
  describe('Testa a rota PATCH "/:id"', () => {});
});