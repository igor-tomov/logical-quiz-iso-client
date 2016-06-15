export const NAVIGATE_PUSH = 'NAVIGATE_PUSH';
export function navigatePush ( route ) {
  return {
    type: NAVIGATE_PUSH,
    payload: {
      route,
    },
  };
}



export const NAVIGATE_POP = 'NAVIGATE_POP';
export function navigatePop () {
  return {
    type: NAVIGATE_PUSH,
  };
}
