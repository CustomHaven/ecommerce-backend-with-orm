const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const path = require('path');
const proxyquire = require('proxyquire');
const { makeMockModels } = require('sequelize-test-helpers');
const { expect } = chai;
chai.should();
chai.use(sinonChai);
/*
const pathService = path.resolve('./services/dealerService.js');

describe('/server/services/dealerService', () => {
  const id = '6a88e9b5-33a2-403f-ac3d-e86413ac101d';
  const data = {
    name: 'test guy 1',
    description: 'description number 1',
  }
  const oneDealer = {
    did: '6a88e9b5-33a2-403f-ac3d-e86413ac101d',
    name: 'test guy 1',
    description: 'description number 1',
    created_at: "2021-10-19T09:31:36.630Z",
    updated_at: "2021-10-19T09:31:49.627Z"
  }
  const allDealers = [
    {
      did: '6a88e9b5-33a2-403f-ac3d-e86413ac101d',
      name: 'test guy 1',
      description: 'description number 1',
      created_at: "2021-10-19T09:31:36.630Z",
      updated_at: "2021-10-19T09:31:49.627Z"
    },
    {
      did: '18c805d6-a8a2-4437-9488-9bdf4e56061d',
      name: 'test guy 2',
      description: 'description number 2',
      created_at: "2021-10-20T09:31:36.630Z",
      updated_at: "2021-10-20T09:31:49.627Z"
    }
  ]
  const DealerModel = {
    findAll: sinon.stub(),
    create: sinon.stub(),
    findOne: sinon.stub(),
    findByPk: sinon.stub(),
    destroy: sinon.stub()
  };

  const mockModels = makeMockModels({ DealerModel });
  delete Object.assign(mockModels, {['Dealer']: mockModels['DealerModel']})['DealerModel'];

  const DealerService = proxyquire(pathService, {
    '../models': mockModels
  })

  const dealerService = new DealerService();
  const fakeDealer = { id, data, update: sinon.stub() }
  let result;
  describe('Find all dealers', () => {
    describe('Found all dealers', () => {
      before(async () => {
        mockModels.Dealer.findAll.resolves(allDealers);
        result = await dealerService.findAllDealers();
      });

      after(() => {
        sinon.reset()
      })

      it('Called findAll()', () => {
        expect(mockModels.Dealer.findAll).to.have.been.called
      });

      it('returns all dealers', () => {
        expect(result).to.be.equal(allDealers)
      });
    });
  });

  describe('add a new dealer', () => {
    describe('create(args) Successfully added a new dealer/supplier', () => {
      before(async () => {
        mockModels.Dealer.create.withArgs(data).resolves(oneDealer);
        result = await dealerService.addDealer(data)
      });

      after(() => {
        sinon.reset()
      });

      it('create(args) was called', () => {
        expect(mockModels.Dealer.create).to.have.been.calledWith(data);
      });

      it('Successfully added a new dealer/supplier', () => {
        expect(result).to.deep.equal(oneDealer);
      });
    });
  });

  describe('find a single dealer/supplier', () => {
    describe('Success in finding a dealer/supplier', () => {
      before(async () => {
        mockModels.Dealer.findOne.withArgs({ where: { did: id } }).resolves(oneDealer);
        result = await dealerService.findDealer(id);
      });
      after(() => {
        sinon.reset();
      });

      it('findOne was called', () => {
        expect(mockModels.Dealer.findOne).to.have.been.calledWith({ where: { did: id } });
      });

      it('Successfully found the dealer/supplier', () => {
        expect(result).to.deep.equal(oneDealer);
      });
    });

    describe('failure to find a dealer/supplier', () => {
      before(async () => {
        mockModels.Dealer.findOne.withArgs({ where: { did: id } }).resolves(null);
        result = await dealerService.findDealer(id);
      });
      after(() => {
        sinon.reset();
      });

      it('findOne was called', () => {
        expect(mockModels.Dealer.findOne).to.have.been.calledWith({ where: { did: id } });
      });

      it('return null on the dealer/supplier', () => {
        expect(result).to.deep.equal(null);
      });
    });
  });

  describe('Find by primary key', () => {
    describe('findByPk() dealer found', () => {
      before(async () => {
        mockModels.Dealer.findByPk.withArgs(id).resolves(oneDealer)
        result = await dealerService.findByPrimaryKey(id);
      });

      after(() => {
        sinon.reset()
      });

      it('call Dealer.findByPk()', () => {
        expect(mockModels.Dealer.findByPk).to.have.been.calledWith(id)
      })

      it('returns a dealer/supplier', () => {
        expect(result).to.deep.equal(oneDealer)
      })
    })

    describe('findByPk() dealer/supplier cannot be found', () => {
      // let mid;
      before(async () => {
        mockModels.Dealer.findByPk.withArgs(id).resolves(null)
        
        userResult = await dealerService.findByPrimaryKey(id);
      });

      after(() => {
        sinon.reset()
      });

      it('call User.findByPk()', () => {
        expect(mockModels.Dealer.findByPk).to.have.been.calledWith(id)
      })

      it('returns the user', () => {
        expect(userResult).to.deep.equal(null)
      })
    })
  });

  describe('update a dealer/supplier', () => {
    describe('dealer/supplier does not exist', () => {
      before(async () => {
        mockModels.Dealer.findByPk.withArgs(id).resolves(undefined || null)
        result = await dealerService.updateDealer(id);
      });

      after(() => {
        sinon.reset();
      });

      it('findByPk called and returns null or undefined', () => {
        expect(mockModels.Dealer.findByPk).to.have.been.calledWith(id);
      });

      it('fakeDealer never called', () => {
        expect(fakeDealer.update).to.not.have.been.called;
      });

      it('result output is null', () => {
        expect(result).to.deep.equal(null);
      });
    });

    describe('dealer/supplier found and updated', () => {
      before(async () => {
        mockModels.Dealer.findByPk.withArgs(id).resolves(fakeDealer)
        fakeDealer.update.withArgs(data).resolves(oneDealer);
        result = await dealerService.updateDealer(id, data);
      });

      after(() => {
        sinon.reset();
      });

      it('findByPk called and returns fakedealer', () => {
        expect(mockModels.Dealer.findByPk).to.have.been.calledWith(id);
        // assert.equal(mockModels.Dealer.findByPk.withArgs(id), oneDealer) 
      });

      it('fakeDealer never called', () => {
        expect(fakeDealer.update).to.have.been.calledWith(sinon.match(data))
      });

      it('result output is null', () => {
        expect(result).to.deep.equal(oneDealer);
      });
    });
  });

  describe('remove a dealer/supplier', () => {
    describe('failed to delete dealer/supplier', () => {
      before(async () => {
        mockModels.Dealer.destroy.withArgs({ where: { did: id } }).resolves(undefined || null);
        result = await dealerService.deleteDealer(id);
      });

      after(() => {
        sinon.restore();
      });

      it('findByPk called', () => {
        expect(mockModels.Dealer.destroy).to.have.been.calledWith(sinon.match({ where: { did: id } }))
      })

      it('returns null', () => {
        expect(result).to.deep.equal(null);
      });
    });

    describe('successfully deleted a dealer/supplier', () => {
      before(async () => {
        mockModels.Dealer.destroy.withArgs({ where: { did: id } }).resolves({ message: 'Successfully removed the dealer/supplier' });
        result = await dealerService.deleteDealer(id);
      });

      after(() => {
        sinon.restore();
      });

      it('findByPk called', () => {
        expect(mockModels.Dealer.destroy).to.have.been.calledWith(sinon.match({ where: { did: id } }))
      })

      it('returns JSON.stringify successfully deleted message', () => {
        expect(JSON.stringify(result)).to.deep.equal(JSON.stringify({ message: 'Successfully removed the dealer/supplier' }));
      });
    });
  });

});
*/