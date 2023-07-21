const chai = require('chai');
const { expect } = chai;
const supertest = require('supertest');
const app = require('../../server.js');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);
const { cookieJwtAuth, isAdmin } = require('../../middleware/cookieJWTAuth.js');
const proxyquire = require('proxyquire').noCallThru().noPreserveCache();
const path = require('path');
const AuthService = require("../../services/authService.js");
// console.log("START AuthService")
// console.log(AuthService)
// console.log("START AuthService")

const servicePath = path.resolve('./services/authService.js');
// console.log("servicePath")
// console.log(servicePath)
// console.log("servicePath")

const controllerPath = path.resolve('./controllers/authController.js');

const { makeMockModels, sequelize } = require('sequelize-test-helpers');
// const authPath = path.resolve('./services/authService.js');


// console.log("AuthService")
// console.log(AuthService)
// console.log("AuthService")

// const UserService = require("../../services/userService.js");

const helpers = require('../test-utils/user-helper');
const { createAccessToken, customError, fakeId, id, userData, updatedUser, allUsers, loginUser, loginAdminUser, loginDetail } = helpers;

before(()=> {
  let dd = require("dotenv").config()

  let con = require("../../config")

  // console.log("dd")
  // console.log(dd)
  // console.log("dd")

  // console.log("process.env.NODE_ENV")
  // console.log(process.env.NODE_ENV)
  // console.log("process.env.NODE_ENV")

  // console.log("process.env.FIRST_ENV")
  // console.log(process.env.TEST)
  // console.log("process.env.FIRST_ENV")

  // console.log("con")
  // console.log(con)
  // console.log("con")



});


describe.skip('/user', () => {
  let loginDetail = {
    email: "adminface@test.com",
    password: "123456"
  };

  let authService;
  class AuthService {
    findByEmail() {
      return loginAdminUser;
    }
  }
  // const authService = new AuthService();


  // console.log(authService);

  // const authService = new AuthService();
  // const userService = new UserService();

  // const authServiceStub = sinon.stub(authService, "findByEmail");

  const authStub = sinon.stub();

  


  let bcryptMock = {
    compare: sinon.stub().callsFake(() => true)
  }

  const controller = proxyquire(controllerPath,
    {
      "bcryptjs": bcryptMock,
      "../services/authService": AuthService,
      // "@noCallThru": true
    }
  );

  // console.log("controller.authService")

  // console.log(serviceMocker.authService.withArgs(loginDetail.email).resolves(loginAdminUser))
  // console.log("controller.authService")


/*

  {
  CartListModel: 'CartListModel',
  CartModel: 'CartModel',
  ContactDetailModel: 'ContactDetailModel',
  OrderListModel: 'OrderListModel',
  OrderModel: 'OrderModel',
  PaymentDetailModel: 'PaymentDetailModel',
  ProductImageModel: 'ProductImageModel',
  ProductModel: 'ProductModel',
  '@noCallThru': true,
  User: {
    findByPk: [Function: functionStub],
    findOne: [Function: functionStub],
    findAll: [Function: functionStub],
    create: [Function: functionStub],
    destroy: [Function: functionStub]
  }
}
[class AuthService extends UserService]
*/

  const UserModel = {
    findByPk: sinon.stub(),
    findOne: sinon.stub(),
    findAll: sinon.stub(),
    create: sinon.stub(),
    destroy: sinon.stub()
  }

  // const User = {
  //   findByPk: sinon.stub(),
  //   findOne: sinon.stub(),
  //   findAll: sinon.stub(),
  //   create: sinon.stub(),
  //   destroy: sinon.stub()
  // }

  const mockModels = makeMockModels( { UserModel } );  
  delete Object.assign(mockModels, {['User']: mockModels['UserModel'] })['UserModel']

  // console.log(mockModels)

  const AuthServiceProxy = proxyquire(servicePath, {
    // "../models": User,
    "../models": mockModels,
    // "@noCallThru": true
  });

  // console.log(AuthService);

  // const authService = new AuthService();

  let userQuery, token, response, cookie;
  const agent = supertest(app);


  describe.only('Encompasses All', async () => {

    before(() => {
      
    })

    describe.skip('testing for /user get', () => {
      // console.log("inside describe?");
      it.only("login what is it", async () => {
        token = createAccessToken(loginAdminUser);

        // response = await agent.post("/auth/login").send(loginDetail).set("Accept", "application/json")

        // console.log("controller")
        // console.log(controller.loginRoute)
        // console.log("controller")
// 
        // controller.loginRoute()

          // .set("Cookie", `access-token=${token}`);
        authService = new AuthService();
        sinon.stub(authService, "findByEmail").withArgs(loginDetail.email).resolves(loginAdminUser)
        // userQuery = authService.findByEmail(loginDetail.email)

        // authService.findByEmail(loginDetail.email); // even if I call it the calledWith might work but response.status is still 500
      
        // userQuery.resolves(loginAdminUser);
        // console.log("response");
        // console.log(response);
        // console.log("response");

        // expect(response).to.have.been.called

        expect(authService.findByEmail).to.have.been.called; // is never called

        // expect(authService.findByEmail).to.have.been.calledWith(loginDetail.email); // is never called
        // expect(userQuery).to.have.been.called // never called
        // expect(response.status).to.deep.equal(200); // returns 500
      
      });
/*
      it('Should 200 OK when there are users', async () => {
        // const token = createAccessToken();
        // console.log("agent.cookie");
        // console.log(agent.get("/login"));
        // console.log("agent.cookie");

        response = await agent.get('/api/v2/users')
                                .set('Accept', 'application/json')
                                .set('Cookie', `access_token=${token}`)
                                .expect('Content-Type', /json/)
        // console.log(response)
        // response.get('/api/v2/users')
            // .expect(200)
        expect(response.status).to.deep.equal(200);
      });
/*
      it('returns an array', async () => {
        response = await agent.get('/api/v2/users')
          // console.log(response.body)
        expect(response.body).to.be.an('array')
      });
*/
      // after((done) => done())
    });
    
    
    describe.skip("test the all users", () => {

      it.skip("Login route??", async () => {
        // let ud = sinon.stub(authService, "findByEmail").withArgs(loginDetail.email).resolves(loginAdminUser);
        // let ss = await ud(loginDetail.email)

        // let gg = authServiceStub.withArgs(loginDetail.email).resolves(loginAdminUser);

        cookie = createAccessToken(loginUser);
        // let nn = serviceMocker.authService.withArgs(loginDetail.email).resolves(loginAdminUser)
        response = await agent.post("/auth/login")
          // .set("Cookie", [`access_token=${cookie};`])
          .send({ email: "admin@test.com", password: "123456" });

          // let oo = sinon.stub(authService, "findByEmail").withArgs(loginDetail.email);
        // console.log("controller.loginRoute")
        // console.log(controller.loginRoute)
        // console.log("controller.loginRoute")

        // let gg = oo.withArgs(loginDetail.email).resolves(loginAdminUser);
        // let something = new Something();
        // let gg = authStub.withArgs(loginDetail.email).resolves(loginAdminUser);
        // console.log(authStub)
        // console.log("authService")
        // console.log(authService)
        // console.log("authService")

        
          // .expect(201)
          // .auth("Cookie", `access_token=${cookie}`)
          // .expect(201)#
        // console.log("u before d");
        
        
        // console.log("ud");
        // console.log(ss);
        // console.log("ud");

        // expect(nn).to.have.been.called;

        // console.log("response.status");
        // console.log(response.status);
        // console.log("response.status");

        // expect(response.status).to.deep.equal(201); // does not work returns 404
        // expect(response.status).to.eql(201);
        // expect(response.header.Cookie[0]).to.eql(`access_token=${cookie};`); // shows the Cookie was set so works? but cannot get status 201
      });
// /*
      it.skip("okay", async () => {
        const middlewaresStub = {
          isAdmin: sinon.stub().callsFake((var1, var2, var3) => {
            return async (req, res, next) => {
              req.app.locals.userRole = "Administrator"
              return next();
            };
          }),
        };
        // require("../../controllers/authController")

        let ud = sinon.stub(userService, "findAllUsers");
        // ud.withArgs(loginDetail.email).resolves(allUsers);
        
        response = await agent.get("/api/v2/users", middlewaresStub)
          // .set("Content-Type", "application/json")
          // .set({Cookie: `access_token=${cookie}` })
          // .send()
          // .set("Authorization", `access_token=${cookie}; Path=/; HttpOnly;`);
        // console.log(response)
        expect(ud.withArgs(loginDetail.email)).to.have.been.called
        // expect(response.status).to.deep.equal(201);
      })
    })

    describe('/user POST', () => {
  
      const addUser = {
        email: "super@email.com",
        password: 123456,
        is_admin: false,
        first_name: "super",
        last_name: "test",
        google_id: null,
        facebook_id: null
      }

      it('New user POST REQ', async () => {
        response = await agent.post('/user')
                                .send(addUser)
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
        
        // console.log(response.body)
        const uid = response.body.uid
        expect(response.body).to.be.an('object');
        expect(response.status).to.deep.equal(201);
        expect(response.body).to.have.all.keys(
          'email',
          'password',
          'is_admin',
          'first_name',
          'last_name',
          'google_id',
          'facebook_id',
          'uid',
          'updated_at',
          'created_at');
  
        describe('/user/:id PUT', () => {
    
          it('failed to update user', async () => {
            response = await agent.put('/user/227f7843-03ef-49f8-b61c-7500c6be85e3'); // false id to test 404
            // console.log(response.body)
            expect(response.status).to.deep.equal(404);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('message')
            expect(response.body.message).to.deep.equal('Update was unsuccessful because user was not found')
          });
      
          it('update user', async () => {
            response = await agent.put(`/user/${uid}`) // correct id from POST it block
                                    .send({last_name: 'some random change a new last name made'})
                                    .set('Accept', 'application/json')
                                    .expect('Content-Type', /json/);
            // console.log(response.body)
            expect(response.status).to.deep.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('last_name')
          });
        });
  
        describe('/user/:id DELETE', () => {
  
          it('failed to delete because user was not found', async () => {
            response = await agent.delete('/user/9f309c1b-13ea-4932-9140-eac816a4ce98');
            expect(response.status).to.deep.equal(404);
          });
  
          it('delete user', async () => {
            response = await agent.delete(`/user/${uid}`);
            expect(response.status).to.deep.equal(204);
          });
        });
      })
      after(done => done())
    });
  
    describe('/user/:id GET', () => {
      
      it('successfully fetched a user', async () => {
        response = await agent.get(`/user/${id}`)
        // console.log(response.body)
        expect(response.status).to.deep.equal(200);
        expect(response.body).to.be.an('object');
      });
  
      it('failed to fetch a user', async () => {
        response = await agent.get('/user/1e06c54a-5591-4b1f-b2d4-b405d67619e1') // non existing uuid4 on purpose to make it fail
        // console.log(response.body)
        expect(response.status).to.deep.equal(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.deep.equal('User not found')
      });
    });

  })
  
}).timeout(100000);