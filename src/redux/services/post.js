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
  let cursor = 0;
  let limit = req.fileInfo.length;

  Object.keys(req.entityMap).map(function (key){
    if(req.entityMap[key].type === "image"){
      if(cursor <= limit){
        let filePath = req.fileInfo[cursor].path + req.fileInfo[cursor].fileName;
        req.entityMap[key].data.src = filePath;
      }
    }
  });
}


export const uploadPostApi = req =>{
  const apiServer = getApiServer();

  console.log("UPLOAD POST API CALL");
  const fullUrl = `${apiServer}/post/uploadPost`;

  let jsonData = JSON.stringify(req);

  return axios.post(fullUrl, jsonData, createCommonRequest())
    .then((res) =>{
      return res.data;
    })
    .catch((err) =>{
      throw err;
    });
};