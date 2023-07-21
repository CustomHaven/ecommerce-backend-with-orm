"use strict";
const _ = require("lodash");
const path = require("path");
const proxyquire = require("proxyquire").noCallThru().noPreserveCache();
const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
// const AuthServiceOriginalClass = require("../../services/authService");
const supertest = require('supertest');
const app = require('../../server.js');


// console.log("auth-controller.spec")

const { createAccessToken, customError, fakeId, id, userData, updatedUser, allUsers, loginUser, loginAdminUser, loginDetail } = require("../test-utils/user-helper");
// const jwtGenerator = require("../../utils/jwtGenerator");

const controllerPath = path.resolve('./controllers/authController.js');
const servicePath = path.resolve('./services/userService.js')

describe.only("Testing the Auth controller", () => {

    describe("login route", () => {
        let authTry, proxy, authService, bcryptStub, fakeCallback, fakeReq, fakeRes, fakeNext, resolveFn, token;

        let result, bcryptStubbing, response;

        class UserServiceMock {
            async findByEmail(email) {
                try {
                    if (email) {
                        return loginAdminUser;
                    }
                } catch (error) {
                    throw error;
                }
            }
        }

        class AuthServiceMock extends UserServiceMock {};

        bcryptStub = {
            compare: function() { return true }
        };

        let tokeen = (notSure) => {
            return createAccessToken(notSure);
        }

        // token = sinon.mock(createAccessToken(loginAdminUser)); // ?? which 1 to use?
        token = sinon.spy(createAccessToken); // ?? which 1 to use?
        // token = sinon.stub(createAccessToken); //?? which 1 to use?

        proxy = proxyquire(controllerPath, {
            "../services/authService.js": AuthServiceMock,
            // "../services/authService.js": AuthServiceOriginalClass,
            "bcryptjs": bcryptStub,
            "../utils/jwtGenerator": token,
            // "@noCallThru": true
        });

        before("Stub my methods", () => {

            authService = new AuthServiceMock();
            // If I call the entire loginRoute I want this stub authTry to be called inside of it and resolve that object value
            authTry = sinon.stub(authService, "findByEmail").withArgs(loginDetail.email).resolves(loginAdminUser); 


            bcryptStubbing = sinon.stub(bcryptStub, "compare").resolves(true); // force it to return true as that seems to be like the code of authController.js

            // sinon.stub(token, "createAccessToken")
        });

        before("call the function loginRoute", async () => {
            // fakeCallback = new Promise((res, rej) => {
            //     resolveFn = res
            // });
            
            fakeReq = {
                body: {
                    email: loginDetail.email,
                    password: loginDetail.password
                }
            };

            fakeRes = {
                // /*
                cookie: sinon.spy(), // TypeError: res.cookie is not a function
                status: sinon.spy(), // TypeError: res.status is not a function
                json: sinon.spy() // TypeError: res.json is not a function
                // */
            }

            fakeNext = sinon.stub();
            response = await proxy.loginRoute(fakeReq, fakeReq, fakeNext).then((_result) => {
                result = _result;
            });
            // console.log("result")
            // console.log(result) // undefined
            // console.log("result")

        });

        after(() => {
            sinon.reset();
            sinon.restore();
        });

        it("login route test if the stubs are called", async () => {
            expect(authService.findByEmail).to.have.been.called // never called
            // expect(bcryptStubbing).to.have.been.called // never called
            // expect(response.status).to.deep.equal(200); // doesn't work
        }).timeout(10000);


    })
})