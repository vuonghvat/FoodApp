import * as types from "./actionTypes";

var initialState = {
  language: "en",
  isLogged: false,
  isUpdate:false
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
    case types.UPDATE_SCREEN:{
      return {
        ...state,
        isUpdate: action.isUpdate
      }
    }
  
    
    default:
      return state;
  }
};


export default appReducer;
