import Cookies from 'universal-cookie';
import _       from "lodash";
import {Role}  from "./Role";

let ROLE_NAME = "develobeer-role";

const cookies = new Cookies();

export function removeUserInfo() {
  cookies.remove(ROLE_NAME);
}

export function setUserInfo(role){
  if(_.isNil(role) || _.isEmpty(role) || !Array.isArray(role)){
    throw "Role is not exist or role must be an array.";
  }

  removeUserInfo();
  cookies.set(ROLE_NAME, JSON.stringify(role));
}

export function updateRole(role){
  if(_.isNil(role) || _.isEmpty(role)){
    throw "Role is not exist or role must be an array.";
  }

  cookies.remove(ROLE_NAME);
  cookies.set(ROLE_NAME, role);
}

export function getRole(){
  let roles = cookies.get(ROLE_NAME);
  let result = [];

  _.forEach(roles, function(role){
    if(Role.hasOwnProperty(role.authority)){
      result.push(Role[role.authority]);
    }
  });

  return result;
}