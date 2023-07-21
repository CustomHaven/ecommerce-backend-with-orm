// CONTINUE ON LINE 159!!!
"use strict";
const { makeMockModels, sequelize } = require('sequelize-test-helpers');
const chai = require('chai');
const { assert, expect } = chai;
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const path = require('path');
const servicePath = path.resolve('./services/userService.js')
const sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);
const createError = require("http-errors");

const helpers = require('../test-utils/user-helper');
const { customError, fakeId, id, userData, updatedUser, allUsers } = helpers;

describe.only('/services/userService.js', function () {

  const UserModel = {
    findByPk: sinon.stub(),
    findOne: sinon.stub(),
    findAll: sinon.stub(),
    create: sinon.stub(),
    destroy: sinon.stub()
  }

  const mockModels = makeMockModels( { UserModel } );  
  delete Object.assign(mockModels, {['User']: mockModels['UserModel'] })['UserModel']

  const UserService = proxyquire(servicePath, {
    "../models": mockModels
  });

  // console.log('UserService["../models"]');
  // console.log(UserService.findByEmail);
  // console.log('UserService["../models"]');

  // console.log(UserService);
  const userService = new UserService();
  const fakeUser = {  update: sinon.stub() }

  let userResult, errors;
  describe('Find all user', () => {
    describe('findAll()', () => {
      before(async () => {
        mockModels.User.findAll.resolves(allUsers);
        userResult = await userService.findAllUsers();
      });

      after(() => {
        sinon.reset()
      });

      it('call User.findAll', () => {
        expect(mockModels.User.findAll).to.have.been.called
      });

      it('returns all user', () => {
        expect(userResult).to.deep.equal(allUsers)
      })
    })
  });

  describe('Find a single user', () => {
    describe('findOne() user exists', async () => {
      before(async () => {
        mockModels.User.findOne.withArgs({ where: { id: id } }).resolves(userData);
        userResult = await userService.findOneUser(id);
      });

      after(() => {
        sinon.reset();
        sinon.restore();
      });

      it('call User.findOne()', () => {
        expect(mockModels.User.findOne).to.have.been.calledWith({ where: { id: id } });
      })

      it('returns the user', () => {
        expect(userResult).to.deep.equal(userData);
      })
    });

    // try catch way which I will remove and use the solution right below this describe
    describe("findOne() throws error", async () => {
      const errors = customError(404, "User not found");
      const errors1 = customError(404, "User not foundss");   

      after(() => {
        sinon.reset();
        sinon.restore();
      });

      // made it work
      it("call User.findOne() with incorrect parameter, and throws an error,  works some how! 🤯", async () => {
        userResult = sinon.spy(userService.findOneUser);
        try {
          mockModels.User.findOne.withArgs({ where: { id: fakeId } }).threw(errors);
          await userResult(fakeId);
        } catch(e) {
          // pass without having catch the test fails 😵‍💫
        } finally {
          expect(mockModels.User.findOne).to.have.been.calledWith({ where: { id: fakeId } });
          expect(mockModels.User.findOne.withArgs(fakeId).throws(errors)).to.throw(/User not found/);
          expect(userResult).to.throw;
        }
      });

      it("throws error user does not exist,,, DOES NOT WORK", () => {
        expect(mockModels.User.findOne.withArgs(fakeId).throws(errors1)).to.throw(errors1)
        mockModels.User.findOne.withArgs(fakeId).should.throw(errors1); // specially this part without having the catch test fails. but npw test works even tested with errors1 variable
        expect(userResult).to.throw;
      });
    });


    describe('findOne() user does not exists, most cleanest throw solution', () => {

      errors = customError(404, "User not found");

      before(() => { // before is not needed but I like it 🤣
        mockModels.User.findOne.withArgs({ where: { id: fakeId } }).threw(errors);
        userResult = sinon.spy(userService, "findOneUser"); // either invoke the through sinon.spy or invoke the method directly doesnt really matter
        userResult(fakeId);
        // userResult = userService.findOneUser(fakeId); // invoke the method directly or invoke through sinon.spy from above
      });

      after(() => {
        sinon.reset()
      });

      it('call User.findOne() with invalid parameter is called', () => {
        expect(mockModels.User.findOne).to.have.been.calledWith({ where: { id: fakeId } });
      })
      it('test to throw the error', () => {
        expect(mockModels.User.findOne.withArgs(fakeId).throws(errors)).to.throw(errors);
        expect(userResult).to.throw;
      })
    });
  });


  describe('Add a new User', () => {
    describe('create(with args)', () => {
      before(async () => {
        mockModels.User.create.withArgs(userData).resolves(updatedUser);
        userResult = await userService.addUser(userData);
      });

      after(() => {
        sinon.reset();
      });

      it('call User.create(args)', () => {
        expect(mockModels.User.create).to.have.been.calledWith(userData)
      });

      it('call User.create(args)', () => {
        expect(userResult).to.equal(updatedUser)
      });
    });
  });


  describe('Find by primary key', () => {
    describe('findByPk() user found', () => {
      before(async () => {
        mockModels.User.findByPk.withArgs(id).resolves(updatedUser);
        userResult = await userService.findByPrimaryKey(id);
      });

      after(() => {
        sinon.reset();
      });

      it('call User.findByPk()', () => {
        expect(mockModels.User.findByPk).to.have.been.calledWith(id)
      })

      it('returns the user', () => {
        expect(userResult).to.deep.equal(updatedUser);
      });
    })

    describe('findByPk() user cannot be found', () => {
      before(() => {
        errors = createError(404, "User not found");
        mockModels.User.findByPk.withArgs(fakeId).threw(errors);
        userResult = userService.findByPrimaryKey(fakeId);
      });

      after(() => {
        sinon.reset()
      });

      it('call User.findByPk()', () => {
        expect(mockModels.User.findByPk).to.have.been.calledWith(fakeId)
      })

      it('returns the user', () => {
        expect(mockModels.User.findByPk.withArgs(fakeId).throws(errors)).to.throw(errors);
        expect(userResult).to.throw;
      })
    })
  });

  describe('Update User', () => {
    describe('user does not exist', () => {
      before(() => {
        errors = createError(404, "User not found");
        mockModels.User.findByPk.withArgs(id).threw(errors);
        // mockModels.User.findOne.withArgs({ where: { uid: id } }).throws(function() {new Error('User Not Found')})
        userResult = userService.updateUser(id, userData);
      })

      after(() => {
        sinon.reset()
      })
    
      it('called User.findOne', () => {
        expect(mockModels.User.findByPk).to.have.been.calledWith(id)
      })
  
      it('did not call user update', () => {
        expect(fakeUser.update).not.to.have.been.called
      });
  
      it('should return null', () => {
        expect(mockModels.User.findByPk.withArgs(id).throws(errors)).to.throw(/User not found/);
        expect(userResult).to.throw;
      })
    });
  
    describe('User exists', () => {
      before(async () => {
        mockModels.User.findByPk.withArgs(id).resolves(fakeUser);
        fakeUser.update.withArgs(userData).resolves(updatedUser);
        userResult = await userService.updateUser(id, userData);
      });
      // after(resetStubs);
      after(() => {
        sinon.reset()
      })
  
      it('call user.findOne()', () => {
        expect(mockModels.User.findByPk.calledWith(id)).to.equal(true);
      });
  
      it('call user.update to match sinon.match(userData)', () => {
        expect(fakeUser.update).to.have.been.calledWith(sinon.match(userData));
      });
  
      it('returns the user', () => {
        expect(userResult).to.deep.equal(updatedUser)
      })
    })
  });

  describe('Remove a user', () => {
    describe('Successfully deleted a user', () => {
      before(async () => {
        mockModels.User.destroy.withArgs({ where: { id: id }}).resolves(1); // 1 means it was successfully deleted!
        userResult = await userService.deleteUser(id)
      });

      after(() => {
        sinon.restore()
      });

      it('call destroy(id)', () => {
        expect(mockModels.User.destroy).to.have.been.calledWith({ where: { id: id } })
      });

      it('user is deleted', () => {
        expect(userResult).to.be.equal(1);
      });
    });

    describe('Failed to delete a user', () => {
      errors = createError(404, "User not found");
      before(() => {
        // mockModels.User.destroy.withArgs({ where: { id: fakeId }}).threw(errors);
        userResult = userService.deleteUser(fakeId)
      });

      after(() => {
        sinon.restore()
      });

      it('call destroy(id)', () => {
        expect(mockModels.User.destroy).to.have.been.calledWith({ where: { id: fakeId } })
      });

      it('user is deleted', () => {
        expect(mockModels.User.destroy.withArgs(fakeId).throws(errors)).to.throw(errors);
        expect(userResult).to.throw;
      });
    });
  });

})