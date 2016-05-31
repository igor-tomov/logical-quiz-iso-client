// Set of util functions for Redux reducers, based on Immutable.js
import {fromJS} from 'immutable';


/**
 * Compose custom state entity from derived state entities
 *
 * @returns {Immutable.Map}
 */
export function composeState() {
  let args = Array.from( arguments );

  return args.reduce(
    ( state, stateItem ) => {
      if ( typeof stateItem === 'function' ){
        stateItem = stateItem();
      }

      return state.merge( fromJS( stateItem ) );
    },
    fromJS({})
  );
}



/**
 * Apply the set of reducer-functions to supplied state instance
 *
 * @param {Immutable.Map} state
 * @param {Array} reducers
 * @returns {Immutable.Map}
 */
export function applyReducers( state, ...reducers ) {
  let payload;

  if ( typeof reducers[0] !== 'function' ){
    payload  = reducers[0];
    reducers = reducers.slice( 1 );
  }

  return reducers.reduce(
    ( state, reducer ) => reducer( state, payload ),
    state
  );
}
