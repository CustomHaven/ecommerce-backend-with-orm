const chai = require('chai');
const { expect } = chai;
const supertest = require('supertest');
const app = require('../../server');

describe('/dealers', () => {
  let response;
  const request = supertest(app);
  // console.log(request)
  it('Encompasses All', async () => {
    const prime = await request.get('/dealers');
    // console.log(prime.body)
    const id = prime.body[0].uid

    describe('testing for /dealers get', () => {

      it('Should 200 OK when there are dealers/supplier', async () => {
        response = await request.get('/dealers')
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
            // .expect(200)
        expect(response.status).to.deep.equal(200)
      }).timeout(10000);
      it('returns an array', async () => {
        response = await request.get('/dealers')
          // console.log(response.body)
        expect(response.body).to.be.an('array')
      })
      after((done) => done())
    });
  
    describe('/dealers POST', () => {
  
      const addDealer = {
        name: "test",
        description: 'testdest',
      }
  
      it('New dealer/supplier POST REQ', async () => {
        response = await request.post('/dealers')
                                .send(addDealer)
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
        
        // console.log(response.body)
        const did = response.body.did
        expect(response.body).to.be.an('object');
        expect(response.status).to.deep.equal(201);
        expect(response.body).to.have.all.keys(
          'name',
          'description',
          'did',
          'updated_at',
          'created_at'
        );
  
        describe('/dealers/:id PUT', () => {
    
          it('failed to update dealer/supplier', async () => {
            response = await request.put('/dealers/227f7843-03ef-49f8-b61c-7500c6be85e3'); // false id to test 404
            // console.log(response.body)
            expect(response.status).to.deep.equal(404);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('message')
            expect(response.body.message).to.deep.equal('Update was unsuccessful because dealer/supplier was not found')
          });
      
          it('update dealer/supplier', async () => {
            response = await request.put(`/dealers/${did}`) // correct id from POST it block
                                    .send({description: 'new last test'})
                                    .set('Accept', 'application/json')
                                    .expect('Content-Type', /json/);
            // console.log(response.body)
            expect(response.status).to.deep.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('description')
          });
        });
  
        describe('/dealers/:id DELETE', () => {
  
          it('failed to delete because dealer/supplier was not found', async () => {
            response = await request.delete('/dealers/9f309c1b-13ea-4932-9140-eac816a4ce98');
            expect(response.status).to.deep.equal(404);
          });
  
          it('delete dealer/supplier', async () => {
            response = await request.delete(`/dealers/${did}`);
            expect(response.status).to.deep.equal(204);
          });
        });
      })
      after(done => done())
    });
  
    describe('/dealers/:id GET', () => {
      
      it('successfully fetched a dealer/supplier', async () => {
        response = await request.get('/dealers/80aa3c2a-4b1e-4d8d-b85a-eb5a8959d4cb')
        // console.log(response.body)
        expect(response.status).to.deep.equal(200);
        expect(response.body).to.be.an('object');
      });
  
      it('failed to fetch a dealer/supplier', async () => {
        response = await request.get('/dealers/e10ebc61-9961-4ddc-9855-3bb4fb3a1983') // non existing uuid4 on purpose to make it fail
        // console.log(response.body)
        expect(response.status).to.deep.equal(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.deep.equal('Dealer/Supplier was not found')
      });
    });
  })


  
}).timeout(100000);