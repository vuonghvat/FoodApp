
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
import numeral from "numeral"
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
import URL from "../../../api/URL";
import request from "../../../api/request";
import _ from 'lodash';
import SmartImage from "../../customizes/SmartImage";
import { ActivityIndicator } from "react-native-paper";
import Toast from 'react-native-simple-toast';
class SearchScreen extends Component {
  

  constructor(props) {
    super(props);
    
    this.state = {
      keySearch:"",
      CityID: undefined,
      products:[],
      isLoading:false
    };
    this.onChangeTextDelayed = _.debounce(this.onSearchHandler, 0.5);
 
  }
  
  componentDidMount(){
    const {params} = this.props.route;
    if(params && params.CityID){
      this.setState({CityID:params.CityID})
    }
  }

  onSearchHandler =(keySearch)=>{
   

  
   request((res,err)=>{
      
 
    console.log(res);
    
    
    if(res){
      const data = res.data;
        this.setState({products:data, isLoading:false})

     // this.setState({banners})
       
    }
      else{
      
        this.setState({ isLoading:false})
      }

        
      
      
  

  }).get(URL.UrlGetProducts+`${keySearch}/${this.state.CityID}`,null)

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
          onChangeText={(keySearch)=>{
            this.setState({keySearch, isLoading:true})
            this.onChangeTextDelayed(keySearch)
          }}
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
         
          
          <NativeBase.Content contentContainerStyle={{paddingHorizontal:15}}>
            {this.renderItem()}
          </NativeBase.Content>
     
         {this.state.isLoading && ( <ActivityIndicator style={{position:"absolute", top:0, bottom:0, right:0, left:0}} size="small" color={Colors.primaryColor} />)}
      </Layout>
    );
  }
  renderItem =()=>{
    const {products} = this.state;
  return  products.map((e,index)=>{
      return (
        <TouchableWithoutFeedback 
        onPress={()=>{
          this.props.navigation.navigate("ProductDetailScreen",{
            SourceOfItemsID: e.SourceOfItemsID,
           
           })
        }}
        >
          <View style={{flexDirection:"row", marginTop:15}}>
            <Layout >
              <SmartImage source={{uri:e.Image}} style={{ height:79, width:79, }}/>

            </Layout>
            <Layout margin ={[0,0,10]}>
             <NativeBase.Text   style={{fontSize:13, fontWeight:"bold"}}>
               {e.ItemName}
             </NativeBase.Text>
             <NativeBase.Text  style={{fontSize:13, color:"red"}}>
             {numeral(e.Price).format("0,0")+" ₫"}

             </NativeBase.Text>
             <NativeBase.Text style={{fontSize:13}}>
               {e.Description}
             </NativeBase.Text>

            </Layout>
          </View>
        </TouchableWithoutFeedback>
      )
    })
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
