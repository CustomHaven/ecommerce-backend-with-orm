const chai = require('chai');
const { expect } = chai;
const supertest = require('supertest');
const app = require('../../server.js');

describe('/dealer/product', () => {
  let response;
  const request = supertest(app);
  // console.log(request)
  it('Encompasses All', async () => {
    const prime = await request.get('/dealer/product');
    // console.log(prime.body)
    const id = prime.body[0].dpid
    const fKey = prime.body[0].dealers_did


    describe.only('testing for /dealer/product GET', () => {

      it('Should 200 OK when there are dealers/supplier', async () => {
        response = await request.get('/dealer/product')
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
            // .expect(200)
        expect(response.status).to.deep.equal(200)
      }).timeout(10000);
      it('returns an array', async () => {
        response = await request.get('/dealer/product')
          // console.log(response.body)
        expect(response.body).to.be.an('array')
      })
      after((done) => done())
    });
  
    describe('/dealer/product POST', () => {
  
      const addProduct = {
        product_name: 'testproduct',
        type: 'test',
        description: 'description1',
        price: 3.33,
        quantity: 3900,
        dealers_did: fKey
      }
  
      it('New dealer/supplier POST REQ', async () => {
        response = await request.post('/dealer/product')
                                .send(addProduct)
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
        
        // console.log(response.body)
        const dpid = response.body.dpid
        expect(response.body).to.be.an('object');
        expect(response.status).to.deep.equal(201);
        expect(response.body).to.have.all.keys(
          'product_name',
          'type',
          'description',
          'price',
          'quantity',
          'dealers_did',
          'dpid',
          'updated_at',
          'created_at'
        );
  
        describe('/dealer/product/:id PUT', () => {
    
          it('failed to update dealer/supplier', async () => {
            response = await request.put('/dealer/product/227f7843-03ef-49f8-b61c-7500c6be85e3'); // false id to test 404
            // console.log(response.body)
            expect(response.status).to.deep.equal(404);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('message')
            expect(response.body.message).to.deep.equal('Update was unsuccessful because product was not found')
          });
      
          it('update dealer/supplier', async () => {
            response = await request.put(`/dealer/product/${dpid}`) // correct id from POST it block
                                    .send({description: 'new last test'})
                                    .set('Accept', 'application/json')
                                    .expect('Content-Type', /json/);
            // console.log(response.body)
            expect(response.status).to.deep.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('description')
          });
        });
  
        describe('/dealer/product/:id DELETE', () => {
  
          it('failed to delete because dealer/supplier was not found', async () => {
            response = await request.delete('/dealer/product/9f309c1b-13ea-4932-9140-eac816a4ce98');
            expect(response.status).to.deep.equal(404);
          });
  
          it('delete dealer/supplier', async () => {
            response = await request.delete(`/dealer/product/${dpid}`);
            expect(response.status).to.deep.equal(204);
          });
        });
      })
      after(done => done())
    });
  
    describe('/dealer/product/:id GET', () => {
      
      it('successfully fetched a dealer/supplier', async () => {
        response = await request.get(`/dealer/product/${id}`)
        // console.log(response.body)
        expect(response.status).to.deep.equal(200);
        expect(response.body).to.be.an('object');
      });
  
      it('failed to fetch a dealer/supplier', async () => {
        response = await request.get('/dealer/product/e10ebc61-9961-4ddc-9855-3bb4fb3a1983') // non existing uuid4 on purpose to make it fail
        // console.log(response.body)
        expect(response.status).to.deep.equal(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.deep.equal('Product not found')
      });
    });
  });
  
}).timeout(100000);