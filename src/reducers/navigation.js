import {fromJS} from 'immutable';
import {NAVIGATE_PUSH} from '../actions/navigation';



const initialState = fromJS({
  index: 0,
  key: 'root',
  children: [
    { key: 'quiz' }, //todo: 'subjects' should be replaced with some bootstrap scene
  ],
});



export function navigatePush( state ) {
  const children = state.get( 'children' );

  if ( children.size > 1 ) {
    state = state.merge({
      index: state.get( 'index' ) - 1,
      children: children.pop(),
    });
  }

  return state;
}


export default function ( state = initialState, action ) {

  switch ( action.type ) {

    case NAVIGATE_PUSH:
      return navigatePush( state );
  }

  return state;
}
