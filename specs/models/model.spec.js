const chai = require("chai");
const sinonChai = require("sinon-chai");
const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists,
    checkUniqueIndex,
    checkHookDefined
} = require('sequelize-test-helpers');

chai.should();
chai.use(sinonChai)

const UserModel = require('../../models/UserModel');
const ContactDetailModel = require("../../models/ContactDetailModel");
const ProductModel = require("../../models/ProductModel");
const ProductImageModel = require("../../models/ProductImageModel");
const CartModel = require("../../models/CartModel");
const CartListModel = require("../../models/CartListModel");
const OrderModel = require("../../models/OrderModel");
const OrderListModel = require("../../models/OrderListModel");
const PaymentDetailModel = require("../../models/PaymentDetailModel"); 



describe('/models/all', async () => {
  // Users

  const User = UserModel(sequelize, dataTypes, sequelize.literal)
  const user = new User()
  // user= spy();
  // ContactDetail
  const ContactDetail = ContactDetailModel(sequelize, dataTypes, sequelize.literal);
  const contactDetail = new ContactDetail();
  // Product
  const Product = ProductModel(sequelize, dataTypes, sequelize.literal);
  const product = new Product();
  // ProductImage
  const ProductImage = ProductImageModel(sequelize, dataTypes, sequelize.literal);
  const productImage = new ProductImage();

  // Cart
  const Cart = CartModel(sequelize, dataTypes, sequelize.literal);
  const cart = new Cart();
  // CartLists
  const CartList = CartListModel(sequelize, dataTypes, sequelize.literal);
  const cartList = new CartList();

  // Orders
  const Order = OrderModel(sequelize, dataTypes, sequelize.literal);
  const order = new Order();
  // OrderLists
  const OrderList = OrderListModel(sequelize, dataTypes, sequelize.literal);
  const orderList = new OrderList();


  // PaymentDetail
  const PaymentDetail = PaymentDetailModel(sequelize, dataTypes, sequelize.literal);
  const paymentDetail = new PaymentDetail();    

  describe('/models/UserModel', async () => {
    checkModelName(User)('User')

    describe('check all properties exist', () => {
      ['is_admin', 'first_name', 'last_name', 'email', 'google_id', 'facebook_id'].forEach(checkPropertyExists(user))
    }) 

    // /*

    describe('check if unique constraint is working', () => {
      context('unique', () => {
        ['email'].forEach(checkUniqueIndex(user));
      });
    });

    context('Has Hook User', () => {
      ;['beforeCreate', 'beforeUpdate'].forEach(checkHookDefined(user));
    });

    describe('check associations FKEYs', () => {

      before(() => {
        User.associate( { Cart, Order, ContactDetail, PaymentDetail }  )
      });
      it('defined a hasMany association with Cart', () => {
        chai.expect(User.hasMany).to.have.been.calledWith(Cart)
      });
      it('defined a hasOne association with ContactDetail', () => {
        chai.expect(User.hasOne).to.have.been.calledWith(ContactDetail)
      })
    })
  });

  describe('/models/ContactDetailModel', async () => {

    checkModelName(ContactDetail)("ContactDetail");
    
    describe('check all properties exist', () => {
        ["id", "address_line1", "address_line2", "town_city", "zip_code", "country"].forEach(checkPropertyExists(contactDetail));
    });

    context('Has Hook ContactDetail', () => {
      ;['beforeCreate', 'beforeUpdate'].forEach(checkHookDefined(contactDetail));
    });

    describe('check associations FKEYs', () => {

      before(() => {
        ContactDetail.associate( { User }  )
      });
      it('defined a belongsTo association with User', () => {
        chai.expect(ContactDetail.belongsTo).to.have.been.calledWith(User)
      });
    })
  });

  describe('/models/ProductModel', async () => {

    checkModelName(Product)('Product');

    
    describe('check all properties exist', () => {
        ["id", "source", "product_name", "type", "description", "price", "quantity"].forEach(checkPropertyExists(product))
    })

    context('Has Hook Product', () => {
      ;['beforeCreate', 'beforeUpdate'].forEach(checkHookDefined(product));
    });

    describe('check associations Fkeys', () => {

      before(() => {
        Product.associate( { ProductImage, CartList, OrderList }  )
      });
      it('defined a hasMany association with Product', () => {
        chai.expect(Product.hasMany).to.have.been.calledWith(ProductImage);
      });
    });
  });

  describe('/models/ProductImageModel', async () => {

    checkModelName(ProductImage)("ProductImage");

    describe('check all properties exist', () => {
        ["id", "image_name", "image_data"].forEach(checkPropertyExists(productImage))
    });

    context('Has Hook ProductImage', () => {
      ;['beforeCreate', 'beforeUpdate'].forEach(checkHookDefined(productImage));
    });

    describe('check associations Fkeys', () => {

      before(() => {
        ProductImage.associate( { Product }  )
      });
      it('defined a belongsTo association with Product', () => {
        chai.expect(ProductImage.belongsTo).to.have.been.calledWith(Product)
      });
    });
  });

  describe('/models/CartModel', async () => {

    checkModelName(Cart)('Cart');

    describe('check all properties exist', () => {
        ["id", "abandoned"].forEach(checkPropertyExists(cart))
    });

    context('Has Hook Cart', () => {
      ;['beforeCreate', 'beforeUpdate'].forEach(checkHookDefined(cart));
    });

    describe('check associations Fkeys', () => {

      before(() => {
        Cart.associate( { User, CartList, Order}  )
      });
      it('defined a hasMany association with Order', () => {
        chai.expect(Cart.hasMany).to.have.been.calledWith(Order);
      });
      it('defined a belongsTo association with User', () => {
        chai.expect(Cart.belongsTo).to.have.been.calledWith(User, {
          foreignKey: 'user_id',
          onDelete: "CASCADE"
        })
      });
    });
  });

  describe('/models/CartListModel', async () => {

    checkModelName(CartList)('CartList')

    describe('check all properties exist', () => {
        ["id", "quantity"].forEach(checkPropertyExists(cartList))
    });

    context('Has Hook CartList', () => {
      ;['beforeCreate', 'beforeUpdate'].forEach(checkHookDefined(cartList));
    });

    describe('check associations Fkeys', () => {

      before(() => {
        CartList.associate( { Cart, Product }  );
      });
      it('defined a belongsTo association with Cart', () => {
        chai.expect(CartList.belongsTo).to.have.been.calledWith(Cart, {
          foreignKey: {
            name: "cart_id",
            allowNull: false
          },
          onDelete: "CASCADE",
        });
      });
      it('defined a belongsTo association with Product', () => {
        chai.expect(CartList.belongsTo).to.have.been.calledWith(Product, {
          foreignKey: {
            name: 'product_id',
            allowNull: false
          },
          onDelete: "CASCADE"
        });
      });
    });
  });

  describe('/models/OrderModel', async () => {

    checkModelName(Order)('Order');
    
    describe('check all properties exist', () => {
        ["id", "shipping_status", "final_price", "total_items", "tracking_id"].forEach(checkPropertyExists(order))
    });

    context('Has Hook Order', () => {
      ;['beforeCreate', 'beforeUpdate'].forEach(checkHookDefined(order));
    });

    describe('check associations Fkeys', () => {

      before(() => {
        Order.associate( { OrderList, Cart, User }  )
      });
      it('defined a belongsTo association with Cart', () => {
        chai.expect(Order.belongsTo).to.have.been.calledWith(Cart, {
          foreignKey: "cart_id",
          onDelete: "CASCADE"
        });
      });
      it('defined a belongsTo association with User', () => {
        chai.expect(Order.belongsTo).to.have.been.calledWith(User, {
          foreignKey: {
            name: "user_id",
            allowNull: false
          },
          onDelete: "CASCADE"
        });
      });
      it('defined a hasMany association with OrderList', () => {
        chai.expect(Order.hasMany).to.have.been.calledWith(OrderList, {
          foreignKey: 'order_id',
          allowNull: false
        });
      });

    });
  });

  describe('/models/OrderListModel', async () => {

    checkModelName(OrderList)('OrderList')

    describe('check all properties exist', () => {
        ["id", "quantity", "price"].forEach(checkPropertyExists(orderList))
    });

    context("Has Hook OrderList", () => {
      ;["beforeCreate", "beforeUpdate"].forEach(checkHookDefined(orderList));
    });


    describe('check associations Fkeys', () => {

      before(() => {
        OrderList.associate( { Order, Product }  );
      });
      it('defined a belongsTo association with Order', () => {
        chai.expect(OrderList.belongsTo).to.have.been.calledWith(Order, {
          foreignKey: "order_id",
          allowNull: false,
          onDelete: "CASCADE",
        });
      });
      it('defined a belongsTo association with Product', () => {
        chai.expect(OrderList.belongsTo).to.have.been.calledWith(Product, {
          foreignKey: {
            name: "product_id",
            allowNull: false
          },
          onDelete: "CASCADE",
        });
      });
    });
  });


  describe('/models/PaymentDetailModel', async () => {

    checkModelName(PaymentDetail)('PaymentDetail')
    
    describe('check all properties exist', () => {
        ["id", "name_on_card", "card_type", "card_number", "expiry_date", "cvv"].forEach(checkPropertyExists(paymentDetail))
    });

    context("Has Hook PaymentDetail", () => {
      ;["beforeCreate", "beforeUpdate"].forEach(checkHookDefined(paymentDetail));
    });


    describe('check associations Fkeys', () => {

      before(() => {
        PaymentDetail.associate( { User }  );
      });
      it('defined a belongsTo association with User', () => {
        chai.expect(PaymentDetail.belongsTo).to.have.been.calledWith(User, {
          foreignKey: {
            name: "user_id",
            allowNull: false
          },
          onDelete: "CASCADE"
        });
      });
    });
  });

});