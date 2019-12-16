

const initialState={

}


exporrt default function exerciseReducer(state=initialState,action){
  // console.log('%c Exercise reducer:', 'color: orange', action);
  switch(action.type){
    default:
      // console.log('No Action TYpe Found')
      return state;
  }
}
