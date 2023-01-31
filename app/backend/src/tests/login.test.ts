import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { FIELDS_FILLED, INCORRECT_LOGIN } from '../errors/messages';
import USER_MOCK from './mocks/user.mock';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o login', () => {
  it(`Verifica se é retornado code 400 e a mensagem "${FIELDS_FILLED}", caso o email não seja passado.`, async () => {
    const res = await chai
      .request(app)
      .post('/login')
      .send({
        "email": "",
        "password": "password"
      });

    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.deep.equal({ message: FIELDS_FILLED })
  });
  it(`Verifica se é retornado code 400 e a mensagem "${FIELDS_FILLED}", caso o password não seja passado.`, async () => {
    const res = await chai
      .request(app)
      .post('/login')
      .send({
        "email": "test@gmail.com",
        "password": ""
      });

    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.deep.equal({ message: FIELDS_FILLED })
  });

  it(`Verifica se é retornado code 401 e a mensagem "${INCORRECT_LOGIN}", caso o email não seja valido.`, async () => {
    sinon
      .stub(User, "findOne")
      .resolves(null);
    const res = await chai
      .request(app)
      .post('/login')
      .send({
        "email": "incorrect@admin.com",
        "password": "secret_admin"
      });

    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.deep.equal({ message: INCORRECT_LOGIN })
  });

  it(`Verifica se é retornado code 401 e a mensagem "${INCORRECT_LOGIN}", caso o password não seja valido.`, async () => {
    sinon
      .stub(User, "findOne")
      .resolves(USER_MOCK as User);
    const res = await chai
      .request(app)
      .post('/login')
      .send({
        "email": "admin@admin.com",
        "password": "incorrect"
      });

    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.deep.equal({ message: INCORRECT_LOGIN })
  });

  afterEach(sinon.restore);
});
