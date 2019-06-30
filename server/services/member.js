const { Member } = require("../models");

async function create(data) {
  try {
    let member = new Member({
      firstName: data.firstName,
      lastName: data.lastName,
      company_id: data.company_id
    });

    await member.save();

    return member;
  } catch (e) {
    throw e;
  }
}

async function updateData({ firstName, lastName, company_id, member_id }) {
  try {
    let member = await Member.findByIdAndUpdate(
      { _id: member_id },
      {
        $set: {
          firstName,
          lastName,
          company_id
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    return member;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  create,
  updateData
};
