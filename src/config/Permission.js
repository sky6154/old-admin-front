import _ from "lodash";

export const Permissions = {
    ROLE_ADMIN: "ROLE_ADMIN",
    ROLE_BLOG: "ROLE_BLOG",
    ROLE_ETC: "ROLE_ETC"
}.freeze();

export function isPermitted(permission, requiredPermissions) {
    let isPermitted = false;

    if (!(permission instanceof Permissions)) {
        throw "Use Permission Object."
    }

    if (!Array.isArray(requiredPermissions)) {
        throw "Second argument must be a array";
    }

    _.forEach(requiredPermissions, function (val) {
        if (!(val instanceof Permissions)) {
            throw "Use Permission Object in required permission array."
        }

        if(permission == requiredPermissions){
            isPermitted = true;
            return false; // break loop
        }
    });

    return isPermitted;
};