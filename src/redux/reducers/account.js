import _ from "lodash";

import * as actionTypes from '../actions/account';
import createReducer from '../utils/createReducer';
import Alert from 'react-s-alert';
import {removeUserInfo, setCsrfToken, setUserRole} from "../../config/userInfo";

const initialState = {
    isLoginRequesting: false,
    isLogin: false,
    isLogoutRequesting: false,
    isAuthCheckRequesting: false,
    isAllAdminFetching: false,
    adminList: []
};

const actionHandlers = {
    [actionTypes.LOGIN.REQUEST]: (state, action) => {
        return Object.assign({}, state, {
            isLoginRequesting: true,
            isLogin: false
        });
    },
    [actionTypes.LOGIN.SUCCESS]: (state, action) => {
        const data = action.data;

        if (!_.isObject(data)) {
            throw "Wrong login response.";
        }

        setUserRole(data.authorities);
        setCsrfToken(data.csrfHeader, data.csrfToken);

        return Object.assign({}, state, {
            isLoginRequesting: false,
            isLogin: true
        });
    },
    [actionTypes.LOGIN.FAILURE]: (state, action) => {
        Alert.error("LOGIN FAIL", {
            position: 'top-right',
            effect: 'slide',
            timeout: 3000
        });

        removeUserInfo();

        return Object.assign({}, state, {
            isLoginRequesting: false,
            isLogin: false
        });
    },


    [actionTypes.LOGOUT.REQUEST]: (state, action) => {
        return Object.assign({}, state, {isLogoutRequesting: true});
    },
    [actionTypes.LOGOUT.SUCCESS]: (state, action) => {
        const isLogin = action.data;

        removeUserInfo();

        return Object.assign({}, state, {
            isLogoutRequesting: false,
            isLogin: false
        });
    },
    [actionTypes.LOGOUT.FAILURE]: (state, action) => {
        Alert.error("LOGOUT FAIL", {
            position: 'top-right',
            effect: 'slide',
            timeout: 3000
        });

        removeUserInfo();

        return Object.assign({}, state, {
            isLogoutRequesting: false
        });
    },


    [actionTypes.AUTH_CHECK.REQUEST]: (state, action) => {
        return Object.assign({}, state, {isAuthCheckRequesting: true});
    },
    [actionTypes.AUTH_CHECK.SUCCESS]: (state, action) => {
        const isLogin = action.data;

        return Object.assign({}, state, {
            isFetchBoardListRequesting: false,
            isLogin: true
        });
    },
    [actionTypes.AUTH_CHECK.FAILURE]: (state, action) => {
        Alert.error("AUTH CHECK FAIL", {
            position: 'top-right',
            effect: 'slide',
            timeout: 3000
        });

        removeUserInfo();

        return Object.assign({}, state, {
            isFetchBoardListRequesting: false,
            isLogin: false
        });
    },


    [actionTypes.GET_ALL_ADMIN.REQUEST]: (state, action) => {
        return Object.assign({}, state, {isAllAdminFetching: true, adminList: []});
    },
    [actionTypes.GET_ALL_ADMIN.SUCCESS]: (state, action) => {
        const adminList = action.data;

        return Object.assign({}, state, {
            isAllAdminFetching: false,
            adminList: adminList
        });
    },
    [actionTypes.GET_ALL_ADMIN.FAILURE]: (state, action) => {
        Alert.error("GET ALL ADMIN FAIL", {
            position: 'top-right',
            effect: 'slide',
            timeout: 3000
        });

        return Object.assign({}, state, {
            isAllAdminFetching: false
        });
    },
};

export default createReducer(initialState, actionHandlers);