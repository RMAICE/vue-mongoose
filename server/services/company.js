const { Company } = require("../models");

async function create(data) {
  try {
    let company = new Company({
      name: data.name
    });
    await company.save();
    return company;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  create
  // update,
  // kill
};
