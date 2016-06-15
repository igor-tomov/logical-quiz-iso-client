import {createAPIMiddleware} from 'util/redux';



const apiList = {

  fetchQuizSubjects ( endpoint ) {
    return fetch( `${endpoint}/1.0/quizzes` )
      .then( response => response.json() )
      .then( json => {
        if ( ! json || ! Array.isArray( json.quizzes ) ) {
          return Promise.reject( json );
        }

        //todo: tmp solution
        json.quizzes = [1,2,3,4,5].map( () => json.quizzes.slice()[0] );

        return json.quizzes;
      });
  },



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
