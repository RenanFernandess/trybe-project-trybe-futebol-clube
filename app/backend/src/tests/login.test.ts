import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { FIELDS_FILLED } from '../errors/messages';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

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
});
