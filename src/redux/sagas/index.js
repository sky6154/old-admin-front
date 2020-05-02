import {all, fork} from 'redux-saga/effects';
import _ from 'lodash';

import postSagas from './post';
import boardSagas from './board';
import accountSagas from './account';
import mySagas from './my';

export default function* rootSagas() {
    let sagas = postSagas
        .concat(boardSagas)
        .concat(accountSagas)
        .concat(mySagas);

    yield all(_.map(sagas, (saga) => fork(saga)));
}
