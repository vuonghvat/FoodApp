
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
  Alert,
  PermissionsAndroid
} from "react-native";
const  height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import { connect} from "react-redux"
import Layout from "../../layouts/Layout"
import {loggedIn, updateScreen} from "../../../redux/app/action"
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
import Geocoder from 'react-native-geocoder';

import URL from "../../../api/URL";
import request from "../../../api/request"

import ProgressDialog from "../../customizes/ProgressDialog";
import Toast from 'react-native-simple-toast';
import SmartImage from "../../customizes/SmartImage";
import StarRating from "react-native-star-rating";
import CustomModal from "../../customizes/CustomModal";
import StaticUser from "../../../utils/StaticUser";
import Geolocation from '@react-native-community/geolocation';

class OrderScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
        items : [],
      isLoading:false,
      isShowPopupReview:false,
      page:1,
      isShip: false,
      TotalPrice:0,
      note:"",
      isFromDetail:false,
      partner:undefined,
      address:""
   
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
const { params} = this.props.route;
console.log(this.props);
if(params){
  if(params.isFromDetail){
    this.setState({isFromDetail : params.isFromDetail})
  }
  if(params.partner){
   
    
    this.setState({partner:params.partner})
  }
}


//isFromDetail
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
          {this.renderProducts()}
          <Layout margin={[20]}>
            {/* <Layout row>
              <NativeBase.Text style={{fontSize:13, fontWeight:"bold"}}>Địa chỉ: </NativeBase.Text>
              <NativeBase.Text  style={{flex:1,alignSelf:"flex-end", textAlign:"right", fontSize:13, }}>Hong van an thi hung Yen sdkjaskd j ksjadsakjd</NativeBase.Text>
            </Layout> */}
          </Layout>
            <Layout row margin={[20]}> 
         <NativeBase.CheckBox 
           color={Colors.primaryColor}
         onPress={()=>{
             this.setState({isShip: false})
         }} checked={!this.state.isShip}/>
          <NativeBase.Text style={{fontSize:13, marginLeft:15}}>Nhận tại cửa hàng</NativeBase.Text>
          </Layout>

         {this.state.partner && this.state.partner.ship===1 && (  <Layout row margin={[10]}> 
         <NativeBase.CheckBox 
        color={Colors.primaryColor}
         onPress={()=>{
          this.setState({isShip: true})
         }} checked={this.state.isShip}/>
          <NativeBase.Text style={{fontSize:13, marginLeft:15}}>Nhận hang tại địa chỉ</NativeBase.Text>
          </Layout>)}
        
         <Layout height={100} radius={6} hidden bgColor={"white"} margin={[15]}>
         {/* <NativeBase.Button onPress={async ()=>{
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
             
              Geolocation.getCurrentPosition(info =>{
                console.log(info)
         
                const NY ={
                  lat:info.coords.latitude,
                   lng: info.coords.longitude
                }
                Geocoder.geocodePosition(NY).then(res=>{
                  console.log(res,NY);
                  this.setState({
                    address: res[0].formattedAddress
                  })
                }).catch(err=>{
                  console.log(err,NY);
                  
                })
              });
        
            }
    
           
          }}>
            <NativeBase.Text>Định vị</NativeBase.Text>
          </NativeBase.Button> */}
             <NativeBase.Input 
            placeholder="Nhập địa chỉ"

             textAlignVertical="top"
             style={{textAlignVertical:"top", padding:10, fontSize:12}}
             style={{flex:1}}
             value={this.state.address}
             onChangeText={address=>this.setState({address})}
             editable ={this.state.isShip}
             />
         </Layout>
         <Layout>
           <NativeBase.Text style={{fontSize:13, fontWeight:"bold", marginTop:20}}>Ghi chú</NativeBase.Text>
           <Layout height={100} radius={6} hidden bgColor={"white"} margin={[15]}>
             <NativeBase.Input 
            placeholder="Ghi chú"
            value={this.state.note}
              onChangeText={note=>this.setState({note})}
             textAlignVertical="top"
             style={{textAlignVertical:"top", padding:10, fontSize:13}}
             style={{flex:1}}
        
             />
         </Layout>
         </Layout>
         <Layout row>
           <NativeBase.Text style={{fontSize:13,flex:1, fontWeight:"bold", marginTop:20}}>Phương thức thanh toán</NativeBase.Text>
           <NativeBase.Text style={{fontSize:14, marginTop:20}}>Thanh toán khi nhận hàng</NativeBase.Text>
          
         </Layout>
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
    console.log(itemsClone);
    
    itemsClone.forEach(e=>{
 
      let product = {
        SourceOfItemsID:e.SourceOfItemsID,
        Total:e.amount,
        Price:e.Price,
        Ship:1,
        Description:e.Description
      }
      orderDetail.push(product);
    })
    const data = {
        CustomerID:StaticUser.getCurrentUser().CustomerID,
        OrderNote:this.state.note,
        OrderPayment:"1",
        Ship:this.state.isShip?1:0,
        shipAddress:this.state.address,
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
    if(!this.state.isFromDetail)
    this.deleteCard();
    this.props.dispatch(updateScreen(true))
    
    Alert.alert(
      '',
      `Bạn đã đặt hàng thành công. Mã đơn hàng của bạn là ${data.message}. Vui lòng cung cấp mã đơn hàng khi đến cửa hàng lấy đồ!`,
      [
       
        {text: 'OK', onPress: () => {
          this.props.navigation.navigate("ProductDetailScreen")
        }},
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
//  CustomerID, SourceOfItemsID, amount

  deleteCard = ()=>{
    const {items} = this.state;
    items.forEach(e=>{
      const data ={
        CustomerID: StaticUser.getCurrentUser().CustomerID,
        SourceOfItemsID: e.SourceOfItemsID,
        amount: e.amount
      }
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

          this.deleteCard();
         
         // this.getProductDetails();
        
        }  
      }
        else{
         // Toast.show("Kiểm tra kết nối", Toast.LONG);
          this.setState({...this.state,isLoading:false})
        }
      
          
        
        
      
      
      }).post(URL.UrlDeleteCard,data)

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
export default connect(mapStateToProps)(OrderScreen);
