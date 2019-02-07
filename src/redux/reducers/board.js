import * as actionTypes from '../actions/board';
import createReducer    from '../utils/createReducer';
import Alert from 'react-s-alert';
import _ from "lodash";

const initialState = {
  isFetchBoardListRequesting : false,
  boardList : []
};

const actionHandlers = {
  [actionTypes.FETCH_BOARD_LIST.REQUEST]: (state, action) =>{
    return Object.assign({}, state, {isFetchBoardListRequesting: true});
  },
  [actionTypes.FETCH_BOARD_LIST.SUCCESS]: (state, action) =>{
    const boardList = action.data;

    return Object.assign({}, state, {
      isFetchBoardListRequesting : false,
      boardList : boardList
    });
  },
  [actionTypes.FETCH_BOARD_LIST.FAILURE]: (state, action) =>{
    Alert.error("FETCH BOARD LIST FAIL", {
      position: 'top-right',
      effect: 'slide',
      timeout: 3000
    });


    return Object.assign({}, state, {
      isFetchBoardListRequesting : false,
      boardList : []
    });
  }
};

export default createReducer(initialState, actionHandlers);