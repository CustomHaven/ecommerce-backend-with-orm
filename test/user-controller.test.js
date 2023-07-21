const supertest = require("supertest");
const app = require('../server.js');
const proxyquire = require("proxyquire");
const path = require("path");
const AuthService = require("../services/authService.js");
const db = require("../db");
const Models = require("../models")

beforeAll(() => {
    // env var for this?
    return db.sync({ force: true }).then(() => {
        console.log("Database Sync for testing")
    })
});

// beforeEach(() => {
//     return Models.User.destroy({ truncate: true })
// })

describe('POST /users', () => { 
    const agent = supertest(app);
    let response, bodyData, proxy;
    const authService = new AuthService();
    describe("given an email and password", () => {

        // "should save the email and password to the database"


        test("async it test", async (done) => {
            response = agent.post("/auth/users").send({
                email: "test@email.com",
                password: "password"
            }).then(res => {
                // let user = authService.addUser()
                expect(res.statusCode).toBe(200)
                done();
            });
        })

            // class authClass {
            //     findByEmail(email) {
            //         return loginAdminUser
            //     }
            // }
    
            // authClass["@noCallThru"] = true

            // proxy = proxyquire(path.resolve("./controllers/authController.js"), {
            //     "../services/authService": authClass
            // });

            // console.log("proxy")
            // console.log(proxy)
            // console.log("proxy")

        });

/*
        test("should respond with status 200", () => {
            expect(response.statusCode).toBe(200);
        });

        test("should specify json in the content type header", () => {
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        });

        test("should respond with a json with the user.id", () => {
            expect(response.body.userId).toBeDefined();
        });

    });
*/
/*
    describe("when the email or password is missing", () => {
        
        test("should respond with status 400", async () => {

            bodyData = [
                {email: "test@email.com"},
                {password: "password"},
                {}
            ]

            for (const body of bodyData) {
                response = await agent.post("/auth/users").send(body);
                expect(response.statusCode).toBe(400);
            }
        });
        // 
    })
    */
});


// "mocha": "^9.1.2",