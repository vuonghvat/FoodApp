
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

const AuthContext = React.createContext();

class LoginScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
    username:"",
    password:""
      
    };
  
  
  }
 
  onSignIn=()=>{
    
    // const= useContext(AuthContext);t { signIn 
    const  { username,password} =this.state;
    const data ={
        username,
        password
    }
    console.log("Dispatch");
    
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
        <NativeBase.Text style={{color:Colors.primaryColor, fontSize:26, fontWeight:"bold", textAlign:"left"}}>Sign In to your{"\n"}account</NativeBase.Text>
          <Layout  flex={1}>
       
             <Layout height={50} bgColor={Colors.white} style={{ elevation:2, paddingHorizontal:12}} radius={30} hidden margin={[20]}>
                 
                 <NativeBase.Input
                 value={this.state.phoneNumber}
                 onChangeText ={(phoneNumber)=>this.setState({phoneNumber})}
                 maxLength={12}
                  numberOfLines={1}
                  placeholderTextColor={"gray"}
                  placeholder={"Phone"}
                 
                  style={{
                    
                 }}/>
             </Layout>
             <Layout height={50} bgColor={Colors.white} style={{ elevation:2, paddingHorizontal:12}} radius={30} hidden margin={[20]}>
              
              <NativeBase.Input
                 value={this.state.phoneNumber}
                 onChangeText ={(phoneNumber)=>this.setState({phoneNumber})}
                 maxLength={12}
                  numberOfLines={1}
                  placeholderTextColor={"gray"}
                  placeholder={"Password"}
                 
                  style={{
                    
                 }}/>
             </Layout>
       
             
           <Layout bgColor={Colors.white} style={{ elevation:2}} radius={30} hidden margin={[20]}>
              <NativeBase.Button onPress={this.onSignIn} style={{backgroundColor:Colors.primaryColor, justifyContent:"center"}}>
               <NativeBase.Text uppercase={false} style={{fontWeight:"bold"}}>Sign In</NativeBase.Text>
              </NativeBase.Button>
           </Layout>
          </Layout>
          <Layout content="center" items="center">
              <NativeBase.Text uppercase={false} style={{fontSize:13}}>
                  Don't have an Account? <NativeBase.Text
                  onPress={()=>{
                    this.props.navigation.navigate("VerifyNumberPhoneScreen");
                  }}
                   style={{color:Colors.primaryColor, fontSize:14, fontWeight:"bold"}}>Sign Up</NativeBase.Text>
              </NativeBase.Text>
          </Layout>

           </Layout>
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
