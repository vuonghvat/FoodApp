
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
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from "react-native";
const  height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import { connect} from "react-redux"
import Layout from "../../layouts/Layout"
import {loggedIn} from "../../../redux/app/action"
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'react-native-best-viewpager';
import ImageAsset from "../../../assets/images/ImageAsset";
import FastImage from "react-native-fast-image";
import Colors from "../../../assets/themes/colors";
import Toolbar from "../../customizes/Toolbar";
class SearchScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      keySearch:""
    };
 
  }
  
  render() {
 
    return (
      <Layout style={styles.container}>
       <Layout padding={15} row>

        <TouchableOpacity
        style={{alignSelf:"center"}}
         onPress={()=>{
          this.props.navigation.goBack();
        }}>
        <FastImage source={ImageAsset.ArrowBackIcon} style={{ width:24, height:24, marginHorizontal:10 }}/>
        </TouchableOpacity>
        <Layout flex={1} row radius={20} bgColor={Colors.white} hidden>

          <FastImage source={ImageAsset.SearchIcon} style={{ width:20, height:20,alignSelf:"center", marginHorizontal:10 }}/>
          <NativeBase.Input 
          value={this.state.keySearch}
          onChangeText={keySearch=>this.setState({keySearch})}
          placeholder={"Find places, food, address..."}
          style={{fontSize:13,height:40, color:Colors.Black , opacity:0.4, flex:1, textAlign:"left", alignSelf:"center"}}/>
          {this.state.keySearch!=="" && (
             <TouchableOpacity
             style={{alignSelf:"center"}}
              onPress={()=>{
               this.setState({keySearch:""})
             }}>
             <FastImage source={ImageAsset.CloseIcon} style={{ width:22, height:22, marginHorizontal:10, opacity:0.5 }}/>
             </TouchableOpacity>
          )}
        </Layout>
      
       </Layout>
         
          
     
        
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const mapStateToProps = state =>{
  return {
    isLogged : state.appReducer.isLogged
  }
}
export default connect(mapStateToProps)(SearchScreen);
