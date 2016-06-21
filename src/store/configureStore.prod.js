import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {API_ENDPOINT} from 'config';
import rootReducer from '../reducers';
import createApiMiddleware from '../middleware/api';
import timeIntervalEmitter from '../middleware/timeIntervalEmitter';



export default () => createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk,
      createApiMiddleware( API_ENDPOINT ),
      timeIntervalEmitter
    )
  )
);
