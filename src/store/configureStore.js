import {compose, createStore, applyMiddleware} from 'redux';

import {API_ENDPOINT} from 'config';
import rootReducer from '../reducers';
import createApiMiddleware from '../middleware/api';



export default () => createStore(
  rootReducer,
  compose(
    applyMiddleware( createApiMiddleware( API_ENDPOINT ) )
  )
);
