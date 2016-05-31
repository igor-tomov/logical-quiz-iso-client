import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {API_ENDPOINT} from 'config';
import rootReducer from '../reducers';
import createApiMiddleware from '../middleware/api';



export default () => createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk,
      createApiMiddleware( API_ENDPOINT ),
      logger,
    )
  )
);
