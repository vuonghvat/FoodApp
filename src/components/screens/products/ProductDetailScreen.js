
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
import { FlatList } from "react-native-gesture-handler";
import BaseItemList from "../../customizes/BaseItemList";
import numeral from "numeral"

import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorageApp from "../../../utils/AsyncStorageApp";
const data = [
  {
  name: "Chicken",
  image: ImageAsset.Food1,
  address:"Ha Noi Viet Nam"
},
{
  name: "Hambeger",
image: ImageAsset.Food2,
address:"Hung Yen Viet Nam"
},
{
  name: "Eggs",
image: ImageAsset.Food3,
address:"Hai Dhong Viet Nam"
},
{
  name: "Sheet Cake",
image: ImageAsset.Food4,
address:"Nam Dinh Viet Nam"
},
{
  name: "Hot dog",
image: ImageAsset.Food1,
address:"Ca Mau Viet Nam"
},
{
name: "Xuc xich",
image: ImageAsset.Food2,
address:"Kien Giang Viet Nam"
},
{
name: "Chicken",
image: ImageAsset.Food3,
address:"Ha Noi Viet Nam"
},
{
name: "Chicken",
image: ImageAsset.Food4,
address:"Hoang Mai Ha Noi dasdsadas đâsdas"
}

];
import URL from "../../../api/URL";
import request from "../../../api/request"

import ProgressDialog from "../../customizes/ProgressDialog";
import Toast from 'react-native-simple-toast';
import SmartImage from "../../customizes/SmartImage";

class ProductDetailScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      isLogged:false,
      keySearch:"",
      location:"Ha Noi",
      cities:[],
      CityID: 1,
      isLoading:false,
      lastestProducts:[],
      viewMostProducts:[],
      allProducts:[],
      quantity:1

   
    };
    this.pageCount=3;
  }
  _renderDotIndicator() {
    return <PagerDotIndicator 
    style={{position:"absolute", bottom:0, right:0, left:0}}
    
    selectedDotStyle={{backgroundColor:Colors.Black, width:10, height:10, borderRadius:10, opacity:0.5}}
    pageCount={this.pageCount} />;
}
componentDidMount(){

 this.getProductDetails();
 
}
getProductDetails = ()=>{

  console.log(this.props);
  const { params } = this.props.route;

  
  this.setState({isLoading:true})
  const data ={
    SourceOfItemsID: params.SourceOfItemsID
  }
  request((res,err)=>{
 
    console.log("-------",URL.UrlViewProduct,res,err);
    if(res){


      const data = res.data;
  
      if(data.err && data.err =="timeout"){
     
        this.setState({...this.state,isLoading:false})
        this.props.dispatch(loggedIn(false))
        return;
        
      }else{

       
      
      }
      

    
       
    }
      else{
        Toast.show("Kiểm tra kết nối", Toast.LONG);
        this.setState({...this.state,isLoading:false})
      }

        
      
      
  

  }).post(URL.UrlViewProduct,data)

}
onQuantityPress =(value)=>{
  let { quantity } = this.state;
  if(value <0 && quantity <= 1){
    value = 0;
  }
  quantity +=  value;
  this.setState({quantity})

}

  render() {
 
    return (
      <Layout style={styles.container}>

        <NativeBase.Content contentContainerStyle={{paddingHorizontal:10, paddingBottom:60}}>
         <Layout height={height/3.2}>
            <SmartImage source = {{ uri :""}} style={{flex:1}}/>

         </Layout>
         <Layout>

          <NativeBase.Text style={{fontSize:20, fontWeight:"bold", marginVertical:5}}>
                Gà rán chien giòn
                </NativeBase.Text>
                <NativeBase.Text style={{fontSize:18, marginVertical:5,opacity:0.5}}>
                  {numeral(100000).format("0,0") +" ₫"}
                </NativeBase.Text>
                <Layout row>
                  <FastImage resizeMode="contain" source ={ImageAsset.TrackIcon} style={{ height:16, width:16, alignSelf:"center"}} />
                  <NativeBase.Text style={{ marginVertical:5,opacity:0.5, alignSelf:"center"}}>
                  {"Ân Thi Hưng Yên"}
                </NativeBase.Text>
                </Layout>
         </Layout>
         <Layout height={0.5} width="100%" bgColor="gray" style={{marginVertical:5}}/>
         <Layout>
         <Layout row>
             <NativeBase.Text style={{flex:1}}>
              Còn lại: 
             </NativeBase.Text>
                  <NativeBase.Text style={{fontWeight:"bold"}}>
                    {12}
                  </NativeBase.Text>
           </Layout>
           <Layout row>
             <NativeBase.Text style={{flex:1}}>
               Số lượng: 
             </NativeBase.Text>
             <Layout row>
                <TouchableOpacity 
                onPress={()=>{
                  this.onQuantityPress(-1)
                }}
                style={{alignSelf:"center"}}>
                <FastImage 
                tintColor ={Colors.primaryColor}
                resizeMode="contain" source={ImageAsset.Minusicon} style={{height:20, width:20, alignSelf:"center", 
                tintColor:Colors.primaryColor}}/>
                </TouchableOpacity>
               <NativeBase.Text style={{fontSize:20, fontWeight:"bold", marginHorizontal:5 , alignSelf:"center"}}>
                {this.state.quantity}
               </NativeBase.Text>
               <TouchableOpacity
                   onPress={()=>{
                    this.onQuantityPress(1)
                  }}
               style={{alignSelf:"center"}}>
                <FastImage
                tintColor ={Colors.primaryColor}
                 resizeMode="contain" source={ImageAsset.PlusIcon} style={{height:20, width:20, 
                  alignSelf:"center",tintColor:Colors.primaryColor}}/>
                </TouchableOpacity>
            
             </Layout>
           </Layout>
           
           <Layout row>
            
           </Layout>
           <Layout row></Layout>
         </Layout>
           <Layout height={0.5} width="100%" bgColor="gray" style={{marginVertical:5}}/>
           <Layout>
      
            <Layout>
              <NativeBase.Text style={{fontWeight:"bold"}}>Mô tả </NativeBase.Text>
              <NativeBase.Text style={{margin:5, textAlign:"left"}}> Ngon bổ và rẻ vô cùng{"\n"}  maiz o mại zoo</NativeBase.Text>
            </Layout>
           </Layout>
         
        </NativeBase.Content>
        <Layout row height ={50} style={{position:"absolute", width:"100%", bottom:0, elevation:5 }}>
          <Layout flex={1} content="center" items = "center">
            <NativeBase.Text>
              Thêm vào giỏ
            </NativeBase.Text>
          </Layout>
          <Layout row flex={1} content="center" items ="center" bgColor={Colors.primaryColor} style={{elevation:5}}>
            <FastImage
            tintColor={"white"}
             source={ImageAsset.CardIcon} style={{ alignSelf:"center", width:20, height:20, tintColor:"white", marginRight:6 }}/>
            <NativeBase.Text style={{fontWeight:"bold", color:"white"}}>
              Đặt hàng
            </NativeBase.Text>
          </Layout>
        </Layout>
        <ProgressDialog isShow={this.state.isLoading}/>
    </Layout>)
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
export default connect(mapStateToProps)(ProductDetailScreen);
