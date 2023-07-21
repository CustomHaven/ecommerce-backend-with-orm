const chai = require('chai');
const { expect } = chai;
const supertest = require('supertest');
const app = require('../../server.js');

describe('/customer', () => {
  let response;
  const request = supertest(app);
  // console.log(request)

  it('Encompasses All', async () => {
    const prime = await request.get('/customer');
    // console.log(prime.body)
    const id = prime.body[0].cid


    describe('testing for /customer get', () => {

      it('Should 200 OK when there are customers', async () => {
        response = await request.get('/customer')
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
            // .expect(200)
        expect(response.status).to.deep.equal(200)
      }).timeout(10000);
      it('returns an array', async () => {
        response = await request.get('/customer')
          // console.log(response.body)
        expect(response.body).to.be.an('array')
      })
      after((done) => done())
    });
  
    describe('/customer POST', () => {
  
      const addCustomer = {
        first_name: "super",
        last_name: "test",
        address: 'testaddress',
        zip_code: 'sw1a 3aa',
        city: 'london',
        country: 'england',
        email: "super@email.com"
      }
  
      it('New customer POST REQ', async () => {
        response = await request.post('/customer')
                                .send(addCustomer)
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
        
        // console.log(response.body)
        const cid = response.body.cid
        expect(response.body).to.be.an('object');
        expect(response.status).to.deep.equal(201);
        expect(response.body).to.have.all.keys(
          'first_name',
          'last_name',
          'address',
          'zip_code',
          'city',
          'country',
          'email',
          'cid',
          'updated_at',
          'created_at');
  
        describe('/customer/:id PUT', () => {
    
          it('failed to update customer', async () => {
            response = await request.put('/customer/227f7843-03ef-49f8-b61c-7500c6be85e3'); // false id to test 404
            // console.log(response.body)
            expect(response.status).to.deep.equal(404);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('message')
            expect(response.body.message).to.deep.equal('Update was unsuccessful because customer was not found')
          });
      
          it('update customer', async () => {
            response = await request.put(`/customer/${cid}`) // correct id from POST it block
                                    .send({last_name: 'new last test'})
                                    .set('Accept', 'application/json')
                                    .expect('Content-Type', /json/);
            // console.log(response.body)
            expect(response.status).to.deep.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('last_name')
          });
        });
  
        describe('/customer/:id DELETE', () => {
  
          it('failed to delete because customer was not found', async () => {
            response = await request.delete('/customer/9f309c1b-13ea-4932-9140-eac816a4ce98');
            expect(response.status).to.deep.equal(404);
          });
  
          it('delete customer', async () => {
            response = await request.delete(`/customer/${cid}`);
            expect(response.status).to.deep.equal(204);
          });
        });
      })
      after(done => done())
    });
  
    describe('/customer/:id GET', () => {
      
      it('successfully fetched a customer', async () => {
        response = await request.get(`/customer/${id}`)
        // console.log(response.body)
        expect(response.status).to.deep.equal(200);
        expect(response.body).to.be.an('object');
      });
  
      it('failed to fetch a customer', async () => {
        response = await request.get('/customer/e10ebc61-9961-4ddc-9855-3bb4fb3a1983') // non existing uuid4 on purpose to make it fail
        // console.log(response.body)
        expect(response.status).to.deep.equal(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.deep.equal('Customer not found')
      });
    });
  })
  
}).timeout(100000);