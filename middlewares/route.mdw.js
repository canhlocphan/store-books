const indexRouter = require("../routes/index");
const usersRouter = require("../routes/users");
const booksRouter = require("../routes/books");
const cartRouter = require("../routes/cart");

module.exports = function (app) {
  app.use("/book", booksRouter);
  app.use("/users", usersRouter);
  app.use("/cart", cartRouter);
  app.use("/", indexRouter);
};
