import React from 'react';

import _              from "lodash";
import {getToken}     from "./session";
import {authCheckApi} from "../redux/services/account";

export const Role = Object.freeze({
  ROLE_ADMIN: "ROLE_ADMIN",
  ROLE_BLOG : "ROLE_BLOG",
  ROLE_ETC  : "ROLE_ETC"
});

export const permissionCheck = (requiredPermissions, history) =>{
  if(_.isNil(getToken())){
    history.replace("/login")
  }
  else if(!Array.isArray(requiredPermissions)){
    throw "Arguments must be a array";
  }
  else{
    authCheckApi().then(function (result){
      let roles = result;
      let isPermitted = false;

      if(_.isNil(roles)){
        history.replace("/login");
      }
      else{
        _.forEach(roles, function(val){
          let permission = val.authority;

          if(!Role.hasOwnProperty(permission)){
            throw "Wrong role";
          }

          if(requiredPermissions.indexOf(permission) !== -1){
            isPermitted = true;

            return false; // break loop
          }
        });

        if(!isPermitted){
          history.replace("/noAuth");
        }
      }

    }).catch(function (err){
      history.replace("/login");
    });
  }
};