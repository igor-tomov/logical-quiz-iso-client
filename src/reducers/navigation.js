import {fromJS} from 'immutable';
import {NAVIGATE_PUSH, NAVIGATE_POP} from '../actions/navigation';



const initialState = fromJS({
  index: 0,
  key: 'root',
  routes: [
    {
      key: 'subjects',
      payload: {
        nextScene: 'quiz',
      },
    }, //todo: 'subjects' should be replaced with some bootstrap scene
  ],
});



export function navigatePop( state ) {
  const routes = state.get( 'routes' );

  if ( routes.size > 1 ) {
    state = state.merge({
      index: state.get( 'index' ) - 1,
      routes: routes.pop(),
    });
  }

  return state;
}


export function navigatePush ( state, { route } ) {
  const routes = state.get( 'routes' );

  if ( route.key !== routes.last().get( 'key' ) ) {
    state = state.merge({
      index:    state.get( 'index' ) + 1,
      routes:   routes.push( fromJS( route ) ),
    });
  }

  return state;
}



export default function ( state = initialState, action ) {

  switch ( action.type ) {

    case NAVIGATE_PUSH:
      return navigatePush( state, action.payload );

    case NAVIGATE_POP:
      return navigatePop( state );
  }

  return state;
}
