import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { FIELDS_FILLED, INCORRECT_LOGIN, TOKEN_INVALID } from '../errors/messages';
import userMock, { invalidEmail, invalidPassword, login, noEmail, noPassword } from './mocks/user.mock';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o login', () => {
  describe('Testa a rota POST "/login"', () => {
    it(`Verifica se é retornado code 400 e a mensagem "${FIELDS_FILLED}", caso o email não seja passado.`, async () => {
      const res: Response = await chai.request(app).post('/login').send(noEmail);
  
      expect(res.status).to.be.equal(400);
      expect(res.body).to.be.deep.equal({ message: FIELDS_FILLED })
    });
    it(`Verifica se é retornado code 400 e a mensagem "${FIELDS_FILLED}", caso o password não seja passado.`, async () => {
      const res: Response = await chai.request(app).post('/login').send(noPassword);

      expect(res.status).to.be.equal(400);
      expect(res.body).to.be.deep.equal({ message: FIELDS_FILLED })
    });
  
    it(`Verifica se é retornado code 401 e a mensagem "${INCORRECT_LOGIN}", caso o email não seja valido.`, async () => {
      sinon.stub(User, "findOne").resolves(null);
      const res: Response = await chai.request(app).post('/login').send(invalidEmail);
  
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.deep.equal({ message: INCORRECT_LOGIN })
    });
  
    it(`Verifica se é retornado code 401 e a mensagem "${INCORRECT_LOGIN}", caso o password não seja valido.`, async () => {
      sinon.stub(User, "findOne").resolves(userMock as User);
      const res: Response = await chai.request(app).post('/login').send(invalidPassword);
  
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.deep.equal({ message: INCORRECT_LOGIN })
    });
  
    it(`Verifica se é possivel fazer login com email e senha validos.`, async () => {
      sinon.stub(User, "findOne").resolves(userMock as User);
      const res: Response = await chai.request(app).post('/login').send(login);
  
      expect(res.status).to.be.equal(200);
      expect(typeof res.body.token).to.be.equal('string')
    });
  });

  describe('Testa a rota GET "login/validate"', () => {
    beforeEach(() => sinon.stub(User, 'findByPk').resolves(userMock as User));

    it(`Verifica se é retornado code 401 e a mensagem "${TOKEN_INVALID}", caso o token não seja fornecido.`, async () => {
      const res: Response = await chai.request(app).get('/login/validate').set({ authorization: '' });

      expect(res.status).to.be.equal(401);
      expect(res.body.message).to.be.equal(TOKEN_INVALID)
    });

    it(`Verifica se é retornado code 401 e a mensagem "${TOKEN_INVALID}", caso o token não seja valido.`, async () => {
      const res: Response = await chai
        .request(app)
        .get('/login/validate')
        .set({ authorization: 'Invalid_token' });

      expect(res.status).to.be.equal(401);
      expect(res.body.message).to.be.equal(TOKEN_INVALID);
    });

    it(`Verifica se é retornado code 200 e role do usuario caso o token seja valido.`, async () => {
      const { body: { token } }: Response = await chai.request(app).post('/login').send(login);
      const res: Response = await chai.request(app).get('/login/validate').set({ authorization: token });

      expect(res.status).to.be.equal(200);
      expect(res.body.role).to.be.equal('admin');
    });
  });
  afterEach(sinon.restore);
});
