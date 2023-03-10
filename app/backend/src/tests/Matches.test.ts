import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';
import Matche from '../database/models/MatchesModel';
import * as jwt from 'jsonwebtoken';


chai.use(chaiHttp);

const { expect } = chai;
const secret = process.env.JWT_SECRET || 'secret';

describe('Teste referente a rota "matches"', () => {
  afterEach(() => {
    sinon.restore();
 });

  const matchesList = [
    new Matche({
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 3,
      awayTeamId: 2,
      awayTeamGoals: 2,
      inProgress: true
    }),
    new Matche({
      id: 2,
      homeTeamId: 3,
      homeTeamGoals: 7,
      awayTeamId: 4,
      awayTeamGoals: 1,
      inProgress: false
    }),
  ]

  const mockMatcheList = [
    {
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 3,
      awayTeamId: 2,
      awayTeamGoals: 2,
      inProgress: true
    },
    {
      id: 2,
      homeTeamId: 3,
      homeTeamGoals: 7,
      awayTeamId: 4,
      awayTeamGoals: 1,
      inProgress: false
    }
  ]

  const createMatch = {
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 2,
    inProgress: true,
  };


  it('Consegue retornar todas as partida', async () => {
    sinon.stub(Model, 'findAll').resolves(matchesList);

    const result = await chai.request(app).get('/matches');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(mockMatcheList);
  });


  it('Consegue  retornar as partida que estão em progresso', async () => {
    sinon.stub(Model, 'findAll').resolves(matchesList);

    const result = await chai.request(app).get('/matches?inProgress=true');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([mockMatcheList[0]]);
  });
  
  it('Consegue finalisar uma partida com token valido', async () => {
    sinon.stub(Model, 'update').resolves();
    const user = { 
      id: 1,
      username: 'testUser',
      role: 'admin',
      email: 'test@test.com',
     };
    const token = jwt.sign(user, secret);

    const result = await chai.request(app).patch('/matches/1/finish').set('Authorization', token);

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal({ message: 'Finished' });
  });

  it('Consegue criar uma nova partida', async () => {
    sinon.stub(Model, 'create').resolves(matchesList[1]);
    const user = { 
      id: 1,
      username: 'testUser',
      role: 'admin',
      email: 'test@test.com',
     };
    const token = jwt.sign(user, secret);

    const result = await chai.request(app).post('/matches').send(createMatch).set('Authorization', token);

    expect(result.status).to.be.equal(201);
    expect(result.body).to.deep.equal(mockMatcheList[1]);
  });
});