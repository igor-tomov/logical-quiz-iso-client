export default function timeIntervalEmitter ({dispatch}) {

  let timers = {};

  return next => action => {
    const { meta } = action;

    if ( ! meta || ! meta.timeIntervalEmitter ) {
      return next( action );
    }

    let { type, name, interval, emit } = meta.timeIntervalEmitter;

    if ( ! type || ! name ) {
      throw new Error( 'timeIntervalEmitter middleware: some of required parameters [type, name] aren\'t provided' );
    }

    interval = interval || 1000;

    if ( typeof emit === 'function' ){
      emit = emit();
    } else {
      emit = { type: emit };
    }

    if ( type.toLowerCase() === 'start' ) {
      if ( timers[name] ) {
        clearInterval( timers[name] );
      }

      timers[name] = setInterval(
        () => dispatch( emit ),
        interval
      );

    } else if ( type.toLowerCase() === 'stop' ) {
      if ( timers[name] ) {
        clearInterval( timers[name] );
      }
    }

    next( action );

    /*return () => {
      Object
        .keys( timers )
        .forEach( name => clearInterval( timers[name] ) );

      timers = {};
    };*/
  };
}
