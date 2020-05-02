import Cookies from 'universal-cookie';
import _ from "lodash";
import {Role} from "./Role";

const ROLE_NAME = "develobeer-role";
export const CSRF_HEADER = "develobeer-csrf-header-name";
export const CSRF_TOKEN = "develobeer-csrf-token";

const cookies = new Cookies();

export function removeUserInfo() {
    cookies.remove(ROLE_NAME);
    cookies.remove(CSRF_HEADER);
    cookies.remove(CSRF_TOKEN);
}

export function setCsrfToken(headerName, csrfToken) {
    if (_.isNil(headerName) || headerName === "") {
        throw "Csrf header name doesn't exist.";
    } else if (_.isNil(csrfToken) || csrfToken === "") {
        throw "Csrf token doesn't exist.";
    }

    removeUserInfo();
    cookies.set(CSRF_HEADER, headerName);
    cookies.set(CSRF_TOKEN, csrfToken);
}

export function setUserRole(role) {
    if (_.isNil(role) || _.isEmpty(role) || !Array.isArray(role)) {
        throw "Role is not exist or role must be an array.";
    }

    removeUserInfo();
    cookies.set(ROLE_NAME, JSON.stringify(role));
}

export function updateRole(role) {
    if (_.isNil(role) || _.isEmpty(role)) {
        throw "Role is not exist or role must be an array.";
    }

    cookies.remove(ROLE_NAME);
    cookies.set(ROLE_NAME, role);
}

export function getRole() {
    let roles = cookies.get(ROLE_NAME);
    let result = [];

    _.forEach(roles, function (role) {
        if (Role.hasOwnProperty(role.authority)) {
            result.push(Role[role.authority]);
        }
    });

    return result;
}