/*
String constants and functions used for work with redux
*/

/*
redux-promise-axios constants
------------------------------
Each reduc action will have posiibly 3 stages
1 . PENDING - waiting for the response after establishing a call
2 . FULFILLED - response was retrived successfully
3 . REJECTED - faileds incase of network problem / bad request
*/
export const PENDING = '_PENDING';
export const FULFILLED = '_FULFILLED';
export const REJECTED = '_REJECTED';

/*
function check if the last fetch performed is valid so we don't need to wait for the action to fetch retrive new data
offeset is the time in seconds,
with in this offest if we have received a response we it will be assumed that we a alredy having a valid data,
this offest will be different for each reducer actions,
offest depends on the frequency of the change in particular data in DB 
*/
export const lastFetchValidCheck = (state, offest = 30) => {
  let today = new Date();
  let diffMs = state.lastFetch != null ? today - state.lastFetch : false;
  let diffMins = diffMs ? Math.round(((diffMs % 86400000) % 3600000) / 60000) : false;
  let lastFetchValidBool = !state.error && diffMins !== false && diffMins <= offest;
  return lastFetchValidBool;
};
