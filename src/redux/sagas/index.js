import {fork, all} from 'redux-saga/effects';
import _ from 'lodash';

import postSagas from './post';
import boardSagas from './board';
import accountSagas from './account';

export default function* rootSagas(){
  let sagas = postSagas
    .concat(boardSagas)
    .concat(accountSagas);

  yield all(_.map(sagas, (saga) => fork(saga)));
}
