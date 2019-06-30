const { validate } = require("../helper");

const { companyService } = require("../services");
const { Company } = require("../models");

async function create(req, res) {
  try {
    // required fields: {name: String}
    let data = req.body;

    if (validate.isEmpty(data.name)) return res.err("Заполните все поля!");

    let foundedCompany = await Company.findOne({
      name: data.name
    });

    if (!!foundedCompany)
      return res.err("Компания с таким названием уже существует!");

    let created = await companyService.create(data);

    return res.send({ message: "Компания создана!", created });
  } catch (e) {
    console.log(e);
    if (e.message) res.err(e.message);
    res.err("Ошибка сервера при создании компании");
    throw e;
  }
}

async function getAll(req, res) {
  try {
    let companies = await Company.find({});

    return res.send(companies);
  } catch (e) {
    console.log(e);
    return res.err("Ошибка сервера при получении компаний");
  }
}

module.exports = {
  create,
  getAll
};
