import * as actionTypes from '../actions/post';
import createReducer    from '../utils/createReducer';
import Alert from 'react-s-alert';
import _ from "lodash";

const initialState = {
  isPostProgress : false,
  isImageUploading : false,
  isReplaceSrc : false,
  isPostUploading : false,
  step1IsAllImageUploaded : false,
  step2IsDoneReplaceSrc : false,
  step3IsPostUpload : false,
  imageUploadInfo : []
};

const actionHandlers = {
  [actionTypes.UPLOAD_IMAGE.REQUEST]: (state, action) =>{
    return Object.assign({}, state, {isImageUploading: true});
  },
  [actionTypes.UPLOAD_IMAGE.SUCCESS]: (state, action) =>{
    const imageUploadResult = action.data;
    let isAllImageUploaded = true;
    let imageUploadInfo = [];

    _.forEach(imageUploadResult, function(value, key){
      console.log(value);

      if(!_.isNil(value) && value.code != 1){
        isAllImageUploaded = false;

        Alert.error(value.message, {
          position: 'top-right',
          effect: 'slide',
          timeout: 3000
        });

        imageUploadInfo = [];

        return false;
      }
      else{
        imageUploadInfo[key] = value.additional
      }
    });

    return Object.assign({}, state, {
      isImageUploading : false,
      step1IsAllImageUploaded : isAllImageUploaded,
      imageUploadInfo : imageUploadInfo
    });
  },
  [actionTypes.UPLOAD_IMAGE.FAILURE]: (state, action) =>{
    Alert.error("IMAGE UPLOAD FAIL", {
      position: 'top-right',
      effect: 'slide',
      timeout: 3000
    });

    return Object.assign({}, state, {initialState});
  },


  [actionTypes.REPLACE_IMAGE_SRC.REQUEST]: (state, action) =>{
    return Object.assign({}, state, {isReplaceSrc: true});
  },
  [actionTypes.REPLACE_IMAGE_SRC.SUCCESS]: (state, action) =>{
    const imageUploadResult = action.data;

    return Object.assign({}, state, {
      isReplaceSrc : false
    });
  },
  [actionTypes.REPLACE_IMAGE_SRC.FAILURE]: (state, action) =>{
    return Object.assign({}, state, {...action});
  },


  [actionTypes.UPLOAD_POST.REQUEST]: (state, action) =>{
    return Object.assign({}, state, {isPostUploading: true});
  },
  [actionTypes.UPLOAD_POST.SUCCESS]: (state, action) =>{
    const imageUploadResult = action.data;

    return Object.assign({}, state, {
      isPostUploading : false
    });
  },
  [actionTypes.UPLOAD_POST.FAILURE]: (state, action) =>{
    return Object.assign({}, state, {...action});
  },



  [actionTypes.REMOVE_STATE.SUCCESS]: (state, action) =>{
    return Object.assign({}, state, initialState);
  }
};

export default createReducer(initialState, actionHandlers);