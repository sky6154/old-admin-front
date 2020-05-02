import createActionTypes from '../utils/createActionTypes';
import createActionCreator, {createSagaAction} from '../utils/createActionCreator';

export const FETCH_BOARD_LIST = createActionTypes('FETCH_BOARD_LIST');
export const fetchBoardList = createSagaAction(FETCH_BOARD_LIST);
export const FETCH_BOARD_LIST_TRIGGER = 'FETCH_BOARD_LIST_TRIGGER';
export const fetchBoardListTrigger = (req, requiredFields = []) => createActionCreator(FETCH_BOARD_LIST_TRIGGER, {
    req,
    requiredFields
});