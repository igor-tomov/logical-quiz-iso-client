import {createAPIMiddleware} from 'util/redux';



const apiList = {

  fetchQuiz( endpoint, { quizId } ){
    return fetch( `${endpoint}/1.0/quizzes/${quizId}` )
      .then( response => response.json() )
      .then( json => {
        if ( ! json || ! json.quiz ){
          return Promise.reject( json );
        }

        return json.quiz;
      });
  },

};



export default endpoint => createAPIMiddleware( endpoint, apiList );
