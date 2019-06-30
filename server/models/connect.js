const mongoose = require("mongoose");
let db = mongoose.connection;

module.exports = async function() {
  return new Promise(function(resolve, reject) {
    mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    db.on("error", err => {
      console.log("db connection error:" + err);

      setTimeout(() => {
        dbConnect();
      }, 5000);
    });
    db.once("open", () => {
      console.log("db connect success");
      resolve(true);
    });
  });
};
