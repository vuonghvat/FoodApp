import * as types from "./actionTypes";

export const changeLanguage = language => {
  return {
    type: types.CHANGE_LANGUAGE,
    language
  };
};
export const loggedIn = (isLogged)=>{
  return {
    type: types.LOGGED_IN,
    isLogged
  };
}

export const updateScreen = (isUpdate)=>{
  return {
    type: types.UPDATE_SCREEN,
    isUpdate
  };
}