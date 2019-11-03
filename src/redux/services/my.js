import axios from "axios";

import {getApiServer} from "../../config/index";
import createCommonRequest from "../utils/createCommonRequest";

export const changePasswordApi = req =>{
    const apiServer = getApiServer();

    console.log("CHANGE PASSWORD API CALL");
    const fullUrl = `${apiServer}/admin/password/change`;

    return axios.post(fullUrl, req.password, createCommonRequest())
        .then((res) =>{
            return res.data;
        })
        .catch((err) =>{
            throw err;
        });
};