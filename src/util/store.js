/**
 * Provides collection of reusable store pieces
 */


export function fetchableState () {
  return {
    isFetching: false,
    isFetchingFailed: false,
    fetchingFailedReason: null,
    lastUpdate: Date.now(),
  };
}



export function fetchableListState () {
  return Object.assign( fetchableState(), { items: [] } );
}



export function processableState () {
  return {
    isProcessing: false,
    isProcessingFailed: false,
    processingFailedPayload: null,
  };
}



export function getFormFieldState(){
  return {
    value: null,
    isInvalid: false,
    invalidMessage: null,
    disabled: false,
  };
}



