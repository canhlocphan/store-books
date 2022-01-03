module.exports = function () {
  const mongoose = require("mongoose");
  mongoose.connect(
    process.env.DB_URL || "mongodb+srv://tanlan:LVxL9yZ5amda5e@cluster0.nf923.mongodb.net/BookStore?retryWrites=true&w=majority",
    { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }
  );

  //Ép Mongoose sử dụng thư viện promise toàn cục
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("connecting to server success");
  });
}