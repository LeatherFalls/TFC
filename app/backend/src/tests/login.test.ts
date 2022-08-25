import * as sinon from 'sinon';
import * as chai from 'chai';
import { hash } from 'bcryptjs';

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
  email: 'email@email.com',
  password: '$2b$10$//DXiVVE59p7G5k/4Klx/ezF7BI42QZKmoOD0NDvUuqxRE5bFFBLy',
}

const expectedBody = {
  email: 'email@email.com',
  password: '123456gjfnsn'
};

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc'

describe('Testing login route:', function() {
  let chaiHttpResponse: Response;

  it('Should return a token:', async function() {
    const passwordHash = await hash('123456gjfnsn', 8);

    sinon.stub(Users, 'findOne').resolves({
      id: 1,
      username: 'any-name',
      role: 'any-role',
      email: 'email@email.com',
      password: passwordHash,
    } as Users);

    chaiHttpResponse = await chai.request(app).post('/login').send(expectedBody);

    expect(chaiHttpResponse.body).to.have.key('token').and.not.to.be.an('undefined');
  });

  it('Should return status 400 if email is not informed:', async function() {
    chaiHttpResponse = await chai.request(app).post('/login').send(expectedBody.password);

    expect(chaiHttpResponse).to.have.status(400);

    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Should return status 400 if password is not informed', async function() {
    chaiHttpResponse = await chai.request(app).post('/login').send(expectedBody.email);

    expect(chaiHttpResponse).to.have.status(400);

    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });
  
  it('Should return status 401 in case of invalid email', async function() {
    chaiHttpResponse = await chai.request(app).post('/login').send({ email: 'any@email', password: 'any-password' });

    expect(chaiHttpResponse).to.have.status(401);

    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  })

  it('Should return status 401 in case of invalid password:', async function() {
    chaiHttpResponse = await chai.request(app).post('/login').send({ email: 'any@email.com', password: 'teste' });

    expect(chaiHttpResponse).to.have.status(401);

    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  })
})