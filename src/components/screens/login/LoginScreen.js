
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

import Toolbar from "../../customizes/Toolbar";
import URL from "../../../api/URL";
import request from "../../../api/request"

import ProgressDialog from "../../customizes/ProgressDialog";
import Toast from 'react-native-simple-toast';
import AsyncStorageApp from "../../../utils/AsyncStorageApp"
import StaticUser from "../../../utils/StaticUser";

const AuthContext = React.createContext();

class LoginScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
   phone:"",
    password:"",
    isLoading:false
      
    };
  
  
  }
 
  onSignIn=()=>{
    
   
    const  { phone,password} =this.state;
    if(phone == ""){
      Toast.show("Username cannot be empty!", Toast.LONG);
      return;
    }
    if(password == ""){
      Toast.show("Password cannot be empty!", Toast.LONG);
      return;
    }
    const data ={
      phone,
     password
    }
    this.setState({isLoading:true})
    this.props.dispatch(loggedIn(true));
      
   
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
                 value={this.state.phone}
                 onChangeText ={(phone)=>this.setState({phone})}
                 maxLength={12}
                  numberOfLines={1}
                  placeholderTextColor={"gray"}
                  placeholder={"Số điện thoại"}
                 
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
