export const FETCH_QUIZ_REQUEST = 'FETCH_QUIZ_REQUEST';
export function fetchQuiz( category ) {
  return {
    type: FETCH_QUIZ_REQUEST,
    payload: {
      category,
    },
  };
}
