// ---------------------------- fetch question actions ----------------------------
export const FETCH_QUIZ_QUESTIONS_REQUEST = 'FETCH_QUIZ_QUESTIONS_REQUEST';
export function fetchQuizQuestions(quizId ) {
  return {
    type: FETCH_QUIZ_QUESTIONS_REQUEST,

    meta: {
      api: {
        name: 'fetchQuizQuestions',
        options: {
          quizId,
        },
        actions: {
          success: fetchQuizSuccess,
          failure: fetchQuizFailure,
        },
      },
    },
  };
}



export const FETCH_QUIZ_QUESTIONS_SUCCESS = 'FETCH_QUIZ_QUESTIONS_SUCCESS';
function fetchQuizSuccess ( questions, { quizId } ) {
  return {
    type: FETCH_QUIZ_QUESTIONS_SUCCESS,
    payload: {
      quizId,
      questions,
    },
  };
}



export const FETCH_QUIZ_QUESTIONS_FAILURE = 'FETCH_QUIZ_QUESTIONS_FAILURE';
function fetchQuizFailure ( error, { quizId } ) {
  return {
    type: FETCH_QUIZ_QUESTIONS_FAILURE,
    payload: {
      quizId,
      error,
    },
  };
}



// ---------------------------- quiz playing actions ----------------------------
export const SELECT_QUESTION_OPTION = 'SELECT_QUESTION_OPTION';
export function selectQuestionOption ( optionId ) {
  return {
    type: SELECT_QUESTION_OPTION,
    payload: {
      optionId,
    },
  };
}



export const QUESTION_TIMER_UPDATE = 'QUESTION_TIMER_UPDATE';
export function questionTimerUpdate ( timerValue ) {
  return {
    type: QUESTION_TIMER_UPDATE,
    payload: {
      timerValue,
    },
  };
}



export const QUESTION_TIMER_TIMEOUT = 'QUESTION_TIMER_TIMEOUT';
export function questionTimeout () {
  return {
    type: QUESTION_TIMER_TIMEOUT,
  };
}



export const FINISH_QUIZ = 'FINISH_QUIZ';
export function finishQuiz () {
  return {
    type: FINISH_QUIZ,
  };
}
