const { makeMockModels } = require('sequelize-test-helpers');
const sinon = require('sinon');
const mockModels = makeMockModels()

for (const key in mockModels) {
  delete Object.assign(mockModels, {
    [key.replace(/Model/, '')]: {
      findAll: sinon.stub(),
      findByPk: sinon.stub(),
      findOne: sinon.stub(),
      create: sinon.stub(),
      update: sinon.stub(),
      destroy: sinon.stub()
    }
  })[key]
}

module.exports = mockModels;
