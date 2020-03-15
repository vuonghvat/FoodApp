
import * as NativeBase from "native-base";

import React, { Component, PureComponent } from "react";
import {
  StyleSheet,
  Platform,
  View,
  Animated,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Alert,

} from "react-native";
import { connect} from "react-redux"
import Layout from "../../layouts/Layout"
import {loggedIn} from "../../../redux/app/action"
import Colors from "../../../assets/themes/colors";
import FastImage from "react-native-fast-image"

import ImageAsset from "../../../assets/images/ImageAsset";
const  height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import firebase from 'react-native-firebase';
import Toolbar from "../../customizes/Toolbar";
import URL from "../../../api/URL";
import request from "../../../api/request"

import ProgressDialog from "../../customizes/ProgressDialog";
import Toast from 'react-native-simple-toast';
import AsyncStorageApp from "../../../utils/AsyncStorageApp"

const AuthContext = React.createContext();

class LoginScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
    username:"",
    password:"",
    isLoading:false
      
    };
  
  
  }
 
  onSignIn=()=>{
    
    // const= useContext(AuthContext);t { signIn 
    const  { username,password} =this.state;
    if(username == ""){
      Toast.show("Username cannot be empty!", Toast.LONG);
      return;
    }
    if(password == ""){
      Toast.show("Password cannot be empty!", Toast.LONG);
      return;
    }
    const data ={
        username,
        password
    }
    this.setState({isLoading:true})
    

    request((res,err)=>{
      
      
      if(res){
        console.log(res);
      
        const data = res.data;
        if(data.success){
          const token  = data.token;
          if(token){
       console.log(token);
       
         AsyncStorageApp.storeData("user_login",JSON.stringify({access_token:token}));

            Toast.show("Đăng nhập thành công", Toast.LONG);
            this.setState({...this.state,isLoading:false})
         
            this.props.dispatch(loggedIn(true));
          }else{
            Toast.show("Có lỗi xảy ra thử lại sau", Toast.LONG);
            this.setState({...this.state,isLoading:false})
         
          }

        }else{
          Toast.show(data.msg, Toast.LONG);
          this.setState({...this.state,isLoading:false})
         
        }
         
      }
        else{
          Toast.show("Kiểm tra kết nối", Toast.LONG);
          this.setState({...this.state,isLoading:false})
        }

          
        
        
    

    }).post(URL.UrlSignIn,data)

  }

  render() {
 
    return (
      <Layout style={styles.container}>
          <Toolbar
          imageLeft={
            <Image
              source={ImageAsset.ArrowBackIcon}
              style={{ width: 24, height: 24 }}
            />
          }
          leftAction={() => {
            this.props.navigation.goBack();
          }}
        
          toolbarColor={"white"}
        
        />
      
              
          
        <Layout padding={20} flex={1}>
        <NativeBase.Text style={{color:Colors.primaryColor, fontSize:26, fontWeight:"bold", textAlign:"left"}}>Đăng nhập{"\n"}tài khoản</NativeBase.Text>
          <Layout  flex={1}>
       
             <Layout height={50} bgColor={Colors.white} style={{ elevation:2, paddingHorizontal:12}} radius={30} hidden margin={[20]}>
                 
                 <NativeBase.Input
                 value={this.state.username}
                 onChangeText ={(username)=>this.setState({username})}
                 maxLength={12}
                  numberOfLines={1}
                  placeholderTextColor={"gray"}
                  placeholder={"Tên tài khoản"}
                 
                  style={{
                    
                 }}/>
             </Layout>
             <Layout height={50} bgColor={Colors.white} style={{ elevation:2, paddingHorizontal:12}} radius={30} hidden margin={[20]}>
              
              <NativeBase.Input
              secureTextEntry={true}
                 value={this.state.password}
                 onChangeText ={(password)=>this.setState({password})}
                 maxLength={12}
                  numberOfLines={1}
                  placeholderTextColor={"gray"}
                  placeholder={"Mật khẩu"}
                 
                  style={{
                    
                 }}/>
             </Layout>
       
             
           <Layout bgColor={Colors.white} style={{ elevation:2}} radius={30} hidden margin={[20]}>
              <NativeBase.Button onPress={this.onSignIn} style={{backgroundColor:Colors.primaryColor, justifyContent:"center"}}>
               <NativeBase.Text uppercase={false} style={{fontWeight:"bold"}}>Đăng nhập</NativeBase.Text>
              </NativeBase.Button>
           </Layout>
          </Layout>
          <Layout content="center" items="center">
              <NativeBase.Text uppercase={false} style={{fontSize:13}}>
                  Chưa có tài khoản <NativeBase.Text
                  onPress={()=>{
                    this.props.navigation.navigate("VerifyNumberPhoneScreen");
                  }}
                   style={{color:Colors.primaryColor, fontSize:14, fontWeight:"bold"}}>Đăng ký</NativeBase.Text>
              </NativeBase.Text>
          </Layout>

           </Layout>
           <ProgressDialog isShow={this.state.isLoading}/>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.BackgroundColor,
 
  },
});
const mapStateToProps = state =>{
  return {
    isLogged : state.appReducer.isLogged
  }
}
export default connect(mapStateToProps)(LoginScreen);