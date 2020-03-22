export default class StaticUser {
    static currentUser = {
      access_token: "",
      expires_in: 0,
      token_type: "",
      userName: "",
      phone:"",
      email:"",
      CustomerID:""  
    };
  
    static getCurrentUser() {
      return this.currentUser;
    }
  }
  