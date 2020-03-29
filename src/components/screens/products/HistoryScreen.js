
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
import StarRating from "react-native-star-rating";
import CustomModal from "../../customizes/CustomModal";
import StaticUser from "../../../utils/StaticUser";

class HistoryScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
        items : [],
      isLoading:false,
      isShowPopupReview:false,
      page:1,
      isShip: false,
      TotalPrice:0,
      note:""
   
    };
   
  }

  renderProducts = ()=>{
      let {items} = this.state;
//       ItemName: "item 5"
// amount: 4
// SourceOfItemsID: "sourceofitems0000002"
// ItemID: "items000000000000006"
// Summary: 5
// Image: "https://firebasestorage.googleapis.com/v0/b/foodapp-5c233.appspot.com/o/images%2Ffood4.jpg?alt=media&token=cead3aa7-4dbb-4735-8bb6-d966200e4e59"
// Price: 5000
// StartTime: "2020-03-14T01:27:21.000Z"
// EndTime: "2020-12-31T00:00:00.000Z"
// Description: "mô tả"
// FeeID: 1
// view: 2
// isChecked: true
      return items.map((e,index)=>{
        return (
            <TouchableWithoutFeedback>
            <View style={{flexDirection:"row", marginTop:14}}>
         
                <Layout flex={1} row>
                <Layout>
                    <SmartImage source={{uri: e.Image}} style={{ height:65, width:65}}/>
                </Layout>
                <Layout flex={1} margin={[0,0,12,0]}>
    
    <NativeBase.Text  numberOfLines={1} ellipsizeMode="tail" style={{fontSize:13, fontWeight:"bold"}}>{e.ItemName}</NativeBase.Text>
    <NativeBase.Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize:12,}}>{e.Description}</NativeBase.Text>
    <NativeBase.Text style={{color:Colors.primaryColor}}>{numeral(e.Price).format("0,0")+" ₫"}</NativeBase.Text>
                   
                </Layout>
               
                </Layout>
                <Layout content="center" items="center" margin={[0,0,0,36]}>
        <NativeBase.Text style={{alignSelf:"center", fontSize:12}}>x {e.amount}</NativeBase.Text>

        
                </Layout>
                <TouchableOpacity 
                onPress={()=>{
                if(items.length>1){
                    items.splice(index, 1);
                    AsyncStorageApp.storeData("order_product",JSON.stringify(items));
                    this.setState({items})
                }else{
                        this.props.navigation.goBack();
                }
             


                }}
                style={{position:"absolute", right:0, top:0}}>
                    <FastImage style={{height:18, width:18,}} resizeMode ="contain" source={ImageAsset.TrashIcon}/>

                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
          );
      })
    
  }
componentDidMount(){

//  this.getAllItems(this.state.page);
AsyncStorageApp._retrieveData("order_product",res=>{
    if(res){
        const TotalPrice = this.totalHandle(res);
        this.setState({items:res, TotalPrice})
    }
    
})
}
totalHandle=(data)=>{
    let TotalPrice =0;
    data.forEach(element => {
        TotalPrice += Number(element.Price) * Number(element.amount)
    });
    return TotalPrice;
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
          title="Thanh toán"
          titleStyle={{fontWeight:"bold"}}
          toolbarColor={"white"}
        
        />
      
        <NativeBase.Content contentContainerStyle={{ paddingBottom:60, paddingHorizontal:15}}>
          <NativeBase.Text>HistoryScreen</NativeBase.Text>
        </NativeBase.Content>
        <Layout row style={{padding:15, backgroundColor:"#f3f3f3"}}>
          <Layout flex={1} content={"center"} items ="center">

     
          <Layout row >
         <NativeBase.Text style={{marginLeft:10}}>Tổng tiền:</NativeBase.Text>
        <NativeBase.Text style={{fontWeight:"bold"}}>{numeral(this.state.TotalPrice).format("0,0")+" ₫"}</NativeBase.Text>
         </Layout>
          </Layout>
        
          <Layout row>
       
       
         <TouchableOpacity
         onPress={this.onOrderPress}
          style={{justifyContent:"center", alignItems:"center", marginLeft:15}}>
             <Layout style={{backgroundColor:Colors.primaryColor,padding:10}} radius={6} hidden>
                 <NativeBase.Text style={{fontWeight:"bold", color:"white"}}>Đặt hàng</NativeBase.Text>
             </Layout>
         </TouchableOpacity>
          </Layout>

        </Layout>
         
        <ProgressDialog isShow={this.state.isLoading}/>
    </Layout>)
  }
  onOrderPress = ()=>{
//     const { star, comment,product} = this.state;
//     if(star ==0){
//       Toast.show("Vui lòng chọn Star Rating", Toast.LONG);
//       return;
//     }

    const {items} = this.state;
    let itemsClone = [...items];
    let orderDetail =[];
    itemsClone.forEach(e=>{
 
      let product = {
        SourceOfItemsID:e.SourceOfItemsID,
        Total:e.amount,
        Price:e.Price,
        Ship:"1",
        Description:e.Description
      }
      orderDetail.push(product);
    })
    const data = {
        ustomerID:StaticUser.getCurrentUser().CustomerID,
        OrderNote:this.state.note,
        OrderPayment:"1",
        orderDetail:orderDetail
    }
    this.setState({isLoading:true})
 console.log(data);
 
request((res,err)=>{

  console.log(res,err);

  
if(res){
  const data = res.data;

  if(data.err && data.err =="timeout"){
 
    this.setState({...this.state,isLoading:false})
    this.props.dispatch(loggedIn(false))
    return;
    
  }else{
    
    this.setState({isLoading:false});
    Alert.alert(
      '',
      'Đặt hàng thành công',
      [
       
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
 
   // this.getProductDetails();
  
  }  
}
  else{
    Toast.show("Kiểm tra kết nối", Toast.LONG);
    this.setState({...this.state,isLoading:false})
  }

    
  
  


}).post(URL.UrlOrder,data,{
    ContentType: 'application/json'
})
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
export default connect(mapStateToProps)(HistoryScreen);
