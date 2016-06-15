// ---------------------------- fetch question actions ----------------------------
export const FETCH_QUIZ_SUBJECTS_REQUEST = 'FETCH_QUIZ_SUBJECTS_REQUEST';
export function fetchQuizSubjects () {
  return {
    type: FETCH_QUIZ_SUBJECTS_REQUEST,

    meta: {
      api: {
        name: 'fetchQuizSubjects',
        actions: {
          success: fetchQuizSubjectsSuccess,
          failure: fetchQuizSubjectsFailure,
        },
      },
    },
  };
}



export const FETCH_QUIZ_SUBJECTS_SUCCESS = 'FETCH_QUIZ_SUBJECTS_SUCCESS';
function fetchQuizSubjectsSuccess ( subjects ) {
  return {
    type: FETCH_QUIZ_SUBJECTS_SUCCESS,
    payload: {
      subjects,
    },
  };
}



export const FETCH_QUIZ_SUBJECTS_FAILURE = 'FETCH_QUIZ_SUBJECTS_FAILURE';
function fetchQuizSubjectsFailure ( error ) {
  return {
    type: FETCH_QUIZ_SUBJECTS_FAILURE,
    payload: {
      error,
    },
  };
}
