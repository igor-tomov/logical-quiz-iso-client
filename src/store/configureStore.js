import {compose, createStore, applyMiddleware} from 'redux';
import {Iterable} from 'immutable';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import {API_ENDPOINT} from 'config';
import rootReducer from '../reducers';
import createApiMiddleware from '../middleware/api';



const stateTransformer = state => {
  let newState = {};

  for ( let i of Object.keys( state ) ) {
    if ( Iterable.isIterable( state[i] ) ) {
      newState[i] = state[i].toJS();
    } else {
      newState[i] = state[i];
    }
  }

  return newState;
};

const logger = createLogger({ stateTransformer });



export default () => createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk,
      createApiMiddleware( API_ENDPOINT ),
      logger
    )
  )
);
