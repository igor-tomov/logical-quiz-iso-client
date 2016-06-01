import {QUIZ_TIMEOUT} from 'config';
import {composeState, applyReducers} from 'util/immutable';
import {fetchableState} from 'util/store';
import {
  enableFetching,
  disableFetching,
} from 'util/reducers';

import {
  FETCH_QUIZ_QUESTIONS_REQUEST,
  FETCH_QUIZ_QUESTIONS_SUCCESS,
  //FETCH_QUIZ_QUESTIONS_FAILURE,
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
  return state.merge({
    id:         payload.quizId,
    questions:  payload.questions,
  });
}



export default function ( state = initialQuizState, action ) {

  switch ( action.type ) {

    case FETCH_QUIZ_QUESTIONS_REQUEST:
      return enableFetching( state );

    case FETCH_QUIZ_QUESTIONS_SUCCESS:
      return applyReducers(
        state,
        action.payload,
        disableFetching,
        setQuizData
      );
  }

  return state;
}
