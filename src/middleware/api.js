import {createAPIMiddleware} from 'util/redux';



const apiList = {

  fetchQuizQuestions( endpoint, { quizId } ){
    return fetch( `${endpoint}/1.0/quizzes/${quizId}/questions/random` )
      .then( response => response.json() )
      .then( json => {
        if ( ! json || ! json.questions ){
          return Promise.reject( json );
        }

        return json.questions;
      });
  },

};



export default endpoint => createAPIMiddleware( endpoint, apiList );
