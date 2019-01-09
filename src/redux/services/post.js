import axios from "axios";
import _ from "lodash";

import {getApiServer} from "../../config/index";
import createCommonRequest from "../utils/createCommonRequest";

export const uploadImageApi = req =>{
  const apiServer = getApiServer();

  console.log("UPLOAD IMAGE API CALL");
  const fullUrl = `${apiServer}/post/fileUpload`;

  return axios.post(fullUrl, req, createCommonRequest())
    .then((res) =>{
      return res.data;
    })
    .catch((err) =>{
      throw err;
    });
};

export const replaceImageSrcFunc = req => {
  console.log(req);
}


export const uploadPostApi = req =>{
  const apiServer = getApiServer();

  console.log("UPLOAD POST API CALL");
  const fullUrl = `${apiServer}/post/postUpload`;

  return axios.post(fullUrl, req, createCommonRequest())
    .then((res) =>{
      return res.data;
    })
    .catch((err) =>{
      throw err;
    });
};