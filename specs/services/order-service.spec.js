const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const path = require('path');
const proxyquire = require('proxyquire');
const { expect } = chai;
chai.should();
chai.use(sinonChai);

/*
const pathService = path.resolve('./services/orderListService.js');
const helpers = require('../test-utils/orders-helper');
const mockModels = require('../test-utils/mockModels-helper');
const { 
  orderKey, 
  customerKey, 
  itemKey1, 
  itemKey2, 
  itemKey3, 
  dataArray, 
  customerArray, 
  storeProductArray, 
  listArray,
  finalPrice,
  orderObject,
  orderArray, 
  finalArray,
  foundOrders } = helpers;

describe('/server/services/orderListService, this service has got many-to-many association', () => {
  describe('OrderList and Order Model Service done together', () => {
    
    const OLService = proxyquire(pathService, {
      '../models': mockModels
    });
    const olService = new OLService();
    // console.log(mockModels)
    let result;
    let low;
    let up;
    const data = dataArray.find(dd => dd.customers_cid)

    const store = storeProductArray.data[0]
    describe.skip('add a new order and orderList', () => {
      describe('successfully added a new order and a list of orderList', () => {
        // console.log(mockModels)
        before(async () => {

          mockModels.StoreProduct.findByPk.withArgs(dataArray[0].customers_cid).resolves(customerArray);
          mockModels.Customer.findByPk.withArgs(dataArray[0].store_products_spid).resolves(storeProductArray);

          storeProductArray.update.withArgs({ 
            quantity: store.dataValues.quantity - data.quantity
          })

          // dataArray.map(unit => mockModels.Customer.findByPk.withArgs(unit.store_products_spid)).resolves(storeProductArray);
          // // mockModels.StoreProduct.findByPk.withArgs(dataArray)
          // dataArray.map(part => mockModels.OrderList.withArgs(part)).resolves(listArray);
          // mockModels.Order.create.withArgs({        
          //   status_completed: true,
          //   final_price: finalPrice.reduce((acc, curr) => acc + curr),
          //   customers_cid: customerId.find(cus => cus.dataValues.cid).dataValues.cid
          // }).resolves(orderObject);
          // listArray.concat(orderObject).returns(finalArray);
          result = await olService.addOrderList(dataArray);
        });

        after(() => {
          sinon.restore()
        });

        it('StoreProduct inside the map is called', () => {
          // console.log(data)
          expect(mockModels.StoreProduct.findByPk).to.have.been.called
        });

        it('Customer inside the map is called', () => {
          // console.log(data)
          expect(mockModels.Customer.findByPk).to.have.been.called
        });
      });

      // describe.only()
    });

    describe('Fetch all orders', () => {
      before(async () => {
        mockModels.Order.findAll.resolves(orderArray);
        result = await olService.findAllOrders();
      });

      after(() => {
        sinon.reset()
      });

      it('find all orders called', () => {
        expect(mockModels.Order.findAll).to.have.been.called;
      });

      it('results is an array of objects', () => {
        expect(result).to.deep.equal(orderArray);
      });
    });

    describe('Fetch all orderList', () => {
      before(async () => {
        mockModels.OrderList.findAll.resolves(orderArray);
        result = await olService.findAllOrderList();
      });

      after(() => {
        sinon.reset()
      });

      it('find all orderList called', () => {
        expect(mockModels.OrderList.findAll).to.have.been.called;
      });

      it('results is an array of objects', () => {
        expect(result).to.deep.equal(orderArray);
      });
    });

    describe('find your order and the items purchased', () => {
      before(async () => {
        mockModels.Order.findOne.withArgs({ where: { oid: orderKey } }).resolves(orderObject)
        low = sinon.stub(OLService, 'lower').callsFake(() => {
          return '2021-10-31 22:21:22+00'
        });
        up = sinon.stub(OLService, 'upper').callsFake(() => {
          return '2021-10-31 22:27:22+00'
        });
        mockModels.Customer.findAll.withArgs({
          where: {
            cid: orderObject.dataValues.customers_cid
          },
          include: [{
            model: mockModels.StoreProduct,
            through: {
              [mockModels.Sequelize.Op.between]: [low, up]
            }
          }]
        }).resolves(foundOrders)
        await olService.findYourOrder(orderKey)
        result = foundOrders;
      });

      after(() => {
        sinon.reset()
      });

      it('Order findOne calledWith args', () => {
        expect(mockModels.Order.findOne).to.have.been.calledWith({ where: { oid: orderKey } });
      });

      it('Static method lower calledWith args', () => {
        expect(low).to.have.been.calledWith(orderObject.dataValues.created_at);
      });

      it('Static method upper calledWith args', () => {
        expect(up).to.have.been.calledWith(orderObject.dataValues.created_at);
      });

      it('All associated tables Customer, StoreProduct and OrderList called at once', () => {
        // expect(mockModels.Customer.findAll).to.have.been.calledWith({
        //   where: {
        //     cid: orderObject.dataValues.customers_cid
        //   },
        //   include: [{
        //     model: mockModels.StoreProduct,
        //     through: {
        //       [mockModels.Sequelize.Op.between]: [low, up]
        //     }
        //   }]
        // })
        expect(mockModels.Customer.findAll).to.have.been.called
      });

      it('final result is many-to-many ass as well as array.concat with orderobject', () => {
        expect(result).to.deep.equal(foundOrders)
      });
    });
  });
})
*/