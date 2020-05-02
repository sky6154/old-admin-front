import * as actionTypes from '../actions/post';
import createReducer from '../utils/createReducer';
import Alert from 'react-s-alert';
import _ from "lodash";
import update from "immutability-helper";

const initialState = {
    isPostProgress: false,
    isImageUploading: false,
    isReplaceSrc: false,
    isPostUploading: false,
    step1IsAllImageUploaded: false,
    step2IsDoneReplaceSrc: false,
    step3IsPostUpload: false,
    imageUploadInfo: [],
    isPostListFetching: false,
    postList: [],
    isPostRemoving: false,
    isPostRestoring: false,
};

const actionHandlers = {
    [actionTypes.UPLOAD_IMAGE.REQUEST]: (state, action) => {
        return Object.assign({}, state, {isImageUploading: true});
    },
    [actionTypes.UPLOAD_IMAGE.SUCCESS]: (state, action) => {
        return Object.assign({}, state, {
            isImageUploading: false,
            step1IsAllImageUploaded: true,
            imageUploadInfo: action.data,
            isPostProgress: true
        });
    },
    [actionTypes.UPLOAD_IMAGE.FAILURE]: (state, action) => {
        Alert.error("IMAGE UPLOAD FAIL", {
            position: 'top-right',
            effect: 'slide',
            timeout: 3000
        });

        return Object.assign({}, state, {
            isPostProgress: false,
            isImageUploading: false,
            isReplaceSrc: false,
            isPostUploading: false,
            step1IsAllImageUploaded: false,
            step2IsDoneReplaceSrc: false,
            step3IsPostUpload: false,
            imageUploadInfo: []
        });
    },


    [actionTypes.REPLACE_IMAGE_SRC.REQUEST]: (state, action) => {
        return Object.assign({}, state, {isReplaceSrc: true});
    },
    [actionTypes.REPLACE_IMAGE_SRC.SUCCESS]: (state, action) => {
        const imageUploadResult = action.data;

        return Object.assign({}, state, {
            isReplaceSrc: false,
            step2IsDoneReplaceSrc: true
        });
    },
    [actionTypes.REPLACE_IMAGE_SRC.FAILURE]: (state, action) => {
        return Object.assign({}, state, {
            isPostProgress: false,
            isImageUploading: false,
            isReplaceSrc: false,
            isPostUploading: false,
            step1IsAllImageUploaded: false,
            step2IsDoneReplaceSrc: false,
            step3IsPostUpload: false,
            imageUploadInfo: []
        });
    },


    [actionTypes.UPLOAD_POST.REQUEST]: (state, action) => {
        return Object.assign({}, state, {isPostUploading: true});
    },
    [actionTypes.UPLOAD_POST.SUCCESS]: (state, action) => {
        const result = action.data;
        let {postList} = state;

        if (!_.isNil(action.req.seq)) { // post update
            if (!_.isNil(postList) && !_.isEmpty(postList)) {
                const index = _.findIndex(postList, {['seq']: result.seq});

                if (index >= 0) {
                    const newList = update(postList, {[index]: {$set: result}});

                    return Object.assign({}, state, {
                        isPostUploading: false,
                        step3IsPostUpload: true,
                        postList: newList
                    });
                }
            }
        }

        return Object.assign({}, state, {
            isPostUploading: false,
            step3IsPostUpload: true
        });
    },
    [actionTypes.UPLOAD_POST.FAILURE]: (state, action) => {
        // removeSessionInfo();
        return Object.assign({}, state, {
            isPostProgress: false,
            isImageUploading: false,
            isReplaceSrc: false,
            isPostUploading: false,
            step1IsAllImageUploaded: false,
            step2IsDoneReplaceSrc: false,
            step3IsPostUpload: false,
            imageUploadInfo: []
        });
    },


    [actionTypes.REMOVE_STATE.SUCCESS]: (state, action) => {
        return Object.assign({}, state, {
            isPostProgress: false,
            isImageUploading: false,
            isReplaceSrc: false,
            isPostUploading: false,
            step1IsAllImageUploaded: false,
            step2IsDoneReplaceSrc: false,
            step3IsPostUpload: false,
            imageUploadInfo: []
        });
    },


    [actionTypes.FETCH_POST_LIST.REQUEST]: (state, action) => {
        return Object.assign({}, state, {isPostListFetching: true});
    },
    [actionTypes.FETCH_POST_LIST.SUCCESS]: (state, action) => {
        return Object.assign({}, state, {
            isPostListFetching: false,
            postList: action.data
        });
    },
    [actionTypes.FETCH_POST_LIST.FAILURE]: (state, action) => {
        Alert.error("IMAGE UPLOAD FAIL", {
            position: 'top-right',
            effect: 'slide',
            timeout: 3000
        });

        return Object.assign({}, state, {
            isPostListFetching: false,
            postList: []
        });
    },


    [actionTypes.DELETE_POST.REQUEST]: (state, action) => {
        return Object.assign({}, state, {isPostRemoving: true});
    },
    [actionTypes.DELETE_POST.SUCCESS]: (state, action) => {
        const result = action.data;
        let {postList} = state;

        if (!_.isNil(action.req.seq)) { // post update
            if (!_.isNil(postList) && !_.isEmpty(postList)) {
                const index = _.findIndex(postList, {['seq']: result.seq});

                if (index >= 0) {
                    const newList = update(postList, {[index]: {$set: result}});

                    return Object.assign({}, state, {
                        isPostRemoving: false,
                        postList: newList
                    });
                }
            }
        }

        return Object.assign({}, state, {
            isPostRemoving: false,
        });
    },
    [actionTypes.DELETE_POST.FAILURE]: (state, action) => {
        // removeSessionInfo();
        return Object.assign({}, state, {
            isPostRemoving: false
        });
    },

    [actionTypes.RESTORE_POST.REQUEST]: (state, action) => {
        return Object.assign({}, state, {isPostRemoving: true});
    },
    [actionTypes.RESTORE_POST.SUCCESS]: (state, action) => {
        const result = action.data;
        let {postList} = state;

        if (!_.isNil(action.req.seq)) { // post update
            if (!_.isNil(postList) && !_.isEmpty(postList)) {
                const index = _.findIndex(postList, {['seq']: result.seq});

                if (index >= 0) {
                    const newList = update(postList, {[index]: {$set: result}});

                    return Object.assign({}, state, {
                        isPostRestoring: false,
                        postList: newList
                    });
                }
            }
        }

        return Object.assign({}, state, {
            isPostRestoring: false,
        });
    },
    [actionTypes.RESTORE_POST.FAILURE]: (state, action) => {
        // removeSessionInfo();
        return Object.assign({}, state, {
            isPostRestoring: false
        });
    },
};

export default createReducer(initialState, actionHandlers);