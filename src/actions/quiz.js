// ---------------------------- fetch question actions ----------------------------
export const FETCH_QUIZ_QUESTIONS_REQUEST = 'FETCH_QUIZ_QUESTIONS_REQUEST';
export function fetchQuizQuestions( quizId, quizData ) {
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

    payload: {
      quizData,
    },
  };
}



export const FETCH_QUIZ_QUESTIONS_SUCCESS = 'FETCH_QUIZ_QUESTIONS_SUCCESS';
function fetchQuizSuccess ( questions, { quizId } ) {
  return {
    type: FETCH_QUIZ_QUESTIONS_SUCCESS,

    meta: {
      timeIntervalEmitter: {
        type:   'start',
        name:   'quiz-question',
        emit:   updateQuestionTimer,
      },
    },

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

    meta: {
      timeIntervalEmitter: {
        type:   'stop',
        name:   'quiz-question',
        emit:   updateQuestionTimer,
      },
    },

    payload: {
      optionId,
    },
  };
}



export const NEXT_QUESTION = 'NEXT_QUESTION';
export function nextQuestion () {
  return {
    type: NEXT_QUESTION,
    meta: {
      timeIntervalEmitter: {
        type:   'start',
        name:   'quiz-question',
        emit:   updateQuestionTimer,
      },
    },
  };
}



export const UPDATE_QUESTION_TIMER = 'UPDATE_QUESTION_TIMER';
export function updateQuestionTimer () {
  return {
    type: UPDATE_QUESTION_TIMER,
  };
}



export const TIMEOUT_QUESTION_TIMER = 'TIMEOUT_QUESTION_TIMER';
export function timeoutQuestion () {
  return {
    type: TIMEOUT_QUESTION_TIMER,
  };
}



export const FINISH_QUIZ = 'FINISH_QUIZ';
export function finishQuiz () {
  return {
    type: FINISH_QUIZ,
    meta: {
      timeIntervalEmitter: {
        type:   'stop',
        name:   'quiz-question',
      },
    },
  };
}
