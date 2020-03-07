import * as types from "./actionTypes";

var initialState = {
  language: "en",
  isLogged: false
};

var appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_LANGUAGE: {
      return { language: action.language };

    }
    case types.LOGGED_IN:{
      return {
        isLogged: action.isLogged
      }
    }
  
    
    default:
      return state;
  }
};


export default appReducer;
