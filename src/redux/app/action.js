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
