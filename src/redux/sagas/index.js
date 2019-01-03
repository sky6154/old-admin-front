import {fork, all} from 'redux-saga/effects';
import _ from 'lodash';

import postSagas from './post';

export default function* rootSagas(){
  let sagas = postSagas;

  yield all(_.map(sagas, (saga) => fork(saga)));
}
