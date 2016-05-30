/**
 * Create Redux middleware with supplied set of API calls
 *
 * Middleware payload example:
 * {
 *   meta: {
 *      api: {
 *          type: 'fetchSomeList',
 *          options: { entityId: 341, page: 23, ....}
 *          actions: {
 *              success: createSuccessAction(),
 *              failure: createFailAction()
 *          }
 *      }
 *   }
 * }
 *
 * @param {String} endpoint - API endpoint (root URL)
 * @param {object} apiList - set of API calls
 * @returns {Function}
 */
export function createAPIMiddleware( endpoint, apiList ) {
  return () => next => action => {
    let {meta} = action;

    if ( ! meta || ! meta.api ){
      return next( action );
    }

    let {
      name, // api call name,
      options, // api call options
      actions: { success, failure }, // action creators
    } = meta.api;

    if ( ! apiList[ name ] ){
      console.error( `API middleware: unrecognized "${name}" api` );
      return next( action );
    }

    let request = apiList[ name ]( endpoint, options );

    // looks like API call is curried
    if ( typeof request === 'function' ){
      apiList[name] = request;
      request = request( endpoint, options );
    }

    request.then( response => {
      if ( ! success ){
        return;
      }

      let action;

      if ( typeof success === 'function' ){
        action = success( response, options );
      }else{
        action = {
          type: success,
          payload: {
            response,
          },
        };
      }

      next( action );
    })
    .catch( error => {
      console.error( error instanceof Error ? error.stack : error );

      if ( ! failure ){
        return;
      }

      let action;

      if ( typeof failure === 'function' ){
        action = failure( error, options );
      }else{
        action = {
          type: failure,
          payload: {
            error,
          },
        };
      }

      next( action );
    });

    next( action );
  };
}
