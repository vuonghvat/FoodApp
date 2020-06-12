
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

import AsyncStorageApp from "../../../utils/AsyncStorageApp";
import Toolbar from "../../customizes/Toolbar";
import StaticUser from "../../../utils/StaticUser";

class MoreScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
   
      
    };

  }
 



  render() {
 
    return (
      <Layout style={styles.container}>
           <Toolbar
      
            title="Thêm"
            toolbarColor={"white"}
            titleStyle={{fontWeight:"bold"}}
    
    />
    <Layout padding={15}>

 
          <Layout row>
            <FastImage source={ImageAsset.AvatarIcon}  style={{ height:80, width:80,}}/>
            <NativeBase.Text style={{fontWeight:"bold", alignSelf:"center", marginLeft:15}}>
              {StaticUser.getCurrentUser().userName}
            </NativeBase.Text>
          </Layout>
            <Layout margin ={[20,0,10,0]}>
            <TouchableOpacity
           onPress={()=>{
            AsyncStorageApp.clearAll("user_login")
            this.props.dispatch(loggedIn(false));
          }}><NativeBase.Text style={{fontWeight:"bold"}}>Log out</NativeBase.Text></TouchableOpacity>
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

export default connect()(MoreScreen);
