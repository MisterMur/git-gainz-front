import {LOGOUT} from '../constants/authTypes'

const initialState={
  currentUser: null,
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  phone: "",
  token: { },
  loading: true,
  error: null,

  // currentUser:{id:29,name:'Brad',password:'1234'}
}


export default function userReducer(state=initialState,action){
  switch(action.type){
    case LOGOUT:
      return {...state,
        currentUser: null,
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        phone: "",
        token: { },
        loading: true,
        error: null,
      }

    default:
      return state;
  }
}
