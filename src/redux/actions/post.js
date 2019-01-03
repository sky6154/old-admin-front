import createActionTypes from '../utils/createActionTypes';
import createActionCreator, {createSagaAction} from '../utils/createActionCreator';

export const UPLOAD_IMAGE = createActionTypes('UPLOAD_IMAGE');

export const uploadImage = createSagaAction(UPLOAD_IMAGE);

export const UPLOAD_IMAGE_TRIGGER = 'UPLOAD_IMAGE_TRIGGER';

export const uploadImageTrigger = (req, requiredFields = []) => createActionCreator(UPLOAD_IMAGE_TRIGGER, {req, requiredFields});
