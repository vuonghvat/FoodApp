
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
import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';
import Toolbar from "../../customizes/Toolbar";
import request from "../../../api/request";
import URL from "../../../api/URL";

class VerifyNumberPhoneScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
        confirmResult: undefined,
        phoneNumber:"",
        verificationCode:""
      
    };
    this.timesSend = 3;
  
  }
 
  
phoneConfirm = ()=>{
   
  if(!this.state.confirmResult && this.state.phoneNumber !=="")
  {
      auth().signInWithPhoneNumber("+84"+this.state.phoneNumber)
      .then(confirmResult =>{
        console.log(confirmResult);
        this.setState({confirmResult})
        
      })// save confirm result to use with the manual verification code)
      .catch(error => {
          console.log(error);
          
      });
      return;
  }
  if(this.state.confirmResult){
          this.state.confirmResult.confirm(this.state.verificationCode)
          .then(user =>{
            
              //alert("success")
            this.props.navigation.navigate("SignupInfoScreen",{
                phoneNumber: this.state.phoneNumber
            })
              
          })
          .catch(error => {
       
              Toast.show("Mã xác thực không chính xác. Vui lòng nhập lại!", Toast.LONG);
          });
  }
}
onSend =()=>{
 
//   this.props.navigation.navigate("SignupInfoScreen",{
//     phoneNumber: this.state.phoneNumber
// })  this.phoneConfirm();
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
          if(data.status == 1){
      
            Toast.show("Số điện thoại đã được đăng ký", Toast.LONG);
          }else{
            this.phoneConfirm();
          }
    
        }
        
      }else{
        console.log(err);
        this.setState({isLoading:false})
        
      }

    }).get(URL.UrlCheckPhoneNumber+`0${this.state.phoneNumber}`,null)

    
   

 
}
 onResend=()=>{

     
   
     if(this.timesSend== 0 ){
     
         Toast.show("Mã xác nhận đã được gửi lại", Toast.LONG);
         return;
     }
    
  
       auth().signInWithPhoneNumber("+84"+this.state.phoneNumber)
        .then(confirmResult =>{
          console.log(confirmResult);
          this.setState({confirmResult})
          
        })// save confirm result to use with the manual verification code)
        .catch(error => {
            console.log(error);
            
        });
        this.timesSend --;
    
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
        <NativeBase.Text style={{color:Colors.primaryColor, fontSize:26, fontWeight:"bold", textAlign:"left"}}>Xác minh{"\n"}số điện thoại</NativeBase.Text>
          <Layout  flex={1}>
          <Layout row bgColor={Colors.white} style={{ elevation:2}} radius={30} hidden margin={[20]}>
               <NativeBase.Text style={{alignSelf:"center", color:"gray", fontSize:20, marginLeft:16}}>+84</NativeBase.Text>
               <Layout width={0.5} height={"100%"} bgColor="gray" margin={[0,0,10,10]}/>
               <NativeBase.Input
               value={this.state.phoneNumber}
               onChangeText ={(phoneNumber)=>this.setState({phoneNumber})}
               maxLength={12}
                numberOfLines={1}
                placeholderTextColor={"#f1f1f1"}
                placeholder={"Số điệnt thoại"}
                keyboardType="phone-pad"
                style={{
                   fontSize:20,
               }}/>
           </Layout>
               {this.state.confirmResult && (<Layout>
            <Layout row hidden margin={[20]}>
              
              <NativeBase.Text style={{alignSelf:"center"}}>Nhập mã: </NativeBase.Text>

              <NativeBase.Input
              value={this.state.verificationCode}
              onChangeText={verificationCode=>this.setState({verificationCode})}
               numberOfLines={1} maxLength={6} keyboardType="number-pad" style={{ flex:1,width:"100%",  backgroundColor:Colors.white}}/>

           
       </Layout>
       <NativeBase.Text 
       
       style={{fontSize:12, textAlign:"left", marginTop:10}}>Bạn không nhận được mã?<NativeBase.Text 
       onPress={this.onResend}
       style={{fontWeight:"bold", color:Colors.primaryColor, fontSize:13}}> Thử lại</NativeBase.Text> </NativeBase.Text>
         
            </Layout>)}
           <Layout bgColor={Colors.white} style={{ elevation:2}} radius={30} hidden margin={[20]}>
              <NativeBase.Button onPress={this.onSend} style={{backgroundColor:Colors.primaryColor, justifyContent:"center"}}>
               <NativeBase.Text uppercase={false}>{this.state.confirmResult?"Xác nhận":"Gửi"}</NativeBase.Text>
              </NativeBase.Button>
           </Layout>
          </Layout>
          <Layout content="center" items="center">
              <NativeBase.Text uppercase={false} style={{fontSize:13}}>
                  Đã có tài khoản? <NativeBase.Text style={{color:Colors.primaryColor, fontSize:14, fontWeight:"bold"}}>Đăng nhập</NativeBase.Text>
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
export default connect(mapStateToProps)(VerifyNumberPhoneScreen);
