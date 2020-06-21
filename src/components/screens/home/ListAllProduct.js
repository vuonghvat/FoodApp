
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
import numeral from "numeral"
import { connect} from "react-redux"
import Layout from "../../layouts/Layout"
import {loggedIn, updateScreen} from "../../../redux/app/action"
import Colors from "../../../assets/themes/colors";
import FastImage from "react-native-fast-image"
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'react-native-best-viewpager';
import ImageAsset from "../../../assets/images/ImageAsset";
const  height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import Toast from 'react-native-simple-toast';
import URL from "../../../api/URL";
import request from "../../../api/request";
import StaticUser from "../../../utils/StaticUser";
import ProgressDialog from "../../customizes/ProgressDialog";
import Toolbar from "../../customizes/Toolbar";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import SmartImage from "../../customizes/SmartImage";
import moment from "moment";

class ListAllProduct extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
        products: [],
      isLoading:false
      
    };

  }
 

  componentWillReceiveProps = (props)=>{
    console.log(props);
    
    if(props.isUpdate){
    
      this.getHistory()
      this.props.dispatch(updateScreen(false))
    }
  }
componentDidMount(){
    const { params} = this.props.route;
    if(params){
        if(params.type && params.CityID){
            this.getProducts(params.CityID,params.type);
        }
    }
 
}
getProducts = (CityID, type)=>{

    this.setState({isLoading:true})
    request((res,err)=>{
        
        
         
          
      if(res){
  
        // const cities = res.data;
        // console.log(cities);
        // this.setState({cities:cities?cities||[]:[]})
        // err: "auth_fail"
        // msg: "Xác thực không thành công. Vui lòng đăng nhập lại!"
        const data = res.data;
       // console.log("-------",res,err);
        if(data.err && data.err =="timeout"){
       
          this.setState({...this.state,isLoading:false})
          this.props.dispatch(loggedIn(false))
          return;
          
        }else{
  

            this.setState({products:data,isLoading:false})
        
        
        }
        
  
      
         
      }
        else{
          Toast.show("Kiểm tra kết nối", Toast.LONG);
          this.setState({...this.state,isLoading:false})
        }
  
          
        
        
    
  
    }).get(URL.UrlGetProducts+`${CityID}/all/${type}/all/1000/0`,null)
  
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
          title="Xem thêm"
          toolbarColor={"white"}
          titleStyle={{fontWeight:"bold"}}
        
        />
          {this.state.products.length === 0 && (
            <Layout flex={1} content="center" items="center">
              <NativeBase.Text style={{fontSize:13}}>
                Không có đơn hàng nào
              </NativeBase.Text>
              </Layout>
          )}
             {this.state.products.length > 0 && (
              <NativeBase.Content contentContainerStyle={{padding:15}}>
              { this.renderItem()}
            </NativeBase.Content>
          )}
       
         <ProgressDialog isShow={this.state.isLoading}/>
      </Layout>
    );
  }
 
  renderItem =()=>{
    const {products} = this.state;
    
  return  products.map((e,index)=>{
    const Price =e.Price || 0;
    const typeid = e.typeid || 0
    if(typeid && typeid >0 )
    var DiscountPrice =Price -  (Price * typeid / 100);
    else DiscountPrice =undefined;
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
             <Layout row>
            {DiscountPrice && ( <NativeBase.Text style={{
      fontSize:12, color:Colors.primaryColor, fontWeight:"bold",marginEnd:10,
      marginVertical:3
    }}>{numeral(DiscountPrice).format("0,0")+" ₫"}</NativeBase.Text>)}
               <NativeBase.Text style={{
         
      fontSize:DiscountPrice?10:12, 
      color:DiscountPrice?"black":Colors.primaryColor,
      fontWeight:DiscountPrice?undefined:"bold", 
      opacity:DiscountPrice?0.4:1,
      marginVertical:3,
      textDecorationLine: DiscountPrice?'line-through': "none", textDecorationStyle: 'solid', alignSelf:"center"
    }}>{numeral(Price).format("0,0")+" ₫"}</NativeBase.Text>
            </Layout>
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
    backgroundColor:Colors.BackgroundColor
  },
});
const mapProps =  state =>{
  return {
    isUpdate:state.appReducer.isUpdate
  }
}
export default connect(mapProps)(ListAllProduct);

