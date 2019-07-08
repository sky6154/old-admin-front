import {getToken} from "../../config/session";
import _ from "lodash";

export default function createHeader() {
  let head = {};
  let token = getToken();

  head['Content-Type'] = 'application/json;';

  if(!_.isNil(token)){
    head['X-Develobeer-Token'] = token;
  }

  return head;
}