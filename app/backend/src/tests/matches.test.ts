import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/Match';
import matchesMock, { matchCreatedMock, matchMock, matchPost, postEqualTeams } from './mocks/matches.mock';
import userMock from './mocks/user.mock';
import EQUAL_TEAMS, { MATCH_NOT_FOUND, TEAM_NOT_FOUND, TOKEN_INVALID } from '../errors/messages';
import { login } from './mocks/user.mock';
import User from '../database/models/User';
import Team from '../database/models/Team';
import { teamMock } from './mocks/teams.mock';

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

    it(`Verifica se a partida não for encontrada retorna o status 404 e a message "${MATCH_NOT_FOUND}".`, async () => {
      sinon.stub(Match, 'findByPk').resolves(null);
      const res: Response = await chai.request(app).get('/matches/:id').send();

      expect(res.status).to.be.equal(404);
      expect(res.body.message).to.be.equal(MATCH_NOT_FOUND);
    });
  });

  describe('Testa a rota POST "/"', () => {
    let response: Promise<Response>;

    beforeEach(() => {
      sinon.stub(User, 'findByPk').resolves(userMock as User);
      response = chai.request(app).post('/login').send(login);
    });

    it(`Verifica se retorna o status 401 e a message "${TOKEN_INVALID}", caso o token seja invalido.`, async () => {
      const res: Response = await chai
        .request(app)
        .post('/matches')
        .send(postEqualTeams)
        .set({ authorization: 'invalidToken' });

      expect(res.status).to.be.equal(401);
      expect(res.body.message).to.be.equal(TOKEN_INVALID);
    });

    it(`Verifica se retorna o status 422 e a message "${EQUAL_TEAMS}", caso id do time da casa se iqual do time visitante.`, async () => {
      const { body: { token } } = await response;
      const res: Response = await chai
        .request(app)
        .post('/matches')
        .send(postEqualTeams)
        .set({ authorization: token });

      expect(res.status).to.be.equal(422);
      expect(res.body.message).to.be.equal(EQUAL_TEAMS);
    });

    it(`Verifica se retorna o status 404 e a message "${TEAM_NOT_FOUND}", caso id dos times não existão no banco de dados.`, async () => {
      const { body: { token } } = await response;
      sinon.stub(Team, 'findByPk').resolves(null);
      const res: Response = await chai
        .request(app)
        .post('/matches')
        .send(matchPost)
        .set({ authorization: token });

      expect(res.status).to.be.equal(404);
      expect(res.body.message).to.be.equal(TEAM_NOT_FOUND);
    });

    it('Verifica sé ao inserir uma partida com sucesso é retornado o status 201 e os dados da partida.', async () => {
      const { body: { token } } = await response;
      sinon.stub(Team, 'findByPk').resolves(teamMock as Team);
      sinon.stub(Match, 'create').resolves(matchCreatedMock as Match);
      const res: Response = await chai
        .request(app)
        .post('/matches')
        .send(matchPost)
        .set({ authorization: token });

      expect(res.status).to.be.equal(201);
      expect(res.body).to.have.all.keys(['id', 'homeTeamId', 'homeTeamGoals', 'awayTeamId', 'awayTeamGoals', 'inProgress']);
      expect(res.body.inProgress).to.be.equal(true);
      expect(res.body).to.be.deep.equal(matchCreatedMock.dataValues);
    });

  });

  describe('Testa a rota PATCH "/:id/finish"', () => {});

  describe('Testa a rota PATCH "/:id"', () => {});
});