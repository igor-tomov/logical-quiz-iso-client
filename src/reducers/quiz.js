//import {QUIZ_TIMEOUT} from 'config';
import {composeState, applyReducers} from 'util/immutable';
import {fetchableState} from 'util/store';
import {
  enableFetching,
  disableFetching,
  setFetchableFailure,
  resetFetchableFailure,
} from 'util/reducers';

import {
  FETCH_QUIZ_QUESTIONS_REQUEST,
  FETCH_QUIZ_QUESTIONS_SUCCESS,
  FETCH_QUIZ_QUESTIONS_FAILURE,

  SELECT_QUESTION_OPTION,
} from '../actions/quiz';



const initialQuizState = composeState(
  fetchableState,
  {
    timerValue: 0,
    id: null,
    title: null,
    desc: '',
    thumbnail: '',
    questions: [],
    passedQuestions: [],
    questionIndex: -1,
  }
);



function setQuizData( state, { quizId, questions } ) {
  return state.merge({
    id: quizId,
    questions,
  });
}



function questionIndexWithZero( state ) {
  return state.set( 'questionIndex', 0 );
}



function selectQuestionOption( state, { optionId } ) {
  const questionIndex = state.get( 'questionIndex' );

  if ( state.getIn( [ 'questions', questionIndex, 'target' ] ) === optionId ){
    state = state.set(
      'passedQuestions',
      state.get( 'passedQuestions' ).push(
        state.getIn( [ 'questions', questionIndex, 'id' ] )
      )
    );
  }

  return state.set( 'questionIndex', questionIndex + 1 );
}



export default function ( state = initialQuizState, action ) {

  switch ( action.type ) {

    case FETCH_QUIZ_QUESTIONS_REQUEST:
      return enableFetching( state );

    case FETCH_QUIZ_QUESTIONS_SUCCESS:
      return applyReducers(
        state,
        action.payload,
        questionIndexWithZero,
        disableFetching,
        resetFetchableFailure,
        setQuizData
      );

    case FETCH_QUIZ_QUESTIONS_FAILURE:
      return applyReducers(
        state,
        action.payload,
        setFetchableFailure,
        questionIndexWithZero
      );

    case SELECT_QUESTION_OPTION:
      return selectQuestionOption( state, action.payload );
  }

  return state;
}
