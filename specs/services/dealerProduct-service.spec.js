const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const path = require('path');
const proxyquire = require('proxyquire');
const { expect } = chai;
chai.should();
chai.use(sinonChai);

/*

const pathService = path.resolve('./services/dealerProductService.js');
const helpers = require('../test-utils/dealerProduct-helper');
const mockModels = require('../test-utils/mockModels-helper');
const { pKey, pKey2, fKey, fKey2, data, allArrayObject, oneObject, dealerObj, fakeQuery } = helpers;

describe('/server/services/dealerProductService, this service has got association', () => {

  const DealerProductService = proxyquire(pathService, {
    '../models': mockModels
  });
  const dealerProductService = new DealerProductService();

  let result;
  describe('find all products for Fkey', () => {
    describe('all products', () => {
      before(async () => {
        mockModels.DealerProduct.findAll.resolves(allArrayObject)
        result = await dealerProductService.findAllDealerProducts();
      });

      after(() => {
        sinon.reset()
      })
      
      it('Called findAll()', () => {
        expect(mockModels.DealerProduct.findAll).to.have.been.called
      });

      it('returns allProducts', () => {
        expect(result).to.deep.equal(allArrayObject);
      })
    })
  });

  describe('add a new Product', () => {
    describe('Fkey not found null', () => {
      before(async () => {
        mockModels.Dealer.findByPk.withArgs(data.dealers_did).resolves(null);
        result = await dealerProductService.addDealerProduct(data)
      });

      after(() => {
        sinon.reset();
      });

      it('findByPk of DealerProduct called', () => {
        expect(mockModels.Dealer.findByPk).to.have.been.calledWith(data.dealers_did)
      });

      it('dealerProduct create was never called',() => {
        expect(mockModels.DealerProduct.create).not.to.have.been.called
      });

      it('results returns null', () => {
        expect(result).to.deep.equal(null)
      });
    })

    describe('successfully added the new product', () => {
      before(async () => {
        mockModels.Dealer.findByPk.withArgs(data.dealers_did).resolves(dealerObj);
        mockModels.DealerProduct.create.withArgs({...data, dealers_did: dealerObj.dataValues.did }).resolves(oneObject)
        result = await dealerProductService.addDealerProduct(data)
      });

      after(() => {
        sinon.reset();
      });

      it('findByPk of Dealer called', () => {
        expect(mockModels.Dealer.findByPk).to.have.been.calledWith(data.dealers_did)
      });

      it('dealerProduct was called with the values',() => {
        expect(mockModels.DealerProduct.create).to.have.been.calledWith(sinon.match(({...data, dealers_did: dealerObj.dataValues.did })))
      });

      it('results returns a new object with dealer/supplier product', () => {
        expect(result).to.deep.equal(oneObject)
      });
    })
  });

  describe('find a single dealer/supplier product', () => {
    describe('Success in finding a dealer/supplier product', () => {
      before(async () => {
        mockModels.DealerProduct.findOne.withArgs({ where: { dpid: pKey } }).resolves(oneObject);
        result = await dealerProductService.findDealerProduct(pKey);
      });
      after(() => {
        sinon.reset();
      });

      it('findOne was called', () => {
        expect(mockModels.DealerProduct.findOne).to.have.been.calledWith({ where: { dpid: pKey } });
      });

      it('Successfully found the dealer/supplier product', () => {
        expect(result).to.deep.equal(oneObject);
      });
    });

    describe('failure to find a dealer/supplier product', () => {
      before(async () => {
        mockModels.DealerProduct.findOne.withArgs({ where: { dpid: pKey } }).resolves(null);
        result = await dealerProductService.findDealerProduct(pKey);
      });
      after(() => {
        sinon.reset();
      });

      it('findOne was called', () => {
        expect(mockModels.DealerProduct.findOne).to.have.been.calledWith({ where: { dpid: pKey } });
      });

      it('return null on the dealer/supplier product', () => {
        expect(result).to.deep.equal(null);
      });
    });
  });

  describe('Find by primary key', () => {
    describe('findByPk() dealer found', () => {
      before(async () => {
        mockModels.DealerProduct.findByPk.withArgs(pKey).resolves(oneObject)
        result = await dealerProductService.findByPrimaryKey(pKey);
      });

      after(() => {
        sinon.reset()
      });

      it('call DealerProduct.findByPk()', () => {
        expect(mockModels.DealerProduct.findByPk).to.have.been.calledWith(pKey)
      })

      it('returns a dealer/supplier product', () => {
        expect(result).to.deep.equal(oneObject)
      })
    })

    describe('findByPk() dealer/supplier product cannot be found', () => {
      before(async () => {
        mockModels.DealerProduct.findByPk.withArgs(pKey).resolves(null)
        
        userResult = await dealerProductService.findByPrimaryKey(pKey);
      });

      after(() => {
        sinon.reset()
      });

      it('call User.findByPk()', () => {
        expect(mockModels.DealerProduct.findByPk).to.have.been.calledWith(pKey)
      })

      it('returns the user', () => {
        expect(userResult).to.deep.equal(null)
      })
    })
  });

  describe('update a dealer/supplier product', () => {
    describe('dealer/supplier product does not exist', () => {
      before(async () => {
        mockModels.DealerProduct.findByPk.withArgs(pKey).resolves(undefined || null)
        result = await dealerProductService.updateDealerProduct(pKey);
      });

      after(() => {
        sinon.reset();
      });

      it('findByPk called and returns null or undefined', () => {
        expect(mockModels.DealerProduct.findByPk).to.have.been.calledWith(pKey);
      });

      it('fakeQuery never called', () => {
        expect(fakeQuery.update).to.not.have.been.called;
      });

      it('result output is null', () => {
        expect(result).to.deep.equal(null);
      });
    });

    describe('dealer/supplier product found and updated', () => {
      before(async () => {
        mockModels.DealerProduct.findByPk.withArgs(pKey).resolves(fakeQuery)
        fakeQuery.update.withArgs(data).resolves(oneObject);
        result = await dealerProductService.updateDealerProduct(pKey, data);
      });

      after(() => {
        sinon.reset();
      });

      it('findByPk called and returns fakedealer', () => {
        expect(mockModels.DealerProduct.findByPk).to.have.been.calledWith(pKey);
      });

      it('fakeQuery called', () => {
        expect(fakeQuery.update).to.have.been.calledWith(sinon.match(data))
      });

      it('result output updated query', () => {
        expect(result).to.deep.equal(oneObject);
      });
    });
  });

  describe('remove a dealer/supplier product', () => {
    describe('failed to delete dealer/supplier product', () => {
      before(async () => {
        mockModels.DealerProduct.destroy.withArgs({ where: { dpid: pKey } }).resolves(undefined || null);
        result = await dealerProductService.deleteDealerProduct(pKey);
      });

      after(() => {
        sinon.restore();
      });

      it('findByPk called', () => {
        expect(mockModels.DealerProduct.destroy).to.have.been.calledWith(sinon.match({ where: { dpid: pKey } }))
      })

      it('returns null', () => {
        expect(result).to.deep.equal(null);
      });
    });

    describe('successfully deleted a dealer/supplier product', () => {
      before(async () => {
        mockModels.DealerProduct.destroy.withArgs({ where: { dpid: pKey } }).resolves({ message: "Successfully removed the dealer/supplier's product" });
        result = await dealerProductService.deleteDealerProduct(pKey);
      });

      after(() => {
        sinon.restore();
      });

      it('findByPk called', () => {
        expect(mockModels.DealerProduct.destroy).to.have.been.calledWith(sinon.match({ where: { dpid: pKey } }))
      })

      it('returns JSON.stringify successfully deleted message', () => {
        expect(JSON.stringify(result)).to.deep.equal(JSON.stringify({ message: "Successfully removed the dealer/supplier's product" }));
      });
    });
  });

  
})











*/