import createActionTypes from '../utils/createActionTypes';
import createActionCreator, {createSagaAction} from '../utils/createActionCreator';

export const CHANGE_PASSWORD = createActionTypes('CHANGE_PASSWORD');
export const changePassword = createSagaAction(CHANGE_PASSWORD);
export const CHANGE_PASSWORD_TRIGGER = 'CHANGE_PASSWORD_TRIGGER';
export const changePasswordTrigger = (req, requiredFields = []) => createActionCreator(CHANGE_PASSWORD_TRIGGER, {
    req,
    requiredFields
});