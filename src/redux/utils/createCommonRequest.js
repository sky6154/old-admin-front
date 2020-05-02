import * as _ from "lodash";
import createHeader from "./createHeader";

export default function createCommonRequest(headers, options) {
    let _headers = headers;
    let _options = options;

    if (_.isNil(headers)) {
        _headers = createHeader();
    }

    if (_.isNil(options)) {
        _options = {
            withCredentials: true
        };
    }

    return {
        headers: _headers,
        ..._options
    };

}