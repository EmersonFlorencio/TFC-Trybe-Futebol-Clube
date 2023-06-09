import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import { Model } from 'sequelize';
import TeamService from '../services/TeamServices';
import { mockTeams, mockTeamId } from './mocks/TeamsMock';

chai.use(chaiHttp);
const { expect } = chai;

describe('teste referente a rota "teams', () => {
  afterEach(() => {
    sinon.restore();
 });

  console.log(TeamsModel)

  it('Consegue retornar os times da rota "team"', async () => {
    sinon.stub(Model, 'findAll').resolves(mockTeams as TeamsModel[])
    const service = new TeamService();
    const results = await service.getAll()

    const httpStatus = await chai.request(app).get('/teams');

    expect(httpStatus.status).to.be.equal(200);
    expect(results).to.be.deep.equal(mockTeams);
  });

  it('Consegue retorna somente o time com id solicitado na rota "teams"', async () =>{
    sinon.stub(Model, 'findByPk').resolves(mockTeamId as TeamsModel)
    const service = new TeamService();
    const result = await service.getById(mockTeamId.id)

    const httpStatus = await chai.request(app).get('/teams/4');

    expect(httpStatus.status).to.be.equal(200);
    expect(result).to.be.deep.equal(mockTeamId);
  });
});
