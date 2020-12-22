const redux = require('redux')
const createStore = redux.createStore

const BUY_CAKE = 'BUY_CAKE'

// action creator
function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'first redux action',
  }
}

// reducer
//(previousState, action) => newState
const initialState = { numOfCakes: 10 }
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return { ...state, numOfCakes: state.numOfCakes - 1 }
    default:
      return state
  }
}

// Store
const store = createStore(reducer)
console.log('initial state', store.getState())
const unSubscribe = store.subscribe(() =>
  console.log('update State', store.getState()),
)
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
unSubscribe()
