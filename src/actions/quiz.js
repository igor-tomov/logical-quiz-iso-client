export const FETCH_QUIZ_REQUEST = 'FETCH_QUIZ_REQUEST';
export function fetchQuiz( quizId ) {
  return {
    type: FETCH_QUIZ_REQUEST,

    meta: {
      api: {
        name: 'fetchQuiz',
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



export const FETCH_QUIZ_SUCCESS = 'FETCH_QUIZ_SUCCESS';
function fetchQuizSuccess ( quiz ) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    payload: {
      quiz,
    },
  };
}



export const FETCH_QUIZ_FAILURE = 'FETCH_QUIZ_FAILURE';
function fetchQuizFailure ( error, { quizId } ) {
  return {
    type: FETCH_QUIZ_FAILURE,
    payload: {
      quizId,
      error,
    },
  };
}
