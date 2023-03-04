import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect, request } = chai;

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

describe('teste referente a rota "login', () => {
  beforeEach(sinon.restore);

  const user = new UserModel({
    id: 1,
    username: 'testUser',
    role: 'admin',
    email: 'test@test.com',
    password: '123456'
  })

  it('Consegue retornar um token corretamente', async () => {
    const body = { email: 'test@test.com', password: '123456'}

    sinon.stub(Model, 'findOne').resolves(user);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await request(app).post('/login').send(body);

    expect(result.status).to.be.equal(200);
    expect(result.body).to.haveOwnProperty('token');
  });
});


describe('teste referente a rota "Login/role', () => {
  beforeEach(sinon.restore);

  const user = { 
    id: 1,
    username: 'testUser',
    role: 'admin',
    email: 'test@test.com',
   };

  it('Consegue retornar um erro 401 qunado o token estiver ausente', async () => {
    const result = await request(app).get('/login/role')

    expect(result.status).to.deep.equal(401);
    expect(result.body).to.deep.equal({ message: 'Token not found'})
  });

  it('Consegue retornar um erro 401 quando o token for inválido', async () => {
    const token = 'token_inválido';

    const result = await request(app).get('/login/role')
      .set('Authorization', token);

    expect(result.status).to.deep.equal(401);
    expect(result.body).to.deep.equal({ message: 'Token must be a valid token'})
  });

  it('Consegue retornar a role do usuário autenticado', async () => {
    const token = jwt.sign(user, JWT_SECRET);
    const result = await request(app).get('/login/role').set('Authorization', token);

    expect(result.status).to.deep.equal(200);
    expect(result.body).to.deep.equal({ role: 'admin'})
  });
});