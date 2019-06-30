import axios from "axios";
import { options } from "./index";
import { delay } from "../helper";

export default async function createMember(payload) {
  await delay(300);
  await axios({
    ...options,
    method: "post",
    url: "/companies",
    data: payload
  });
}
