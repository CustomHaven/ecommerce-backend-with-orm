const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const path = require('path');
const proxyquire = require('proxyquire');
const { expect } = chai;
chai.should();
chai.use(sinonChai);

/*
const pathService = path.resolve('./services/storeProductService.js');
const helpers = require('../test-utils/storeProduct-helper');
const mockModels = require('../test-utils/mockModels-helper');
const { pKey, pKey2, fKey, fKey2, data, allArrayObject, oneObject, dealerObj, fakeQuery } = helpers;

describe('/server/services/storeProductService, this service has got association', () => {

  const StoreProductService = proxyquire(pathService, {
    '../models': mockModels
  });
  const storeProductService = new StoreProductService();

  let result;
  describe('find all products for Fkey', () => {
    describe('all products', () => {
      before(async () => {
        mockModels.StoreProduct.findAll.resolves(allArrayObject)
        result = await storeProductService.findAllStoreProducts();
      });

      after(() => {
        sinon.reset()
      })
      
      it('Called findAll()', () => {
        expect(mockModels.StoreProduct.findAll).to.have.been.called
      });

      it('returns allProducts', () => {
        expect(result).to.deep.equal(allArrayObject);
      })
    })
  });

  describe('add a new Product', () => {
    describe('Fkey not found null', () => {
      before(async () => {
        mockModels.DealerProduct.findByPk.withArgs(data.dealer_product_dpid).resolves(null);
        result = await storeProductService.addStoreProduct(data)
      });

      after(() => {
        sinon.reset();
      });

      it('findByPk of DealerProduct called', () => {
        expect(mockModels.DealerProduct.findByPk).to.have.been.calledWith(data.dealer_product_dpid)
      });

      it('dealerProduct create was never called',() => {
        expect(mockModels.StoreProduct.create).not.to.have.been.called
      });

      it('results returns null', () => {
        expect(result).to.deep.equal(null)
      });
    })

    describe('successfully added the new product', () => {
      before(async () => {
        mockModels.DealerProduct.findByPk.withArgs(data.dealer_product_dpid).resolves(dealerObj);
        dealerObj.update.withArgs({ quantity: parseInt(dealerObj.dataValues.quantity - data.quantity) }).resolves(dealerObj)
        mockModels.StoreProduct.create.withArgs({...data, dealer_product_dpid: dealerObj.dataValues.dpid }).resolves(oneObject)
        result = await storeProductService.addStoreProduct(data)
      });

      after(() => {
        sinon.reset();
      });

      it('findByPk of DealerProduct called', () => {
        expect(mockModels.DealerProduct.findByPk).to.have.been.calledWith(data.dealer_product_dpid)
      });

      it('fakeQuery was called for DealerProduct to update it', () => {
        expect(dealerObj.update).to.have.been.calledWith(sinon.match({ 
          quantity: parseInt(dealerObj.dataValues.quantity - data.quantity)
        }))
      });

      it('storeProduct was called with the values',() => {
        expect(mockModels.StoreProduct.create).to.have.been.calledWith(sinon.match({
          ...data, 
          dealer_product_dpid: dealerObj.dataValues.dpid 
        }));
      });

      it('results returns oneObject of a new product', () => {
        expect(result).to.deep.equal(oneObject)
      });
    })
  });

  describe('find a single storeProduct', () => {
    describe('Success in finding a storeProduct', () => {
      before(async () => {
        mockModels.StoreProduct.findOne.withArgs({ where: { spid: pKey } }).resolves(oneObject);
        result = await storeProductService.findStoreProduct(pKey);
      });
      after(() => {
        sinon.reset();
      });

      it('findOne was called', () => {
        expect(mockModels.StoreProduct.findOne).to.have.been.calledWith({ where: { spid: pKey } });
      });

      it('Successfully found the storeProduct', () => {
        expect(result).to.deep.equal(oneObject);
      });
    });

    describe('failure to find a storeProduct', () => {
      before(async () => {
        mockModels.StoreProduct.findOne.withArgs({ where: { spid: pKey } }).resolves(null);
        result = await storeProductService.findStoreProduct(pKey);
      });
      after(() => {
        sinon.reset();
      });

      it('findOne was called', () => {
        expect(mockModels.StoreProduct.findOne).to.have.been.calledWith({ where: { spid: pKey } });
      });

      it('return null on the storeProduct', () => {
        expect(result).to.deep.equal(null);
      });
    });
  });

  describe('Find by primary key', () => {
    describe('findByPk() dealer found', () => {
      before(async () => {
        mockModels.StoreProduct.findByPk.withArgs(pKey).resolves(oneObject)
        result = await storeProductService.findByPrimaryKey(pKey);
      });

      after(() => {
        sinon.reset()
      });

      it('call StoreProduct.findByPk()', () => {
        expect(mockModels.StoreProduct.findByPk).to.have.been.calledWith(pKey)
      })

      it('returns a storeProduct', () => {
        expect(result).to.deep.equal(oneObject)
      })
    })

    describe('findByPk() storeProduct cannot be found', () => {
      before(async () => {
        mockModels.StoreProduct.findByPk.withArgs(pKey).resolves(null)
        
        userResult = await storeProductService.findByPrimaryKey(pKey);
      });

      after(() => {
        sinon.reset()
      });

      it('call User.findByPk()', () => {
        expect(mockModels.StoreProduct.findByPk).to.have.been.calledWith(pKey)
      })

      it('returns the user', () => {
        expect(userResult).to.deep.equal(null)
      })
    })
  });

  describe('update a storeProduct', () => {
    describe('storeProduct does not exist', () => {
      before(async () => {
        mockModels.StoreProduct.findByPk.withArgs(pKey).resolves(undefined || null)
        result = await storeProductService.updateStoreProduct(pKey);
      });

      after(() => {
        sinon.reset();
      });

      it('findByPk called and returns null or undefined', () => {
        expect(mockModels.StoreProduct.findByPk).to.have.been.calledWith(pKey);
      });

      it('fakeQuery never called', () => {
        expect(fakeQuery.update).to.not.have.been.called;
      });

      it('result output is null', () => {
        expect(result).to.deep.equal(null);
      });
    });

    describe('storeProduct found and updated', () => {
      before(async () => {
        mockModels.StoreProduct.findByPk.withArgs(pKey).resolves(fakeQuery)
        fakeQuery.update.withArgs(data).resolves(oneObject);
        result = await storeProductService.updateStoreProduct(pKey, data);
      });

      after(() => {
        sinon.reset();
      });

      it('findByPk called and returns fakedealer', () => {
        expect(mockModels.StoreProduct.findByPk).to.have.been.calledWith(pKey);
      });

      it('fakeQuery called', () => {
        expect(fakeQuery.update).to.have.been.calledWith(sinon.match(data))
      });

      it('result output updated query', () => {
        expect(result).to.deep.equal(oneObject);
      });
    });
  });

  describe('remove a storeProduct', () => {
    describe('failed to delete a product from the storeProduct', () => {
      before(async () => {
        mockModels.StoreProduct.destroy.withArgs({ where: { spid: pKey } }).resolves(undefined || null);
        result = await storeProductService.deleteStoreProduct(pKey);
      });

      after(() => {
        sinon.restore();
      });

      it('findByPk called', () => {
        expect(mockModels.StoreProduct.destroy).to.have.been.calledWith(sinon.match({ where: { spid: pKey } }))
      })

      it('returns null', () => {
        expect(result).to.deep.equal(null);
      });
    });

    describe('successfully deleted a product from the storeProduct', () => {
      before(async () => {
        mockModels.StoreProduct.destroy.withArgs({ where: { spid: pKey } }).resolves({
           message: "Successfully removed the product"
        });
        result = await storeProductService.deleteStoreProduct(pKey);
      });

      after(() => {
        sinon.restore();
      });

      it('findByPk called', () => {
        expect(mockModels.StoreProduct.destroy).to.have.been.calledWith(sinon.match({ where: { spid: pKey } }))
      })

      it('returns JSON.stringify successfully deleted message', () => {
        expect(JSON.stringify(result)).to.deep.equal(JSON.stringify({ 
          message: "Successfully removed the product"
        }));
      });
    });
  });
})
*/