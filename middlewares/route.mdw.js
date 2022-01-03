const indexRouter = require("../routes/index");
const usersRouter = require("../routes/users");

module.exports = function (app) {
  app.use("/users", usersRouter);
  app.use("/", indexRouter);
};
