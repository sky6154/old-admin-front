import Cookies from 'universal-cookie';
import _       from "lodash";
import {Role}  from "./Role";

let TOKEN_NAME = "develobeer-token";
let ROLE_NAME = "develobeer-role"

const cookies = new Cookies();

export function removeSessionInfo() {
  cookies.remove(TOKEN_NAME);
  cookies.remove(ROLE_NAME);
}

export function insertSessionInfo(token, role){
  if(_.isNil(token) || _.isEmpty(token)){
    throw "Token is not exist.";
  }

  if(_.isNil(role) || _.isEmpty(role) || !Array.isArray(role)){
    throw "Role is not exist or role must be an array.";
  }

  removeSessionInfo();
  cookies.set(TOKEN_NAME, token);
  cookies.set(ROLE_NAME, JSON.stringify(role));
}

export function updateToken(token){
  if(_.isNil(token) || _.isEmpty(token)){
    throw "Token is not exist.";
  }

  cookies.remove(TOKEN_NAME);
  cookies.set(TOKEN_NAME, token);
}

export function updateRole(role){
  if(_.isNil(role) || _.isEmpty(role)){
    throw "Role is not exist or role must be an array.";
  }

  cookies.remove(ROLE_NAME);
  cookies.set(ROLE_NAME, role);
}

export function getToken(){
  let token = cookies.get(TOKEN_NAME);

  if(typeof token === "undefined"){
    return null;
  }
  else{
    return token;
  }
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