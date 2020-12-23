const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

// state
const initialState = {
  loading: false,
  users: [],
  error: '',
}

// actions
// action types
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

// action creatures
const fetchUsersRequest = () => {
  return { type: FETCH_USERS_REQUEST }
}
const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  }
}
const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  }
}

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest())

    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        // res.data  === [ users ]
        const users = res.data.map((user) => user.id)
        dispatch(fetchUsersSuccess(users))
      })
      .catch((err) => {
        //err.message === error message
        dispatch(fetchUsersFailure(err.message))
      })
  }
}

// reducer
const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false,
        error: '',
      }
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        users: [],
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

// store
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {
  console.log(store.getState())
})
// invoke
store.dispatch(fetchUsers())
