const sinon = require('sinon');

const orderKey = 'ac8ddb25-ba09-435d-99e1-692aa424a8b4';
const customerKey = '74c08f49-b763-440e-b484-4571b942f400';

const itemKey1 = '939ac186-4526-42bd-af15-dc3d65518cfc';
const itemKey2 = 'bcf338f5-b135-4031-beb0-9a73c4af2aba';
const itemKey3 = 'c0981e93-54f4-4a6a-bc1a-acf0f5ea1f52';


const dataArray = [
  {
    customers_cid: '74c08f49-b763-440e-b484-4571b942f400',      
    quantity: 3,
    store_products_spid: '939ac186-4526-42bd-af15-dc3d65518cfc',
    price: 65.7
  },
  {
    customers_cid: '74c08f49-b763-440e-b484-4571b942f400',      
    quantity: 2,
    store_products_spid: 'bcf338f5-b135-4031-beb0-9a73c4af2aba',
    price: 11.94
  },
  {
    customers_cid: '74c08f49-b763-440e-b484-4571b942f400',      
    quantity: 5,
    store_products_spid: 'c0981e93-54f4-4a6a-bc1a-acf0f5ea1f52',
    price: 23.1
  }
]

const customerArray = {
  update: sinon.stub(),
  data: [
  {
    dataValues: {
      cid: "74c08f49-b763-440e-b484-4571b942f400",
      first_name: "john",
      last_name: "doe",
      address: "10 downing street",
      zip_code: "sw1a 2aa",
      city: "london",
      country: "uk",
      email: "john@fake.com",
      created_at: "2021-10-25T15:38:29.000Z",
      updated_at: "2021-10-25T15:38:29.000Z"
    },
  },
  {
    dataValues: {
      cid: "74c08f49-b763-440e-b484-4571b942f400",
      first_name: "john",
      last_name: "doe",
      address: "10 downing street",
      zip_code: "sw1a 2aa",
      city: "london",
      country: "uk",
      email: "john@fake.com",
      created_at: "2021-10-25T15:38:29.000Z",
      updated_at: "2021-10-25T15:38:29.000Z"
    }
  },
  {
    dataValues: {
      cid: "74c08f49-b763-440e-b484-4571b942f400",
      first_name: "john",
      last_name: "doe",
      address: "10 downing street",
      zip_code: "sw1a 2aa",
      city: "london",
      country: "uk",
      email: "john@fake.com",
      created_at: "2021-10-25T15:38:29.000Z",
      updated_at: "2021-10-25T15:38:29.000Z"
    }
  }
]}

const storeProductArray = {
  update: sinon.stub(),
  data: [
  {
    dataValues: {
      spid: "939ac186-4526-42bd-af15-dc3d65518cfc",
      product_name: "chicken and rice",
      type: "food",
      description: "chiken",
      price: "21.90",
      quantity: 500,
      created_at: "2021-10-25 19:37:03.162+00",
      updated_at: "2021-10-25 19:37:03.162+00",
      dealer_product_dpid: "49222d45-5ae0-49a1-8ba1-8fd202ca9f43"
    }
  },
  {
    dataValues: {
      spid: "bcf338f5-b135-4031-beb0-9a73c4af2aba",
      product_name: "product2",
      type: "food",
      description: "descriptionchiken",
      price: "5.97",
      quantity: 310,
      created_at: "2021-10-25 19:33:03.162+00",
      updated_at: "2021-10-25 19:33:03.162+00",
      dealer_product_dpid: "bb254a04-184a-4d7a-b60a-5d026c34cd0f"
    }
  },
  {
    dataValues: {
      spid: "c0981e93-54f4-4a6a-bc1a-acf0f5ea1f52",
      product_name: "product3",
      type: "food",
      description: "descriptionproduct3",
      price: "4.62",
      quantity: 170,
      created_at: "2021-10-25 19:30:03.162+00",
      updated_at: "2021-10-25 19:30:03.162+00",
      dealer_product_dpid: "d020bd58-24af-4e79-9f95-ab6e0a2c39cf"
    }
  }
]}

const listArray = [
  {
    customers_cid: "74c08f49-b763-440e-b484-4571b942f400",
    quantity: 3,
    store_products_spid: "939ac186-4526-42bd-af15-dc3d65518cfc",
    price: 65.70,
    updated_at: "2021-10-31T19:32:33.000Z",
    created_at: "2021-10-31T19:32:33.000Z"
  },
  {
    customers_cid: "74c08f49-b763-440e-b484-4571b942f400",
    quantity: 2,
    store_products_spid: "bcf338f5-b135-4031-beb0-9a73c4af2aba",
    price: 11.94,
    updated_at: "2021-10-31T19:32:33.000Z",
    created_at: "2021-10-31T19:32:33.000Z"
  },
  {
    customers_cid: "74c08f49-b763-440e-b484-4571b942f400",
    quantity: 5,
    store_products_spid: "c0981e93-54f4-4a6a-bc1a-acf0f5ea1f52",
    price: 23.10,
    updated_at: "2021-10-31T19:32:33.000Z",
    created_at: "2021-10-31T19:32:33.000Z"
  },
]

const finalPrice = [65.70, 11.94, 23.10];

const orderObject = {
  dataValues: {
    oid: "ac8ddb25-ba09-435d-99e1-692aa424a8b4",
    status_completed: true,
    final_price: "100.74",
    customers_cid: "74c08f49-b763-440e-b484-4571b942f400",
    updated_at: "2021-10-31T19:32:36.000Z",
    created_at: "2021-10-31T19:32:36.000Z"
  }
}

const orderArray = [
  {
    dataValues: {
      oid: "ac8ddb25-ba09-435d-99e1-692aa424a8b4",
      status_completed: true,
      final_price: "100.74",
      customers_cid: "74c08f49-b763-440e-b484-4571b942f400",
      updated_at: "2021-10-31T19:32:36.000Z",
      created_at: "2021-10-31T19:32:36.000Z"
    }
  },
  {
    dataValues: {
      oid: "bb307a5c-709a-45a5-8641-fb8cb8b3f5ac",
      status_completed: true,
      final_price: "114.60",
      customers_cid: "1562c10e-f6e6-468c-87e0-52778ce5b598",
      updated_at: "2021-11-01T01:32:36.000Z",
      created_at: "2021-11-01T01:32:36.000Z"
    }
  }
]


const finalArray = [
  {
    customers_cid: "74c08f49-b763-440e-b484-4571b942f400",
    quantity: 3,
    store_products_spid: "939ac186-4526-42bd-af15-dc3d65518cfc",
    price: "65.70",
    updated_at: "2021-10-31T19:32:33.000Z",
    created_at: "2021-10-31T19:32:33.000Z"
  },
  {
    customers_cid: "74c08f49-b763-440e-b484-4571b942f400",
    quantity: 2,
    store_products_spid: "bcf338f5-b135-4031-beb0-9a73c4af2aba",
    price: "11.94",
    updated_at: "2021-10-31T19:32:33.000Z",
    created_at: "2021-10-31T19:32:33.000Z"
  },
  {
    customers_cid: "74c08f49-b763-440e-b484-4571b942f400",
    quantity: 5,
    store_products_spid: "c0981e93-54f4-4a6a-bc1a-acf0f5ea1f52",
    price: "23.10",
    updated_at: "2021-10-31T19:32:33.000Z",
    created_at: "2021-10-31T19:32:33.000Z"
  },
  {
    oid: "ac8ddb25-ba09-435d-99e1-692aa424a8b4",
    status_completed: true,
    final_price: "100.74",
    customers_cid: "74c08f49-b763-440e-b484-4571b942f400",
    updated_at: "2021-10-31T19:32:36.000Z",
    created_at: "2021-10-31T19:32:36.000Z"
  }
]

const foundOrders = [
  {
    cid: "1562c10e-f6e6-468c-87e0-52778ce5b598",
    first_name: "john",
    last_name: "doe",
    address: "buckingham palace",
    zip_code: "sw1a 2bb",
    city: "london",
    country: "uk",
    email: "fake@fake.com",
    created_at: "2021-10-25T16:42:00.001Z",
    updated_at: "2021-10-25T16:42:00.001Z",
    StoreProducts: [
        {
            spid: "4b8baad6-0a13-46fc-a2b6-1a20f5ac3c57",
            product_name: "product1",
            type: "type1",
            description: "description1",
            price: "10.50",
            quantity: 200,
            created_at: "2021-10-25T19:24:33.391Z",
            updated_at: "2021-11-01T01:16:37.000Z",
            dealer_product_dpid: "e1efac43-4025-41c8-9c05-af76122ec4dd",
            OrderList: {
                quantity: 10,
                price: "105.00",
                created_at: "2021-11-01T01:16:37.000Z",
                updated_at: "2021-11-01T01:16:37.000Z",
                customers_cid: "1562c10e-f6e6-468c-87e0-52778ce5b598",
                store_products_spid: "4b8baad6-0a13-46fc-a2b6-1a20f5ac3c57"
            }
        },
        {
            spid: "fd2f85f9-14c7-43c4-a843-2a5a21cf39e4",
            product_name: "product2",
            type: "type2",
            description: "description2",
            price: "4.80",
            quantity: 598,
            created_at: "2021-10-24T19:28:55.795Z",
            updated_at: "2021-11-01T01:16:37.000Z",
            dealer_product_dpid: "f7ae4e15-bb10-413b-a9c7-ed771896581f",
            OrderList: {
                quantity: 2,
                price: "9.60",
                created_at: "2021-11-01T01:16:37.000Z",
                updated_at: "2021-11-01T01:16:37.000Z",
                customers_cid: "1562c10e-f6e6-468c-87e0-52778ce5b598",
                store_products_spid: "fd2f85f9-14c7-43c4-a843-2a5a21cf39e4"
            }
        }
    ]
  },
  {
      oid: "bb307a5c-709a-45a5-8641-fb8cb8b3f5ac",
      status_completed: true,
      final_price: "114.60",
      created_at: "2021-11-01T01:16:38.000Z",
      updated_at: "2021-11-01T01:16:38.000Z",
      customers_cid: "1562c10e-f6e6-468c-87e0-52778ce5b598"
  }
]

module.exports = {
  orderKey,
  customerKey,
  itemKey1,
  itemKey2,
  itemKey3,
  dataArray,
  customerArray,
  storeProductArray,
  listArray,
  finalPrice,
  orderObject,
  orderArray,
  finalArray,
  foundOrders
}