
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

} from "react-native";
import { connect} from "react-redux"
import Layout from "../../layouts/Layout"
import {loggedIn} from "../../../redux/app/action"
import Colors from "../../../assets/themes/colors";
import FastImage from "react-native-fast-image"
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'react-native-best-viewpager';
import ImageAsset from "../../../assets/images/ImageAsset";
const  height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


class FutureScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      isLogged:false,
      
    };
    this.viewPager = React.createRef();
  
    this.pageCount = 3;
  }
 
  _renderDotIndicator() {
    return <PagerDotIndicator 
    selectedDotStyle={{backgroundColor:Colors.primaryColor, width:10, height:10, borderRadius:10}}
    pageCount={this.pageCount} />;
}

onSignup =()=>{

  this.props.navigation.navigate("VerifyNumberPhoneScreen")
  // firebase.auth().signInWithPhoneNumber("+84967100365")
  // .then(confirmResult =>{
  //   console.log(confirmResult);
    
  // })// save confirm result to use with the manual verification code)
  // .catch(error => {
  //     console.log(error);
      
  // });


  // confirmResult.confirm(verificationCode)
  // .then(user =>{
  //   console.log(user);
    
  // })
  // .catch(error => {
  //   console.log(error);
    
  // });
}
componentWillUnmount(){
  
}
  render() {
 
    return (
      <Layout style={styles.container}>
            <Layout flex={1}>
            <IndicatorViewPager
        
                initialPage={0}
                ref={this.viewPager}
                    style={{height:"100%"}}
                    indicator={this._renderDotIndicator()}
                >
                  <Layout style={{backgroundColor:Colors.BackgroundColor}}  content="center" items="center" >


                    <Layout style={{width:width/1.5, height:width/1.1}}>
                    <FastImage
                          resizeMode="contain"
                         source={ImageAsset.FoodLove} style={{flex:1}}/>
                   
                    </Layout>
                    <Layout>
                      <NativeBase.Text style={{color:Colors.primaryColor, fontSize:26, fontWeight:"bold", textAlign:"center"}}>
                           Find food you love
                         </NativeBase.Text>
                         <NativeBase.Text style={{ fontSize:20, textAlign:"center", marginTop:10}}>
                           
               
                         Find your favorite food{"\n"}Order now!
                         </NativeBase.Text>
                      </Layout>
                    </Layout>



                    <Layout style={{backgroundColor:Colors.BackgroundColor}}  content="center" items="center">
                      
                    <Layout style={{width:width/1.5, height:width/1.1}}>
                    <FastImage
                          resizeMode="contain"
                         source={ImageAsset.Shiper} style={{flex:1}}/>
                       
                    </Layout>
                    <Layout>
                      <NativeBase.Text style={{color:Colors.primaryColor, fontSize:26, fontWeight:"bold", textAlign:"center"}}>
                      Fast Delivery
                         </NativeBase.Text>
                         <NativeBase.Text style={{ fontSize:20, textAlign:"center", marginTop:10}}>
                           
               
                         Fast delivery to your door{"\n"}Order now!
                         </NativeBase.Text>
                      </Layout>
                    </Layout>
                    
                    <Layout style={{backgroundColor:Colors.BackgroundColor}}  content="center" items="center">
                      
                    <Layout style={{width:width/1.5, height:width/1.1}}>
                    <FastImage
                          resizeMode="contain"
                         source={ImageAsset.LiveTracking} style={{flex:1}}/>
                       
                    </Layout>
                    <Layout>
                      <NativeBase.Text style={{color:Colors.primaryColor, fontSize:26, fontWeight:"bold", textAlign:"center"}}>
                      Live Tracking
                         </NativeBase.Text>
                         <NativeBase.Text style={{ fontSize:20, textAlign:"center", marginTop:10}}>
                           
               
                         Fast delivery to your door{"\n"}Order now!
                         </NativeBase.Text>
                      </Layout>

                    </Layout>
                </IndicatorViewPager>
            </Layout>
            <Layout>
                <Layout  padding={20}>
                    <NativeBase.Button
                      onPress={()=>{
                        this.props.navigation.navigate("LoginScreen")
                      }}
                     style={{
                        backgroundColor: Colors.primaryColor,
                         borderRadius:20,
                         margin:10,
                         justifyContent:"center"}}>
                        <NativeBase.Text uppercase={false} style={{textAlign:"center"}}>
                            Đăng nhập
                        </NativeBase.Text>

                    </NativeBase.Button>
                    <NativeBase.Button 
                    onPress={this.onSignup}
                    style={{
                        backgroundColor: Colors.white,
                        margin:10,
                         borderRadius:20, 
                         justifyContent:"center"}}>
                        <NativeBase.Text uppercase={false}  style={{textAlign:"center", color:"black"}}>
                            Tạo tài khoản 
                            
                        </NativeBase.Text>

                    </NativeBase.Button>
                </Layout>
            </Layout>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.BackgroundColor
  },
});
const mapStateToProps = state =>{
  return {
    isLogged : state.appReducer.isLogged
  }
}
export default connect(mapStateToProps)(FutureScreen);
