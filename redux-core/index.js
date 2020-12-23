const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

//actions
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

// action creator
function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'first redux action',
  }
}
function buyIcecream() {
  return {
    type: BUY_ICECREAM,
    info: 'first redux action',
  }
}

// reducer
//(previousState, action) => newState
const initialCakeState = { numOfCakes: 10 }
const initialIcecreamState = { numOfIceCreams: 20 }

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return { ...state, numOfCakes: state.numOfCakes - 1 }
    default:
      return state
  }
}
const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return { ...state, numOfIceCreams: state.numOfIceCreams - 1 }
    default:
      return state
  }
}

// Store
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCreame: icecreamReducer,
})

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('initial state', store.getState())
const unSubscribe = store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
unSubscribe()
