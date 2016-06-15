import {Map, List} from 'immutable';
import {composeState, applyReducers} from '../util/immutable';
import {fetchableListState} from '../util/store';

import {
  FETCH_QUIZ_SUBJECTS_REQUEST,
  FETCH_QUIZ_SUBJECTS_SUCCESS,
  FETCH_QUIZ_SUBJECTS_FAILURE,
} from '../actions/subjects';

import {
  disableIdle,
  enableFetching,
  disableFetching,
  setFetchableFailure,
  resetFetchableFailure,
} from '../util/reducers';



const initialSubjectsState = composeState( fetchableListState );
const initialSubjectItemState = Map({
  id: null,
  title: '',
  desc: '',
  thumbnail: '',
});



export function setSubjectList ( state, { subjects } ) {
  return state.set(
    'items',
    List(
      subjects.map( subject => initialSubjectItemState.merge( subject ) )
    )
  );
}



export default function ( state = initialSubjectsState, action ) {

  switch ( action.type ) {

    case FETCH_QUIZ_SUBJECTS_REQUEST:
      return applyReducers(
        state,
        disableIdle,
        enableFetching
      );

    case FETCH_QUIZ_SUBJECTS_SUCCESS:
      return applyReducers(
        state,
        action.payload,
        disableFetching,
        resetFetchableFailure,
        setSubjectList
      );

    case FETCH_QUIZ_SUBJECTS_FAILURE:
      return applyReducers(
        state,
        action.payload,
        setFetchableFailure
      );
  }

  return state;
}
