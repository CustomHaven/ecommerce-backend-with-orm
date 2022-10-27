const authRouter = require("./auth");
const userRouter = require("./users");
const contactRouter = require("./contact_details");
const productRouter = require("./products");
const productImageRouter = require("./product_images");
const cartRouter = require("./carts");
const cartListRouter = require("./cartList");
const orderRouter = require("./orders");
const orderListRouter = require("./orderList");
const paymentRouter = require("./payment");

module.exports = (app) => {

  authRouter(app);
  userRouter(app);
  contactRouter(app);
  productRouter(app);
  productImageRouter(app);
  cartRouter(app);
  cartListRouter(app);
  orderRouter(app);
  orderListRouter(app);
  paymentRouter(app);

  return app
}