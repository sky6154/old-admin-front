/* eslint-disable no-constant-condition */
import {fetchBoardListApi} from '../services/board';
import * as actions from '../actions/board';
import {createIterator, createWatcher} from '../utils/createSaga';

/***************************** Subroutines ************************************/
const fetchBoardList = createIterator(actions.fetchBoardList, fetchBoardListApi);


/******************************* WATCHERS *************************************/
const watchFetchBoardList = createWatcher(actions.FETCH_BOARD_LIST_TRIGGER, fetchBoardList);


export default [
    watchFetchBoardList
];