import * as actionTypes from '../actions/post';
import createReducer    from '../utils/createReducer';

const initialState = {
  isPostProgress : false,
  isImageUploading : false,
  isReplaceSrc : false,
  isPostUploading : false,
  step1IsAllImageUploaded : false,
  step2IsDoneReplaceSrc : false,
  step3IsPostUpload : false
};

const actionHandlers = {
  [actionTypes.UPLOAD_IMAGE.REQUEST]: (state, action) =>{
    return Object.assign({}, state, {isImageUploading: true});
  },
  [actionTypes.UPLOAD_IMAGE.SUCCESS]: (state, action) =>{
    const imageUploadResult = action.data;

    return Object.assign({}, state, {
      isImageUploading : false
    });
  },
  [actionTypes.UPLOAD_IMAGE.FAILURE]: (state, action) =>{
    return Object.assign({}, state, {...action});
  },



  [actionTypes.REMOVE_STATE.SUCCESS]: (state, action) =>{
    return Object.assign({}, state, initialState);
  }
};

export default createReducer(initialState, actionHandlers);