const indexRouter = require("../routes/index");
const usersRouter = require("../routes/users");
const booksRouter = require("../routes/books");

module.exports = function (app) {
  app.use("/book", booksRouter);
  app.use("/users", usersRouter);
  app.use("/", indexRouter);
};
