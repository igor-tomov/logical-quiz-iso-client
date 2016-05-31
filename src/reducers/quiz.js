import {QUIZ_TIMEOUT} from 'config';
import {composeState, applyReducers} from 'util/immutable';
import {fetchableState} from 'util/store';
import {
  enableFetching,
  disableFetching,
} from 'util/reducers';

import {
  FETCH_QUIZ_REQUEST,
  FETCH_QUIZ_SUCCESS,
  //FETCH_QUIZ_FAILURE,
} from '../actions/quiz';



const initialQuizState = composeState(
  fetchableState,
  {
    timeout: QUIZ_TIMEOUT,
    id: null,
    title: null,
    desc: '',
    thumbnail: '',
    questions: [],
    passedQuestions: [],
  }
);



function setQuizData( state, payload ) {
  return state.merge( payload.quiz );
}



export default function ( state = initialQuizState, action ) {

  switch ( action.type ) {

    case FETCH_QUIZ_REQUEST:
      return enableFetching( state );

    case FETCH_QUIZ_SUCCESS:
      return applyReducers(
        state,
        action.payload,
        disableFetching,
        setQuizData
      );
  }

  return state;
}
