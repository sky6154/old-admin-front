import * as actionTypes                       from '../actions/account';
import createReducer                          from '../utils/createReducer';
import Alert                                  from 'react-s-alert';
import _                                      from "lodash";
import {removeSessionInfo, insertSessionInfo} from "../../config/session";

const initialState = {
  isLoginRequesting    : false,
  isLogin              : false,
  isLogoutRequesting   : false,
  isAuthCheckRequesting: false,
  isAllAdminFetching   : false,
  adminList            : []
};

const actionHandlers = {
  [actionTypes.LOGIN.REQUEST]: (state, action) =>{
    return Object.assign({}, state, {isLoginRequesting: true});
  },
  [actionTypes.LOGIN.SUCCESS]: (state, action) =>{
    // const isLogin = action.data;

    insertSessionInfo(action.data.token, action.data.authorities);

    return Object.assign({}, state, {
      isLoginRequesting: false,
      isLogin          : true
    });
  },
  [actionTypes.LOGIN.FAILURE]: (state, action) =>{
    Alert.error("LOGIN FAIL", {
      position: 'top-right',
      effect  : 'slide',
      timeout : 3000
    });

    removeSessionInfo();

    return Object.assign({}, state, {
      isLoginRequesting: false,
      isLogin          : false
    });
  },


  [actionTypes.LOGOUT.REQUEST]: (state, action) =>{
    return Object.assign({}, state, {isLogoutRequesting: true});
  },
  [actionTypes.LOGOUT.SUCCESS]: (state, action) =>{
    const isLogin = action.data;

    removeSessionInfo();

    return Object.assign({}, state, {
      isLogoutRequesting: false,
      isLogin           : false
    });
  },
  [actionTypes.LOGOUT.FAILURE]: (state, action) =>{
    Alert.error("LOGOUT FAIL", {
      position: 'top-right',
      effect  : 'slide',
      timeout : 3000
    });

    removeSessionInfo();

    return Object.assign({}, state, {
      isLogoutRequesting: false
    });
  },


  [actionTypes.AUTH_CHECK.REQUEST]: (state, action) =>{
    return Object.assign({}, state, {isAuthCheckRequesting: true});
  },
  [actionTypes.AUTH_CHECK.SUCCESS]: (state, action) =>{
    const isLogin = action.data;

    return Object.assign({}, state, {
      isFetchBoardListRequesting: false,
      isLogin                   : isLogin
    });
  },
  [actionTypes.AUTH_CHECK.FAILURE]: (state, action) =>{
    Alert.error("AUTH CHECK FAIL", {
      position: 'top-right',
      effect  : 'slide',
      timeout : 3000
    });

    removeSessionInfo();

    return Object.assign({}, state, {
      isFetchBoardListRequesting: false
    });
  },


  [actionTypes.GET_ALL_ADMIN.REQUEST]: (state, action) =>{
    return Object.assign({}, state, {isAllAdminFetching: true, adminList: []});
  },
  [actionTypes.GET_ALL_ADMIN.SUCCESS]: (state, action) =>{
    const adminList = action.data;

    return Object.assign({}, state, {
      isAllAdminFetching: false,
      adminList                   : adminList
    });
  },
  [actionTypes.GET_ALL_ADMIN.FAILURE]: (state, action) =>{
    Alert.error("GET ALL ADMIN FAIL", {
      position: 'top-right',
      effect  : 'slide',
      timeout : 3000
    });

    return Object.assign({}, state, {
      isAllAdminFetching: false
    });
  },
};

export default createReducer(initialState, actionHandlers);