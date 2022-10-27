const sinon = require('sinon');

const pKey = '6a88e9b5-33a2-403f-ac3d-e86413ac101d';
const fKey = 'b1a43569-bc09-414d-86a9-273c48829fc7';

const pKey2 = '254cc386-7647-42be-aeee-8f1886e1bd07';
const fKey2 = 'af82ec9d-5a45-424b-9973-305e01667c01';

const data = {
  product_name: 'product1',
  type: 'type1',
  description: 'description1',
  price: 2,
  quantity: 2800,
  dealer_product_dpid: 'b1a43569-bc09-414d-86a9-273c48829fc7'
}

const allArrayObject = [
  {
    dpid: '6a88e9b5-33a2-403f-ac3d-e86413ac101d',
    product_name: 'product1',
    type: 'type1',
    description: 'description1',
    price: 2,
    quantity: 2800,
    created_at: "2021-10-19T09:31:36.630Z",
    updated_at: "2021-10-19T09:31:49.627Z",
    dealer_product_dpid: 'b1a43569-bc09-414d-86a9-273c48829fc7',
  },
  {
    dpid: '254cc386-7647-42be-aeee-8f1886e1bd07',
    product_name: 'product2',
    type: 'type2',
    description: 'description2',
    price: 3,
    quantity: 3000,
    created_at: "2021-10-20T09:31:36.630Z",
    updated_at: "2021-10-20T09:31:49.627Z",
    dealer_product_dpid: 'b1a43569-bc09-414d-86a9-273c48829fc7'
  }
]

const oneObject = {
  spid: '6a88e9b5-33a2-403f-ac3d-e86413ac101d',
  product_name: 'product1',
  type: 'type1',
  description: 'description1',
  price: 2,
  quantity: 2800,
  created_at: "2021-10-19T09:31:36.630Z",
  updated_at: "2021-10-19T09:31:49.627Z",
  dealer_product_dpid: 'b1a43569-bc09-414d-86a9-273c48829fc7'
}

const createObj = {
  spid: 'b1a43569-bc09-414d-86a9-273c48829fc7',
  product_name: 'product1',
  type: 'type1',
  description: 'description1',
  price: 60,
  quantity: 2800,
  created_at: '2021-10-23 17:33:13.03+00',
  updated_at: '2021-10-23 17:33:13.03+00',
}

const dealerObj = {
  dpid: 'b1a43569-bc09-414d-86a9-273c48829fc7',
  product_name: 'product1',
  type: 'type1',
  description: 'description1',
  price: 2,
  quantity: 2800,
  created_at: '2021-10-23 17:33:13.03+00',
  updated_at: '2021-10-23 17:33:13.03+00',
  dataValues: {
    dpid: 'b1a43569-bc09-414d-86a9-273c48829fc7',
    quantity: 5000
  },
  update: sinon.stub()
}

const fakeQuery = { pKey, ...data, update: sinon.stub() };


module.exports = {
  pKey,
  pKey2,
  fKey,
  fKey2,
  data,
  allArrayObject,
  oneObject,
  dealerObj,
  fakeQuery
}