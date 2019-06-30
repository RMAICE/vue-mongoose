import axios from "axios";
import { options } from "./index";

export default async function createMember(payload) {
  await axios({
    ...options,
    method: "post",
    url: "/members",
    data: payload
  });
}
