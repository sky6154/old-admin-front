/* eslint-disable no-constant-condition */
import {
    deletePostApi,
    fetchPostListApi,
    replaceImageSrcFunc,
    restorePostApi,
    uploadImageApi,
    uploadPostApi
} from '../services/post';
import * as actions from '../actions/post';
import {createIterator, createWatcher} from '../utils/createSaga';

/***************************** Subroutines ************************************/
const uploadImage = createIterator(actions.uploadImage, uploadImageApi);
const replaceImageSrc = createIterator(actions.replaceImageSrc, replaceImageSrcFunc);
const uploadPost = createIterator(actions.uploadPost, uploadPostApi);
const removeState = createIterator(actions.removeState, () => {
});

const fetchPostList = createIterator(actions.fetchPostList, fetchPostListApi);

const deletePost = createIterator(actions.deletePost, deletePostApi);
const restorePost = createIterator(actions.restorePost, restorePostApi);


/******************************* WATCHERS *************************************/

const watchImageUpload = createWatcher(actions.UPLOAD_IMAGE_TRIGGER, uploadImage);
const watchReplaceImageSrc = createWatcher(actions.REPLACE_IMAGE_SRC_TRIGGER, replaceImageSrc);
const watchUploadPost = createWatcher(actions.UPLOAD_POST_TRIGGER, uploadPost);
const watchRemoveState = createWatcher(actions.REMOVE_STATE_TRIGGER, removeState);

const watchFetchPostList = createWatcher(actions.FETCH_POST_LIST_TRIGGER, fetchPostList);

const watchDeletePost = createWatcher(actions.DELETE_POST_TRIGGER, deletePost);
const watchRestorePost = createWatcher(actions.RESTORE_POST_TRIGGER, restorePost);

export default [
    watchImageUpload,
    watchReplaceImageSrc,
    watchUploadPost,
    watchRemoveState,
    watchFetchPostList,
    watchDeletePost,
    watchRestorePost
];