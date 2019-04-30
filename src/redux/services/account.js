import axios from "axios";
import _ from "lodash";

import {getApiServer} from "../../config/index";
import createCommonRequest from "../utils/createCommonRequest";

export const loginApi = req =>{
  const apiServer = getApiServer();

  console.log("LOGIN API CALL");
  const fullUrl = `${apiServer}/login`;

  return axios.post(fullUrl, req, createCommonRequest())
    .then((res) =>{
      return res.data;
    })
    .catch((err) =>{
      throw err;
    });
};

export const logoutApi = req =>{
  const apiServer = getApiServer();

  console.log("LOGOUT API CALL");
  const fullUrl = `${apiServer}/logout`;

  return axios.post(fullUrl, req, createCommonRequest())
    .then((res) =>{
      return res.data;
    })
    .catch((err) =>{
      throw err;
    });
};

export const authCheckApi = () =>{
  const apiServer = getApiServer();

  console.log("AUTH CHECK API CALL");
  const fullUrl = `${apiServer}/authCheck`;

  return axios.get(fullUrl, createCommonRequest())
    .then((res) =>{
      return res.data;
    })
    .catch((err) =>{
      // switch(err.response.status){
      //   case 401:
      //
      //     break;
      //   default:
      //     throw err;
      // }
    });
};