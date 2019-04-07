import _ from "lodash";
import {getToken} from "./session";

export const Role = Object.freeze({
    ROLE_ADMIN: "ROLE_ADMIN",
    ROLE_BLOG: "ROLE_BLOG",
    ROLE_ETC: "ROLE_ETC"
});

export function isPermitted(roles, requiredPermissions) {
    let isPermitted = false;

    if(_.isNil(getToken())){
        return false;
    }

    if (!Array.isArray(requiredPermissions) || !Array.isArray(roles)) {
        throw "Arguments must be a array";
    }

    _.forEach(roles, function(role){
      if (!Role.hasOwnProperty(role)) {
        throw "Wrong role";
      }

      _.forEach(requiredPermissions, function (val) {
        if (!Role.hasOwnProperty(val)) {
          throw "Wrong role in required permission array."
        }

        if(role == val){
          isPermitted = true;
          return false; // break loop
        }
      });

      if(isPermitted){
          return false; // break loop
      }
    });

    return isPermitted;
}