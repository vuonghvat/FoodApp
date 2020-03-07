
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

class SignupInfoScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      
      
    };
   
  
  }
 
  
  onSignUp =()=>{
   

    // this.props.navigation.dispatch(
    //     StackActions.pop(2)
    //   );
    //    this.props.navigation.dispatch(
    //     StackActions.replace("LoginScreen")
    //     ,{

    //     }
    //   );
  
     // this.props.navigation.navigate("LoginScreen")
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
        <NativeBase.Text style={{color:Colors.primaryColor, fontSize:26, fontWeight:"bold", textAlign:"left"}}>Create your{"\n"}account</NativeBase.Text>
          <Layout  flex={1}>
          <Layout height={50} bgColor={Colors.white} style={{ elevation:2, paddingHorizontal:12}} radius={30} hidden margin={[20]}>
              
           <NativeBase.Input
              value={this.state.phoneNumber}
              onChangeText ={(phoneNumber)=>this.setState({phoneNumber})}
              maxLength={12}
               numberOfLines={1}
               placeholderTextColor={"gray"}
               placeholder={"Enter your full name"}
              
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
               placeholder={"Enter your full name"}
              
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
               placeholder={"Enter your full name"}
              
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
               placeholder={"Enter your full name"}
              
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
               placeholder={"Enter your full name"}
              
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
               placeholder={"Enter your full name"}
              
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
               placeholder={"Enter your full name"}
              
               style={{
                 
              }}/>
          </Layout>

           
           <Layout bgColor={Colors.white} style={{ elevation:2}} radius={30} hidden margin={[20]}>
              <NativeBase.Button onPress={this.onSignUp} style={{backgroundColor:Colors.primaryColor, justifyContent:"center"}}>
               <NativeBase.Text uppercase={false}>{"Sign Up"}</NativeBase.Text>
              </NativeBase.Button>
           </Layout>
          </Layout>
        
           </NativeBase.Content>
           

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
