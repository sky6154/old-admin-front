import * as actionTypes from '../actions/post';
import createReducer    from '../utils/createReducer';

const initialState = {
  isImageUploading : false
};

const actionHandlers = {
  [actionTypes.UPLOAD_IMAGE.REQUEST]: (state, action) =>{
    return Object.assign({}, state, {isImageUploading: true});
  },
  [actionTypes.UPLOAD_IMAGE.SUCCESS]: (state, action) =>{
    const post = action.data;

    return Object.assign({}, state, {
      post          : post,
      isImageUploading: false
    });
  },
  [actionTypes.UPLOAD_IMAGE.FAILURE]: (state, action) =>{

    return Object.assign({}, state, {...action});
  },

};

export default createReducer(initialState, actionHandlers);