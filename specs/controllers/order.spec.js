const chai = require('chai');
const { expect } = chai;
const supertest = require('supertest');
const app = require('../../server');

describe('/orders', () => {
  let response;
  const request = supertest(app);
  // console.log(request)
  it('Encompasses All', async () => {
    const prime = await request.get('/orders');
    // console.log(prime.body)
    const id = prime.body[0].oid

    const randCustomer = await request.get('/customer')
    const cid = randCustomer.body[Math.floor(Math.random() * randCustomer.body.length)].cid
    const randProduct = await request.get('/store/product');
    const spid = randProduct.body[Math.floor(Math.random() * randProduct.body.length)].spid;
    
    
    describe('testing for /orders GET', () => {

      it('Should 200 OK when there are products', async () => {
        response = await request.get('/orders')
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
            // .expect(200)
        expect(response.status).to.deep.equal(200)
      }).timeout(10000);
      it('returns an array', async () => {
        response = await request.get('/orders')
          // console.log(response.body)
        expect(response.body).to.be.an('array')
      })
      after((done) => done())
    });

    describe('testing for /orders/list GET', () => {

      it('looking for cart list 200 ok', async () => {
        response = await request.get('/orders/list')
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
            // .expect(200)
        expect(response.status).to.deep.equal(200)
      });

      it('returns the cart array', async () => {
        response = await request.get('/orders/list')
          // console.log(response.body)
        expect(response.body).to.be.an('array')
      })
      after((done) => done())
    });
  
    describe.skip('/orders POST', () => {
  
      const addCartList = [
        {
            customers_cid: cid,  
            quantity: 2,
            store_products_spid: spid
        }
      ]
  
      it('New product POST REQ', async () => {
        response = await request.post('/orders')
                                .send(addCartList)
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
        
        console.log(response.body)
        expect(response.body).to.be.an('array');
        expect(response.status).to.deep.equal(201);
      })
      after(done => done())
    });
  
    describe('/orders/:id GET', () => {
      
      it('successfully fetched a product', async () => {
        response = await request.get(`/orders/${id}`)
        // console.log(response.body) // associated array objects
        expect(response.status).to.deep.equal(200);
        expect(response.body).to.be.an('array');
      });
  
      it('failed to fetch a product', async () => {
        response = await request.get('/orders/e10ebc61-9961-4ddc-9855-3bb4fb3a1983') // non existing uuid4 on purpose to make it fail
        // console.log(response.body)
        expect(response.status).to.deep.equal(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.deep.equal('Order not found')
      });
    });
  });
  
}).timeout(100000);