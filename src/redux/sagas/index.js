import {fork, all} from 'redux-saga/effects';
import _ from 'lodash';

export default function* rootSagas(){
  let sagas = null;

  yield all(_.map(sagas, (saga) => fork(saga)));
}
