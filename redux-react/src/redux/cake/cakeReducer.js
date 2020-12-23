import { BUY_CAKE } from './cakeTypes'

const initialState = {
  numOfCakes: 30,
}

const cakeReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case BUY_CAKE:
      return { ...state, numOfCakes: state.numOfCakes - 1 }
    default:
      return state
  }
}

export default cakeReducer
