import axios from "axios";

import {getApiServer} from "../../config/index";
import createCommonRequest from "../utils/createCommonRequest";

export const fetchBoardListApi = req =>{
  const apiServer = getApiServer();

  console.log("FETCH BOARD LIST API CALL");
  const fullUrl = `${apiServer}/board/list`;

  return axios.get(fullUrl, createCommonRequest())
    .then((res) =>{
      return res.data;
    })
    .catch((err) =>{
      throw err;
    });
};