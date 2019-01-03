/* eslint-disable no-constant-condition */
import { uploadImageApi } from '../services/post';
import * as actions from '../actions/post';
import {createIterator, createWatcher} from '../utils/createSaga';

/***************************** Subroutines ************************************/
const uploadImage = createIterator(actions.uploadImage, uploadImageApi);

/******************************* WATCHERS *************************************/

const watchImageUpload = createWatcher(actions.UPLOAD_IMAGE_TRIGGER, uploadImage);

export default [
  watchImageUpload
];