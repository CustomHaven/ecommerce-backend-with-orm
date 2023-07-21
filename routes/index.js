const authRouter = require("./auth.js");
const userRouter = require("./users.js");
const contactRouter = require("./contact_details.js");
const productRouter = require("./products.js");
const productImageRouter = require("./product_images.js");
const productBannerImageRouter = require("./product_banner_images.js");
const cartRouter = require("./carts.js");
const cartListRouter = require("./cartList.js");
const orderRouter = require("./orders.js");
const orderListRouter = require("./orderList.js");
const paymentRouter = require("./payment.js");
// const bgRemoverRouter = require("./bgRemover.js");

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
  // bgRemoverRouter(app);

  return app
}