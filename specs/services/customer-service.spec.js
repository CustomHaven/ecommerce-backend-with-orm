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
const pathService = path.resolve('./services/customerService.js');

describe('/server/services/customerService', () => {
  
  const id = '6a88e9b5-33a2-403f-ac3d-e86413ac101d';
  const data = {
    first_name: 'testFirstName',
    last_name: 'testLastName',
    address: 'testAddress',
    zip_code: 'testZipCode',
    city: 'testCity',
    country: 'testCountry',
    email: 'test@email.com'
  }
  const oneCustomer = {
    cid: '6a88e9b5-33a2-403f-ac3d-e86413ac101d',
    first_name: 'testFirstName',
    last_name: 'testLastName',
    address: 'testAddress',
    zip_code: 'testZipCode',
    city: 'testCity',
    country: 'testCountry',
    email: 'test@email.com',
    created_at: "2021-10-19T09:31:36.630Z",
    updated_at: "2021-10-19T09:31:49.627Z"
  }
  const allCustomers = [
    {
      cid: '6a88e9b5-33a2-403f-ac3d-e86413ac101d',
      first_name: 'testFirstName1',
      last_name: 'testLastName1',
      address: 'testAddress1',
      zip_code: 'testZipCode1',
      city: 'testCity1',
      country: 'testCountry1',
      email: 'test1@email.com',
      created_at: "2021-10-19T09:31:36.630Z",
      updated_at: "2021-10-19T09:31:49.627Z"
    },
    {
      cid: '6a88e9b5-33a2-403f-ac3d-e86413ac101d',
      first_name: 'testFirstName2',
      last_name: 'testLastName2',
      address: 'testAddress2',
      zip_code: 'testZipCode2',
      city: 'testCity2',
      country: 'testCountry2',
      email: 'test2@email.com',
      created_at: "2021-10-20T09:31:36.630Z",
      updated_at: "2021-10-20T09:31:49.627Z"
    }
  ]
  const CustomerModel = {
    findAll: sinon.stub(),
    create: sinon.stub(),
    findOne: sinon.stub(),
    findByPk: sinon.stub(),
    destroy: sinon.stub()
  };

  const mockModels = makeMockModels({ CustomerModel });
  delete Object.assign(mockModels, {['Customer']: mockModels['CustomerModel']})['CustomerModel'];

  const CustomerService = proxyquire(pathService, {
    '../models': mockModels
  })

  const customerService = new CustomerService();
  const fakeCustomer = { id, data, update: sinon.stub() }
  let result;
  describe('Find all customers', () => {
    describe('Found all customers', () => {
      before(async () => {
        mockModels.Customer.findAll.resolves(allCustomers);
        result = await customerService.findAllCustomers();
      });

      after(() => {
        sinon.reset()
      })

      it('Called findAll()', () => {
        expect(mockModels.Customer.findAll).to.have.been.called
      });

      it('returns all customers', () => {
        expect(result).to.be.equal(allCustomers)
      });
    });
  }); // done

  describe('add a new customer', () => {
    describe('create(args) Successfully added a new customer', () => {
      before(async () => {
        mockModels.Customer.create.withArgs(data).resolves(oneCustomer);
        result = await customerService.addCustomer(data)
      });

      after(() => {
        sinon.reset()
      });

      it('create(args) was called', () => {
        expect(mockModels.Customer.create).to.have.been.calledWith(data);
      });

      it('Successfully added a new customer', () => {
        expect(result).to.deep.equal(oneCustomer);
      });
    });
  });

  describe('find a single customer', () => {
    describe('Success in finding a customer', () => {
      before(async () => {
        mockModels.Customer.findOne.withArgs({ where: { cid: id } }).resolves(oneCustomer);
        result = await customerService.findCustomer(id);
      });
      after(() => {
        sinon.reset();
      });

      it('findOne was called', () => {
        expect(mockModels.Customer.findOne).to.have.been.calledWith({ where: { cid: id } });
      });

      it('Successfully found the customer', () => {
        expect(result).to.deep.equal(oneCustomer);
      });
    });

    describe('failure to find a customer', () => {
      before(async () => {
        mockModels.Customer.findOne.withArgs({ where: { cid: id } }).resolves(null);
        result = await customerService.findCustomer(id);
      });
      after(() => {
        sinon.reset();
      });

      it('findOne was called', () => {
        expect(mockModels.Customer.findOne).to.have.been.calledWith({ where: { cid: id } });
      });

      it('return null on the customer', () => {
        expect(result).to.deep.equal(null);
      });
    });
  });

  describe('Find by primary key', () => {
    describe('findByPk() customer found', () => {
      before(async () => {
        mockModels.Customer.findByPk.withArgs(id).resolves(oneCustomer)
        result = await customerService.findByPrimaryKey(id);
      });

      after(() => {
        sinon.reset()
      });

      it('call Customer.findByPk()', () => {
        expect(mockModels.Customer.findByPk).to.have.been.calledWith(id)
      })

      it('returns a customer', () => {
        expect(result).to.deep.equal(oneCustomer)
      })
    })

    describe('findByPk() customer cannot be found', () => {
      // let mid;
      before(async () => {
        mockModels.Customer.findByPk.withArgs(id).resolves(null)
        
        userResult = await customerService.findByPrimaryKey(id);
      });

      after(() => {
        sinon.reset()
      });

      it('call User.findByPk()', () => {
        expect(mockModels.Customer.findByPk).to.have.been.calledWith(id)
      })

      it('returns the user', () => {
        expect(userResult).to.deep.equal(null)
      })
    })
  });

  describe('update a customer', () => {
    describe('customer does not exist', () => {
      before(async () => {
        mockModels.Customer.findByPk.withArgs(id).resolves(undefined || null)
        result = await customerService.updateCustomer(id);
      });

      after(() => {
        sinon.reset();
      });

      it('findByPk called and returns null or undefined', () => {
        expect(mockModels.Customer.findByPk).to.have.been.calledWith(id);
      });

      it('fakeCustomer never called', () => {
        expect(fakeCustomer.update).to.not.have.been.called;
      });

      it('result output is null', () => {
        expect(result).to.deep.equal(null);
      });
    });

    describe('customer found and updated', () => {
      before(async () => {
        mockModels.Customer.findByPk.withArgs(id).resolves(fakeCustomer)
        fakeCustomer.update.withArgs(data).resolves(oneCustomer);
        result = await customerService.updateCustomer(id, data);
      });

      after(() => {
        sinon.reset();
      });

      it('findByPk called and returns fakedealer', () => {
        expect(mockModels.Customer.findByPk).to.have.been.calledWith(id);
        // assert.equal(mockModels.Customer.findByPk.withArgs(id), oneCustomer) 
      });

      it('fakeCustomer never called', () => {
        expect(fakeCustomer.update).to.have.been.calledWith(sinon.match(data))
      });

      it('result output is null', () => {
        expect(result).to.deep.equal(oneCustomer);
      });
    });
  });

  describe('remove a customer', () => {
    describe('failed to delete customer', () => {
      before(async () => {
        mockModels.Customer.destroy.withArgs({ where: { cid: id } }).resolves(undefined || null);
        result = await customerService.deleteCustomer(id);
      });

      after(() => {
        sinon.restore();
      });

      it('findByPk called', () => {
        expect(mockModels.Customer.destroy).to.have.been.calledWith(sinon.match({ where: { cid: id } }))
      })

      it('returns null', () => {
        expect(result).to.deep.equal(null);
      });
    });

    describe('successfully deleted a customer', () => {
      before(async () => {
        mockModels.Customer.destroy.withArgs({ where: { cid: id } }).resolves({ message: 'Successfully removed the customer' });
        result = await customerService.deleteCustomer(id);
      });

      after(() => {
        sinon.restore();
      });

      it('findByPk called', () => {
        expect(mockModels.Customer.destroy).to.have.been.calledWith(sinon.match({ where: { cid: id } }))
      })

      it('returns JSON.stringify successfully deleted message', () => {
        expect(JSON.stringify(result)).to.deep.equal(JSON.stringify({ message: 'Successfully removed the customer' }));
      });
    });
  });

});
*/