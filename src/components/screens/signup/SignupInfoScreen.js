
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
import { StackActions, NavigationActions} from "@react-navigation/native";
import request from "../../../api/request"
import URL from "../../../api/URL";
import ProgressDialog from "../../customizes/ProgressDialog";
import Toast from 'react-native-simple-toast';
class SignupInfoScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      name:"",
      mail:"",
      username:"",
      pass:"",
      pass2:"",
      isError:false,
      errorMessage: "",
      isIncorrect:false,
      isLoading:false
    };
   
  
  }
 
  
  onSignUp =()=>{
   
    
    
   const  { params} = this.props.route;
    const { name, mail, username,pass,pass2} = this.state;
    const phone = params.phoneNumber;
    if(name =="" || mail=="" || username=="" || pass =="" || pass2 == ""){
      this.setState({
        isError: true,
        errorMessage:"Can not be empty"
      })
      return;
    }

    if(pass !== "" && pass2 !=="" && pass !== pass2){
      this.setState({
        isIncorrect: true,
        errorMessage:"Password incorrect"
      })
      return;
    }

    this.setState({
      isIncorrect:false,
      isError:false,
      isLoading:true
    })
    
    const data ={
      name,
      mail,
      phone:"0"+phone,
      username,
      pass,
      pass2
    }
   
  
    

    request((res,err)=>{
      
      
      if(res){
        console.log(res);
      
        const data = res.data;
        if(data.errors){
          const errors =  data.errors;
          if(errors.length >0){
         
            Toast.show(errors[0].msg, Toast.LONG);
            this.setState({...this.state,isLoading:false})
          }
          
        }
        if(data){
          if(data.affectedRows === 1){
            Toast.show("Login successfully!", Toast.LONG);
            this.setState({...this.state,isLoading:false})
            this.props.navigation.navigate('LoginScreen')

          }
        }
        
      }else{
        console.log(err);
        this.setState({isLoading:false})
        
      }

    }).post(URL.UrlSignUp,data)

    
   

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
        <NativeBase.Text style={{color:Colors.primaryColor, fontSize:26, fontWeight:"bold", textAlign:"left"}}>Tạo tài khoản{"\n"}</NativeBase.Text>
          <Layout  flex={1}>
          <Layout height={50} bgColor={Colors.white} style={{ elevation:2, paddingHorizontal:12}} radius={30} hidden margin={[20]}>
              
           <NativeBase.Input
              value={this.state.mail}
              onChangeText ={(mail)=>this.setState({mail})}
              maxLength={32}
               numberOfLines={1}
               placeholderTextColor={"gray"}
               placeholder={"Email"}
              
               style={{
                 
              }}/>
          
          </Layout>
            {this.state.mail ==="" && this.state.isError && (  <NativeBase.Text style={{color:"red", fontSize:12, marginLeft:20}}>
                {this.state.errorMessage}
              </NativeBase.Text>)}
          <Layout height={50} bgColor={Colors.white} style={{ elevation:2, paddingHorizontal:12}} radius={30} hidden margin={[20]}>
              
              <NativeBase.Input
              value={this.state.username}
              onChangeText ={(username)=>this.setState({username})}
              maxLength={32}
               numberOfLines={1}
               placeholderTextColor={"gray"}
               placeholder={"Tên người dùng"}
              
               style={{
                 
              }}/>
          </Layout>
          {this.state.username ==="" && this.state.isError && (  <NativeBase.Text style={{color:"red", fontSize:12, marginLeft:20}}>
          {this.state.errorMessage}
              </NativeBase.Text>)}
          <Layout height={50} bgColor={Colors.white} style={{ elevation:2, paddingHorizontal:12}} radius={30} hidden margin={[20]}>
              
              <NativeBase.Input
              value={this.state.pass}
              secureTextEntry ={true}
              onChangeText ={(pass)=>this.setState({pass})}
              maxLength={32}
               numberOfLines={1}
               placeholderTextColor={"gray"}
               placeholder={"Mật khẩu"}
              
               style={{
                 
              }}/>
          </Layout>
          {this.state.pass ==="" && this.state.isError && (  <NativeBase.Text style={{color:"red", fontSize:12, marginLeft:20}}>
                {this.state.errorMessage}
              </NativeBase.Text>)}
          <Layout height={50} bgColor={Colors.white} style={{ elevation:2, paddingHorizontal:12}} radius={30} hidden margin={[20]}>
              
              <NativeBase.Input
              value={this.state.pass2}
              onChangeText ={(pass2)=>this.setState({pass2})}
              maxLength={32}
               numberOfLines={1}
               secureTextEntry ={true}
               placeholderTextColor={"gray"}
               placeholder={"Nhập lại mật khẩu"}
              
               style={{
                 
              }}/>
          </Layout>
          {this.state.pass2 ==="" && this.state.isError && (  <NativeBase.Text style={{color:"red", fontSize:12, marginLeft:20}}>
                {this.state.errorMessage}
              </NativeBase.Text>)}
              {this.state.isIncorrect && (  <NativeBase.Text style={{color:"red", fontSize:12, marginLeft:20}}>
                {"Password incorrect"}
              </NativeBase.Text>)}
          <Layout height={50} bgColor={Colors.white} style={{ elevation:2, paddingHorizontal:12}} radius={30} hidden margin={[20]}>
              
              <NativeBase.Input
              value={this.state.name}
              onChangeText ={(name)=>this.setState({name})}
              maxLength={32}
               numberOfLines={1}
               placeholderTextColor={"gray"}
               placeholder={"Tên đầy đủ"}
              
               style={{
                 
              }}/>
          </Layout>

          
          {this.state.name ==="" && this.state.isError && (  <NativeBase.Text style={{color:"red", fontSize:12, marginLeft:20}}>
          {this.state.errorMessage}
              </NativeBase.Text>)}
           <Layout bgColor={Colors.white} style={{ elevation:2}} radius={30} hidden margin={[20]}>
              <NativeBase.Button onPress={this.onSignUp} style={{backgroundColor:Colors.primaryColor, justifyContent:"center"}}>
               <NativeBase.Text uppercase={false}>{"Đăng ký"}</NativeBase.Text>
              </NativeBase.Button>
           </Layout>
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
export default connect(mapStateToProps)(SignupInfoScreen);
