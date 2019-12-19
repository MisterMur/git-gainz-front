import {LOGOUT} from '../constants/authTypes'

const initialState={

  // currentUser:{id:29,name:'Brad',password:'1234'}
}


export default function userReducer(state=initialState,action){
  // console.log('%c Schedule reducer:', 'color: orange', action);
  switch(action.type){
    default:
      // console.log('no action type found')
      return state;
  }
}
