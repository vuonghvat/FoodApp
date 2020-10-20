
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
import { StackActions, NavigationActions} from "@react-navigation/native";
import request from "../../../api/request"
import URL from "../../../api/URL";
import ProgressDialog from "../../customizes/ProgressDialog";
import Toast from 'react-native-simple-toast';
import StaticUser from "../../../utils/StaticUser";
class ChangePasswordScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
        newPassword:"",
        reNewPassword:"",
        oldPassword:"",
       isLoading:false
    };
   
  
  }
 
  
  onChangePassword =()=>{
   
    
    const { oldPassword, newPassword, reNewPassword} = this.state;
    if(oldPassword =="" || newPassword =="" || reNewPassword == ""){
        
        Toast.show("Các trường không được để trống!", Toast.LONG);
        return;
    }   
    if(newPassword !== reNewPassword){
        Toast.show("Mật khẩu không khớp", Toast.LONG);
        return;
    }
    
    const data = {
        oldPass:oldPassword,
        newPass:newPassword,
        rePass:reNewPassword,
        id: StaticUser.getCurrentUser().CustomerID
    }
   

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
      
              
          
        <NativeBase.Content
        contentContainerStyle={{paddingBottom:30}}
         style={{padding:20}}  >
        <NativeBase.Text style={{color:Colors.primaryColor, fontSize:26, fontWeight:"bold", textAlign:"left"}}>Thay mật khẩu{"\n"}</NativeBase.Text>
          <Layout  flex={1}>
       
          
          <Layout height={50} bgColor={Colors.white} style={{ elevation:2, paddingHorizontal:12}} radius={30} hidden margin={[20]}>
              
              <NativeBase.Input
                   secureTextEntry={true}
              value={this.state.oldPassword}
              onChangeText ={(oldPassword)=>this.setState({oldPassword})}
              maxLength={32}
               numberOfLines={1}
               placeholderTextColor={"gray"}
               placeholder={"Mật khẩu cũ"}
              
               style={{
                 
              }}/>
          </Layout>
          <Layout height={50} bgColor={Colors.white} style={{ elevation:2, paddingHorizontal:12}} radius={30} hidden margin={[20]}>
              
              <NativeBase.Input
                   secureTextEntry={true}
              value={this.state.newPassword}
              onChangeText ={(newPassword)=>this.setState({newPassword})}
              maxLength={32}
               numberOfLines={1}
               placeholderTextColor={"gray"}
               placeholder={"Mật khẩu mới"}
              
               style={{
                 
              }}/>
          </Layout>
          <Layout height={50} bgColor={Colors.white} style={{ elevation:2, paddingHorizontal:12}} radius={30} hidden margin={[20]}>
              
              <NativeBase.Input
                   secureTextEntry={true}
              value={this.state.reNewPassword}
              onChangeText ={(reNewPassword)=>this.setState({reNewPassword})}
              maxLength={32}
               numberOfLines={1}
               placeholderTextColor={"gray"}
               placeholder={"Xác nhận mật khẩu"}
              
               style={{
                 
              }}/>
          </Layout>
          </Layout>
          <Layout bgColor={Colors.white} style={{ elevation:2}} radius={30} hidden margin={[20]}>
              <NativeBase.Button onPress={this.onChangePassword} style={{backgroundColor:Colors.primaryColor, justifyContent:"center"}}>
               <NativeBase.Text uppercase={false}>{"Xác nhận"}</NativeBase.Text>
              </NativeBase.Button>
           </Layout>
           </NativeBase.Content>
           
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
export default connect(mapStateToProps)(ChangePasswordScreen);
