import createActionTypes from '../utils/createActionTypes';
import createActionCreator, {createSagaAction} from '../utils/createActionCreator';

export const LOGIN = createActionTypes('LOGIN');
export const login = createSagaAction(LOGIN);
export const LOGIN_TRIGGER = 'LOGIN_TRIGGER';
export const loginTrigger = (req, requiredFields = []) => createActionCreator(LOGIN_TRIGGER, {req, requiredFields});

export const LOGOUT = createActionTypes('LOGOUT');
export const logout = createSagaAction(LOGOUT);
export const LOGOUT_TRIGGER = 'LOGOUT_TRIGGER';
export const logoutTrigger = (req, requiredFields = []) => createActionCreator(LOGOUT_TRIGGER, {req, requiredFields});

export const AUTH_CHECK = createActionTypes('AUTH_CHECK');
export const authCheck = createSagaAction(AUTH_CHECK);
export const AUTH_CHECK_TRIGGER = 'AUTH_CHECK_TRIGGER';
export const authCheckTrigger = (req, requiredFields = []) => createActionCreator(AUTH_CHECK_TRIGGER, {req, requiredFields});