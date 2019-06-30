import updateMemberData from "./updateMemberData";
import fetchCompanies from "./fetchCompanies";
import fetchMembers from "./fetchMembers";
import createMember from "./createMember";
import createCompany from "./createCompany";

export const options = {
  baseURL: process.env.VUE_APP_API_URL,
  crossDomain: true
};

export default {
  fetchMembers,
  fetchCompanies,
  updateMemberData,
  createMember,
  createCompany
};
