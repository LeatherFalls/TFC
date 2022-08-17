import * as sinon from 'sinon';
import * as chai from 'chai';

//@ts-ignore

import chaiHttp = require('chai-http');

import Users from '../database/models/Users';
import { Response } from 'superagent';
import { IUser } from './interfaces/IUser';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const loginMock: IUser = {
  id: 1,
  username: 'any-name',
  role: 'any-role',
  email: 'any-email',
  password: 'any-string',
}

describe('Testing login route:', function() {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Users, 'findOne').resolves(loginMock as Users);
  })

  after(async () => {
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Should return a token:', async function() {
    chaiHttpResponse = await chai.request(app).post('/login');

    expect(chaiHttpResponse.body).to.have.key('token').and.not.to.be.an('undefined');
  })
})