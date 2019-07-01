import axios from "axios";
import { options } from "./index";

export default async function fetchMembers(query) {
  try {
    let members = await axios({
      ...options,
      method: "get",
      url: "/members",
      params: query
    });
    return members.data;
  } catch (e) {
    throw e;
  }
}
