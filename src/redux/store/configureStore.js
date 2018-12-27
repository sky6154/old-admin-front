import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware, { END } from 'redux-saga';
//import createHistory from 'history/createHashHistory';
import { routerReducer/*, routerMiddleware*/ } from 'react-router-redux';
import * as rootReducer from '../reducers';
import {removeSessionInfo} from '../../config/session';

//const history = createHistory();
//const routingMiddleware = routerMiddleware(history);
const appReducer = combineReducers(Object.assign({}, rootReducer, {
  routing: routerReducer
}));

const reducer = (state, action) => {
  // 로그아웃 시 session storage 및 state에 저장된 모든 데이터 초기화
  // if(action.type === 'LOGOUT_SUCCESS'){
  //   removeSessionInfo();
  //
  //   const { routing } = state;
  //   state = { routing };
  // }

  return appReducer(state, action);
};

function configureStoreProd(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
//    routingMiddleware,
    sagaMiddleware,
  ];

  const store = createStore(reducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return {store};
//  return {store, history};
}

function configureStoreDev(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    reduxImmutableStateInvariant(),
//    routingMiddleware,
    sagaMiddleware
    // createLogger(),
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(reducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return {store};
//  return {store, history};
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;