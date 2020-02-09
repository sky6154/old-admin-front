import axios from "axios";
import _ from "lodash";

import {getApiServer} from "../../config/index";
import createCommonRequest from "../utils/createCommonRequest";

export const uploadImageApi = req =>{
  const apiServer = getApiServer();

  console.log("UPLOAD IMAGE API CALL");

  if(_.isNil(req)){
    throw new Error("req is not exist");
  }

  const fullUrl = `${apiServer}/post/uploadFile/${req.boardId}`;

  let headers = {};
  headers['Content-Type'] = 'multipart/form-data;';

  if(req.files.values().next().done){
    return ;
  }

  return axios.post(fullUrl, req.files, createCommonRequest(headers))
    .then((res) =>{
      return res.data;
    })
    .catch((err) =>{
      throw err;
    });
};

export const replaceImageSrcFunc = req => {
  if(_.isNil(req)){
    throw new Error("req is not exist");
  }

  let cursor = 0;
  let limit = req.fileInfo.length;
  let isBase64 = new RegExp("data:image\\/([a-zA-Z]*);base64,([^\"]*)");

  Object.keys(req.entityMap).map(function (key){
    // if(req.entityMap[key].type === "image"){

    if(isBase64.test(req.entityMap[key].data.src)){
      if(cursor <= limit){
        let filePath = req.fileInfo[cursor].path + req.fileInfo[cursor].fileName;
        req.entityMap[key].data.src = filePath;

        cursor++;
      }
    }

    // }
  });
};


export const uploadPostApi = req =>{
  const apiServer = getApiServer();
  let fullUrl;
  let jsonData = JSON.stringify(req);

  if(_.isNil(req)){
    throw new Error("req is not exist");
  }

  if(_.isNil(req.seq)){
    console.log("UPLOAD POST API CALL");
    fullUrl = `${apiServer}/post/write/${req.boardId}`;

    return axios.post(fullUrl, jsonData, createCommonRequest())
      .then((res) =>{
        return res.data;
      })
      .catch((err) =>{
        throw err;
      });
  }
  else{
    console.log("UPDATE POST API CALL");
    fullUrl = `${apiServer}/post/update/${req.boardId}/post/${req.seq}`;

    return axios.put(fullUrl, jsonData, createCommonRequest())
      .then((res) =>{
        return res.data;
      })
      .catch((err) =>{
        throw err;
      });
  }
};



export const fetchPostListApi = req =>{
  const apiServer = getApiServer();

  console.log("FETCH POST LIST API CALL");
  const fullUrl = `${apiServer}/post/list/${req.boardId}`;

  return axios.get(fullUrl, createCommonRequest())
    .then((res) =>{
      return res.data;
    })
    .catch((err) =>{
      throw err;
    });
};


export const deletePostApi = req =>{
  const apiServer = getApiServer();
  let fullUrl;

  if(_.isNil(req)){
    throw new Error("req is not exist");
  }

  console.log("DELETE POST API CALL");
  fullUrl = `${apiServer}/post/delete/${req.seq}`;

  return axios.delete(fullUrl, createCommonRequest())
    .then((res) =>{
      return res.data;
    })
    .catch((err) =>{
      throw err;
    });
};

export const restorePostApi = req =>{
  const apiServer = getApiServer();
  let fullUrl;
  let jsonData = JSON.stringify(req);

  if(_.isNil(req)){
    throw new Error("req is not exist");
  }

  console.log("RESTORE POST API CALL");
  fullUrl = `${apiServer}/post/restore/${req.seq}`;

  return axios.patch(fullUrl, jsonData, createCommonRequest())
    .then((res) =>{
      return res.data;
    })
    .catch((err) =>{
      throw err;
    });
};