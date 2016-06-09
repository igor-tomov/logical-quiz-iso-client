import {QUIZ_TIMEOUT} from '../config';
import {composeState, applyReducers} from '../util/immutable';
import {fetchableState} from '../util/store';
import {
  enableFetching,
  disableFetching,
  setFetchableFailure,
  resetFetchableFailure,
} from '../util/reducers';

import {
  FETCH_QUIZ_QUESTIONS_REQUEST,
  FETCH_QUIZ_QUESTIONS_SUCCESS,
  FETCH_QUIZ_QUESTIONS_FAILURE,

  SELECT_QUESTION_OPTION,
  UPDATE_QUESTION_TIMER,
  TIMEOUT_QUESTION_TIMER,
  NEXT_QUESTION,
} from '../actions/quiz';



const initialQuizState = composeState(
  fetchableState,
  {
    idle: true,
    timeout: QUIZ_TIMEOUT,
    timerValue: 0,
    id: null,
    title: null,
    desc: '',
    thumbnail: '',
    questions: [],
    passedQuestions: [],
    questionIndex: 0,
  }
);



export function disableIdle( state ) {
  return state.set( 'idle', false );
}



export function setQuizData( state, { quizId, questions } ) {
  return state.merge({
    id: quizId,
    timerValue: state.get( 'timeout' ),
    questions,
  });
}



export function selectQuestionOption( state, { optionId } ) {
  const question = state.getIn( [ 'questions', state.get( 'questionIndex' ) ] );

  if ( question.get( 'target' ) === optionId ){
    state = state.set(
      'passedQuestions',
      state.get( 'passedQuestions' ).push(
        state.getIn( question.get( 'id' ) )
      )
    );
  }

  return state;
}


export function nextQuestion ( state ) {
  return state.merge({
    questionIndex: state.get( 'questionIndex' ) + 1,
    timerValue:    state.get( 'timeout' ),
  });
}



export function updateTimer( state ) {
  const timerValue = state.get( 'timerValue' );

  if ( timerValue > 0 ) {
    state = state.set( 'timerValue', timerValue - 1 );
  }

  return state;
}



export default function ( state = initialQuizState, action ) {

  switch ( action.type ) {

    case FETCH_QUIZ_QUESTIONS_REQUEST:
      return applyReducers(
        state,
        disableIdle,
        enableFetching
      );

    case FETCH_QUIZ_QUESTIONS_SUCCESS:
      return applyReducers(
        state,
        action.payload,
        disableFetching,
        resetFetchableFailure,
        setQuizData
      );

    case FETCH_QUIZ_QUESTIONS_FAILURE:
      return applyReducers(
        state,
        action.payload,
        setFetchableFailure
      );

    case SELECT_QUESTION_OPTION:
      return selectQuestionOption( state, action.payload );

    case NEXT_QUESTION:
      return nextQuestion( state );

    case UPDATE_QUESTION_TIMER:
      return updateTimer( state );

    case TIMEOUT_QUESTION_TIMER:
      return nextQuestion( state );
  }

  return state;
}
