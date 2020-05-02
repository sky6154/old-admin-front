import Cookies from 'universal-cookie';
import _ from "lodash";

import {CSRF_HEADER, CSRF_TOKEN} from "../../config/userInfo";

const cookies = new Cookies();

export default function createHeader() {
    let head = {};

    head['Content-Type'] = 'application/json;';

    if (!_.isNil(cookies.get(CSRF_HEADER) && !_.isNil(cookies.get(CSRF_HEADER)))) {
        head[cookies.get(CSRF_HEADER)] = cookies.get(CSRF_TOKEN);
    }

    return head;
}