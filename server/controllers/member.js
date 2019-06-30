const { memberService } = require("../services");
const { Company, Member } = require("../models");

async function create(req, res) {
  /**
   * required fields in body: { firstName: String, lastName: String, company_id: String }
   */
  try {
    let { firstName, lastName, company_id } = req.body;

    if (!firstName || !lastName || !company_id)
      return res.err("Заполните все поля");

    if (!company_id.match(/^[0-9a-fA-F]{24}$/))
      return res.err("Неверно указан id");

    let foundedCompany = await Company.findById({ _id: company_id });

    if (!foundedCompany)
      return res.err("Компании с указанным id не существует");

    let created = await memberService.create({
      firstName,
      lastName,
      company_id
    });

    res.send({ message: "Представитель успешно добавлен", created });
  } catch (e) {
    if (e.message) res.err(e.message);
    res.err("Ошибка сервера при создании модели member");
    throw e;
  }
}

async function updateData(req, res) {
  /**
   * required fields in body: { firstName: '..', lastName: '...', company_id: '...' }
   */
  try {
    let { firstName, lastName, company_id } = req.body;
    let { member_id } = req.params;
    let foundedCompany;

    if (!firstName || !lastName || !company_id)
      return res.err("Заполните все поля");

    if (!member_id.match(/^[0-9a-fA-F]{24}$/))
      return res.err("Неверно указан id представителя");

    if (!company_id.match(/^[0-9a-fA-F]{24}$/))
      return res.err("Неверно указан id компании");

    foundedCompany = await Company.findById({ _id: company_id });

    if (!foundedCompany)
      return res.err("Компании с указанным id не существует");

    let updated = await memberService.updateData({
      firstName,
      lastName,
      company_id,
      member_id
    });

    return res.send({
      message: "Данные пользователя были успешно изменены",
      updated
    });
  } catch (e) {
    console.log(e);
    if (e.message) return res.err(e.message);
    return res.err("ошибка сервера при обновлении модели member");
  }
}

async function getWithQuery(req, res) {
  try {
    let { paginateOptions } = res.locals;
    let members;
    let { company = "", search = "" } = req.query;
    let dbQuery = {
      company_id: { $regex: company },
      $or: [{ firstName: { $regex: search } }, { lastName: { $regex: search } }]
    };

    members = await Member.paginate(dbQuery, paginateOptions);

    if (members.docs.length < 1) {
      paginateOptions.page = members.totalPages;
      members = await Member.paginate(dbQuery, paginateOptions);
    }

    return res.send(members);
  } catch (e) {
    console.log(e);
    if (e.message) return res.err(e.message);
    return res.err("ошибка сервера при обновлении модели member");
  }
}

module.exports = {
  create,
  updateData,
  getWithQuery
};
