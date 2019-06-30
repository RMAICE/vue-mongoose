(async function() {
  try {
    ("use strict");
    const dotenv = require("dotenv").config();
    const express = require("express");
    const { dbConnect } = require("./models");
    const app = express();
    const controllers = require("./controllers");
    const bodyParser = require("body-parser");
    const { errors } = require("./helper");
    const paginateOptions = require("./middlewares/paginateOptions");

    await dbConnect();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(errors);

    app.post("/api/members", controllers.member.create);
    app.post("/api/companies", controllers.company.create);

    app.put("/api/members/:member_id", controllers.member.updateData);

    app.get("/api/members", paginateOptions, controllers.member.getWithQuery);
    app.get("/api/companies", controllers.company.getAll);

    app.listen(3000);
  } catch (e) {
    console.log(e);
    throw e;
  }
})();
