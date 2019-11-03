/* eslint-disable no-constant-condition */
import { changePasswordApi } from '../services/my';
import * as actions from '../actions/my';
import {createIterator, createWatcher} from '../utils/createSaga';

/***************************** Subroutines ************************************/
const changePassword = createIterator(actions.changePassword, changePasswordApi);


/******************************* WATCHERS *************************************/
const watchChangePassword = createWatcher(actions.CHANGE_PASSWORD_TRIGGER, changePassword);


export default [
    watchChangePassword
];