import axios from "axios";
import { options } from "./index";

export default async function updateMemberData(payload) {
  try {
    let { member_id, company_id, firstName, lastName } = payload;
    let companies = await axios({
      ...options,
      method: "put",
      url: `/members/${member_id}`,
      data: {
        company_id,
        firstName,
        lastName
      }
    });
    return companies.data;
  } catch (e) {
    throw e;
  }
}
