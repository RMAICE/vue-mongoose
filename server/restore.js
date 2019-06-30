const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const dotenv = require("dotenv").config();

async function restore() {
  let dbPath = path.resolve("./server/database/");

  await exec(`mongorestore -d ${process.env.DB_NAME} ${dbPath}`);
}

restore();
