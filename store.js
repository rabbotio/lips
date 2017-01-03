import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

export const reducer = (state = { data: [] }, action) => {
  console.log(state, action)
  switch (action.type) {
    case 'CHAT': return { data: action.data }
    default: return state
  }
}

let UESR_ID = "0"
let data = [{
  "id": "0x",
  "uid": "0",
  "name": "katopz",
  "img": "https://avatars0.githubusercontent.com/u/97060?s=32",
  "msg": "Hey, Do you like Preact?"
},
{
  "id": "0y",
  "uid": "1",
  "name": "pignoom",
  "img": "https://avatars3.githubusercontent.com/u/17824120?s=32",
  "msg": "Sure thing!"
}];
let COUNT = 0;

export const startClock = () => dispatch => {
  /*setInterval(() => */dispatch({
    type: 'CHAT', data
  })/*, 1000)*/
}

export const initStore = (reducer, initialState, isServer) => {
  if (isServer && typeof window === 'undefined') {
    return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
  } else {
    if (!window.store) {
      window.store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
    }
    return window.store
  }
}