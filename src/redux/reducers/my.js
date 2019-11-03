import * as actionTypes    from '../actions/my';
import createReducer       from '../utils/createReducer';
import Alert               from 'react-s-alert';

const initialState = {
    isChangePasswordRequest: false,
    isSuccess : false
};

const actionHandlers = {
    [actionTypes.CHANGE_PASSWORD.REQUEST]: (state, action) =>{
        return Object.assign({}, state, {
            isChangePasswordRequest: true,
            isSuccess : false
        });
    },
    [actionTypes.CHANGE_PASSWORD.SUCCESS]: (state, action) =>{
        Alert.info("비밀번호 변경 완료", {
            position: 'top-right',
            effect  : 'slide',
            timeout : 3000
        });

        return Object.assign({}, state, {
            isChangePasswordRequest: false,
            isSuccess : true
        });
    },
    [actionTypes.CHANGE_PASSWORD.FAILURE]: (state, action) =>{
        Alert.error("CHANGE_PASSWORD FAIL", {
            position: 'top-right',
            effect  : 'slide',
            timeout : 3000
        });

        return Object.assign({}, state, {
            isChangePasswordRequest: false,
            isSuccess : false
        });
    }
};

export default createReducer(initialState, actionHandlers);