import {fromJS} from 'immutable';
import {NAVIGATE_PUSH, NAVIGATE_POP} from '../actions/navigation';



const initialState = fromJS({
  index: 0,
  key: 'root',
  children: [
    {
      key: 'subjects',
      payload: {
        nextScene: 'quiz',
      },
    }, //todo: 'subjects' should be replaced with some bootstrap scene
  ],
});



export function navigatePop( state ) {
  const children = state.get( 'children' );

  if ( children.size > 1 ) {
    state = state.merge({
      index: state.get( 'index' ) - 1,
      children: children.pop(),
    });
  }

  return state;
}


export function navigatePush ( state, { route } ) {
  const children = state.get( 'children' );

  if ( route.key !== children.last().get( 'key' ) ) {
    state = state.merge({
      index:    state.get( 'index' ) + 1,
      children: children.push( fromJS( route ) ),
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
