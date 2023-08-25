const authRouter = require("./auth");
const userRouter = require("./users");
const contactRouter = require("./contact_details");
const productRouter = require("./products");
const productImageRouter = require("./product_images");
const productBannerImageRouter = require("./product_banner_images");
const cartRouter = require("./carts");
const cartListRouter = require("./cartList");
const orderRouter = require("./orders");
const orderListRouter = require("./orderList");
const paymentRouter = require("./payment");
const legalRouter = require("./legals");
// const bgRemoverRouter = require("./bgRemover");

module.exports = (app) => {
  authRouter(app);
  userRouter(app);
  contactRouter(app);
  productRouter(app);
  productBannerImageRouter(app);
  productImageRouter(app);
  cartRouter(app);
  cartListRouter(app);
  orderRouter(app);
  orderListRouter(app);
  paymentRouter(app);
  legalRouter(app);
  // bgRemoverRouter(app);

  return app
}