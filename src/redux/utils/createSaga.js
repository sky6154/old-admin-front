import {call, fork, put, take} from 'redux-saga/effects';

export function createIterator(actionType, api) {
    return function* (req) {
        try {
            yield put(actionType.request(req));
            const data = yield call(api, req);
            yield put(actionType.success(req, data));
        } catch (err) {
            yield put(actionType.failure(req, err));
        }
    }
}

export function createWatcher(actionType, iterator) {
    return function* () {
        while (true) {
            const {req, requiredFields = []} = yield take(actionType);
            yield fork(iterator, req, requiredFields);
        }
    }
}


// login용으로 입력 정보를 다시 전달하지 않는다.
export function createLoginIterator(actionType, api) {
    return function* (req) {
        try {
            yield put(actionType.request(undefined));
            const data = yield call(api, req);
            yield put(actionType.success(undefined, data));
        } catch (err) {
            yield put(actionType.failure(undefined, err));
        }
    }
}