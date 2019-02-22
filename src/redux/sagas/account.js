/* eslint-disable no-constant-condition */
import { loginApi, logoutApi, authCheckApi } from '../services/account';
import * as actions from '../actions/account';
import {createIterator, createWatcher} from '../utils/createSaga';

/***************************** Subroutines ************************************/
const login = createIterator(actions.login, loginApi());
const logout = createIterator(actions.logout, logoutApi());
const authCheck = createIterator(actions.authCheck, authCheckApi());


/******************************* WATCHERS *************************************/
const watchLogin = createWatcher(actions.LOGIN_TRIGGER, login);
const watchLogout = createWatcher(actions.LOGOUT_TRIGGER, logout);
const watchAuthCheck = createWatcher(actions.LOGOUT_TRIGGER, authCheck);


export default [
  watchLogin,
  watchLogout,
  watchAuthCheck
];