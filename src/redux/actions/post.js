import createActionTypes from '../utils/createActionTypes';
import createActionCreator, {createSagaAction} from '../utils/createActionCreator';

export const UPLOAD_IMAGE = createActionTypes('UPLOAD_IMAGE');
export const uploadImage = createSagaAction(UPLOAD_IMAGE);
export const UPLOAD_IMAGE_TRIGGER = 'UPLOAD_IMAGE_TRIGGER';
export const uploadImageTrigger = (req, requiredFields = []) => createActionCreator(UPLOAD_IMAGE_TRIGGER, {req, requiredFields});


export const REPLACE_IMAGE_SRC = createActionTypes('REPLACE_IMAGE_SRC');
export const replaceImageSrc = createSagaAction(REPLACE_IMAGE_SRC);
export const REPLACE_IMAGE_SRC_TRIGGER = 'REPLACE_IMAGE_SRC_TRIGGER';
export const replaceImageSrcTrigger = (req, requiredFields = []) => createActionCreator(REPLACE_IMAGE_SRC_TRIGGER, {req, requiredFields});


export const UPLOAD_POST = createActionTypes('UPLOAD_POST');
export const uploadPost = createSagaAction(UPLOAD_POST);
export const UPLOAD_POST_TRIGGER = 'UPLOAD_POST_TRIGGER';
export const uploadPostTrigger = (req, requiredFields = []) => createActionCreator(UPLOAD_POST_TRIGGER, {req, requiredFields});


export const REMOVE_STATE = createActionTypes('REMOVE_STATE');
export const removeState = createSagaAction(REMOVE_STATE);
export const REMOVE_STATE_TRIGGER = 'REMOVE_STATE_TRIGGER';
export const removeStateTrigger = (req, requiredFields = []) => createActionCreator(REMOVE_STATE_TRIGGER, {req, requiredFields});