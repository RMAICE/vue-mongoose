import axios from "axios";
import { options } from "./index";
import { delay } from "../helper";

export default async function fetchCompanies() {
  try {
    let companies = await axios({
      ...options,
      method: "get",
      url: "/companies"
    });
    return companies.data;
  } catch (e) {
    throw e;
  }
}
