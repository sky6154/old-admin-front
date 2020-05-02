import createActionTypes from '../utils/createActionTypes';
import createActionCreator, {createSagaAction} from '../utils/createActionCreator';

export const UPLOAD_IMAGE = createActionTypes('UPLOAD_IMAGE');
export const uploadImage = createSagaAction(UPLOAD_IMAGE);
export const UPLOAD_IMAGE_TRIGGER = 'UPLOAD_IMAGE_TRIGGER';
export const uploadImageTrigger = (req, requiredFields = []) => createActionCreator(UPLOAD_IMAGE_TRIGGER, {
    req,
    requiredFields
});


export const REPLACE_IMAGE_SRC = createActionTypes('REPLACE_IMAGE_SRC');
export const replaceImageSrc = createSagaAction(REPLACE_IMAGE_SRC);
export const REPLACE_IMAGE_SRC_TRIGGER = 'REPLACE_IMAGE_SRC_TRIGGER';
export const replaceImageSrcTrigger = (req, requiredFields = []) => createActionCreator(REPLACE_IMAGE_SRC_TRIGGER, {
    req,
    requiredFields
});


export const UPLOAD_POST = createActionTypes('UPLOAD_POST');
export const uploadPost = createSagaAction(UPLOAD_POST);
export const UPLOAD_POST_TRIGGER = 'UPLOAD_POST_TRIGGER';
export const uploadPostTrigger = (req, requiredFields = []) => createActionCreator(UPLOAD_POST_TRIGGER, {
    req,
    requiredFields
});


export const REMOVE_STATE = createActionTypes('REMOVE_STATE');
export const removeState = createSagaAction(REMOVE_STATE);
export const REMOVE_STATE_TRIGGER = 'REMOVE_STATE_TRIGGER';
export const removeStateTrigger = (req, requiredFields = []) => createActionCreator(REMOVE_STATE_TRIGGER, {
    req,
    requiredFields
});


export const FETCH_POST_LIST = createActionTypes('FETCH_POST_LIST');
export const fetchPostList = createSagaAction(FETCH_POST_LIST);
export const FETCH_POST_LIST_TRIGGER = 'FETCH_POST_LIST_TRIGGER';
export const fetchPostListTrigger = (req, requiredFields = []) => createActionCreator(FETCH_POST_LIST_TRIGGER, {
    req,
    requiredFields
});


export const DELETE_POST = createActionTypes('DELETE_POST');
export const deletePost = createSagaAction(DELETE_POST);
export const DELETE_POST_TRIGGER = 'DELETE_POST_TRIGGER';
export const deletePostTrigger = (req, requiredFields = []) => createActionCreator(DELETE_POST_TRIGGER, {
    req,
    requiredFields
});


export const RESTORE_POST = createActionTypes('RESTORE_POST');
export const restorePost = createSagaAction(RESTORE_POST);
export const RESTORE_POST_TRIGGER = 'RESTORE_POST_TRIGGER';
export const restorePostTrigger = (req, requiredFields = []) => createActionCreator(RESTORE_POST_TRIGGER, {
    req,
    requiredFields
});