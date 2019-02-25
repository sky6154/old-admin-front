import {getToken} from "../../config/session";

export default function createHeader() {
  let head = {};
  head['Content-Type'] = 'application/json;';
  head['X-Develobeer-Token'] = getToken();

  return head;
}