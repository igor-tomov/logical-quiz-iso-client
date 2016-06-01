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
