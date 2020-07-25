
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
import {checkPermission, requestPermission} from 'react-native-android-permissions';
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
import RNAndroidLocationEnabler from "react-native-android-location-enabler";

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
      address:"",
      listRecommend:[],
      DiscountTotalPrice: 0
   
    };
   
  }
  getListRecommend = ()=>{
    request((res,err)=>{
   
     // console.log("-----",URL.UrlGetProducts+params.SourceOfItemsID,res,err);
      if(res){
  
       
          console.log(res);
          
        const data = res.data;
    
        if(data.err && data.err =="timeout"){
       
          this.setState({...this.state})
          this.props.dispatch(loggedIn(false))
          return;
          
        }else{
          // const dataCheck =  {
          //   SourceOfItemsID:data.SourceOfItemsID,
          //   CustomerID:data.CustomerID
          //  }
          // this.hasRating(dataCheck);
          // this.setState({product:data})
          this.setState({listRecommend:data, isLoading:false})
        
        }
        
  
      
         
      }
        else{
          Toast.show("Kiểm tra kết nối", Toast.LONG);
          this.setState({...this.state})
        }
  
          
        
        
    
  
    }).get(URL.UrlGetRecommend+StaticUser.getCurrentUser().CustomerID,null)
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
        const Price =e.defaultprice || 0;
        const DiscountPrice = e.Price || 0;
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
                     const {TotalPrice, DiscountTotalPrice } = this.totalHandle(items, this.state.partner );
         
      
                    this.setState({items,TotalPrice,DiscountTotalPrice})
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
this.getListRecommend()
const { params} = this.props.route;

if(params){
  if(params.isFromDetail){
    this.setState({isFromDetail : params.isFromDetail})
  }
  if(params.partner){
   
    AsyncStorageApp._retrieveData("order_product",res=>{
      if(res){
        console.log("ress",res,params.partner);
        
          const {TotalPrice, DiscountTotalPrice } = this.totalHandle(res, params.partner );

          this.setState({items:res, TotalPrice,DiscountTotalPrice, partner:params.partner})
      }
      
  })
   
  }
}


//isFromDetail

}
totalHandle=(data,partner)=>{
  console.log(partner);
  
  const conditionid = partner? partner.conditionid || 0: 0;
  const typeid = partner?partner.typeid || 0:0;

    let TotalPrice =0;
    let DiscountTotalPrice = 0;

    data.forEach(element => {
     
        TotalPrice += Number(element.Price) * Number(element.amount);
        DiscountTotalPrice += Number(element.Price) * Number(element.amount);
      
     
    });
   
  
    if( typeid !==0 && DiscountTotalPrice >= Number(conditionid)){
      DiscountTotalPrice =TotalPrice -  (TotalPrice * Number(typeid)/100 )
    }else{
      DiscountTotalPrice = 0
    }
    console.log('hahah',DiscountTotalPrice,TotalPrice,Number(conditionid));
    
    
    console.log("TotalPrice",TotalPrice,DiscountTotalPrice);
    return {
      TotalPrice,
      DiscountTotalPrice
    };
}
getCurrentPosition = () => {
  Geolocation.getCurrentPosition(info => {
      // this.setLocation(info)
      console.log(info);
      var NY = {
        lat: info.coords.latitude,
        lng: info.coords.longitude
      };
      
      Geocoder.geocodePosition(NY).then(res => {
        console.log("res",res);
        this.setState({address: res[0].formattedAddress})
        
      })
      .catch(err => console.log(err))

      },
      error => {
          console.log('error', error);
          if (Platform.ios !== 'ios') {
              console.log('error', error);
              RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 200, fastInterval: 1500 })
                  .then(data => {
                    console.log('data', data);
                     this.getCurrentPosition();
                  }).catch(err => {
                  });
          }
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
  );
};
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
          <NativeBase.Text style={{fontSize:13, marginLeft:15}}>Nhận hàng tại địa chỉ</NativeBase.Text>
          </Layout>)}
        
         <Layout height={100} radius={6} hidden bgColor={"white"} margin={[15]}>
         <NativeBase.Button onPress={async ()=>{

            checkPermission("android.permission.ACCESS_FINE_LOCATION").then((result) => {
              this.getCurrentPosition()
            }, (result) => {
              requestPermission("android.permission.ACCESS_FINE_LOCATION").then((result) => {

              this.getCurrentPosition()
              
              }, (result) => {
                console.log("Not Granted!");
                console.log(result);
              });
            });

           
          }}>
            <NativeBase.Text>Định vị</NativeBase.Text>
          </NativeBase.Button>
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
         <Layout>
          <NativeBase.Text style={{fontWeight:"bold", marginTop:20}}>Sản phẩm liên quan </NativeBase.Text>
          <FlatList
            contentContainerStyle={{}}
            horizontal
            style={{
              marginTop:10
          
            }}
            data={this.state.listRecommend}
            showsHorizontalScrollIndicator={false}
            renderItem={item => (
              <BaseItemList renderView={this.renderItem(item)} />
            )}
            keyExtractor={(item, index) => index.toString()}
            />
          </Layout>
        </NativeBase.Content>
        <Layout row style={{padding:15, backgroundColor:"#f3f3f3"}}>
         


       
       
          <Layout row  flex={1}>
       
         <NativeBase.Text style={{marginLeft:0}}>Tổng tiền:   </NativeBase.Text>
      <Layout>
       
         {this.state.DiscountTotalPrice > 0 && (<NativeBase.Text style={{fontWeight:"bold", textDecorationLine:"line-through"}}>
         
         { numeral(this.state.TotalPrice).format("0,0")+" ₫"}
        </NativeBase.Text>) }
        
        <NativeBase.Text style={{fontWeight:"bold"}}>
          { this.state.DiscountTotalPrice !== 0 ?
          numeral(this.state.DiscountTotalPrice).format("0,0")+" ₫"
          :
          numeral(this.state.TotalPrice).format("0,0")+" ₫"}
        </NativeBase.Text>
       
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
  renderItem =(item)=>{
    const Price =item.item.defaultprice || 0;
    const DiscountPrice = item.item.Price || 0;
    return (
      <TouchableWithoutFeedback onPress={()=>{
        console.log(this.props);
        
       this.props.navigation.push("ProductDetailScreen",{
        SourceOfItemsID: item.item.SourceOfItemsID,
       
       })
      }}>
        <View>
      <Layout style={{height:height/5, width:height/6}} margin={[0,0,0,15]} radius={3} hidden>
        <SmartImage source={ { uri: item.item.Image}} style={{height:90, width:"100%"}} />
        <Layout>
          <NativeBase.Text style={{fontSize:13, fontWeight:"bold"}}>
            {item.item.ItemName}
          </NativeBase.Text>
          <Layout row>
            {DiscountPrice && ( <NativeBase.Text style={{
      fontSize:12, color:Colors.primaryColor, fontWeight:"bold",marginEnd:10,
      marginVertical:3
    }}>{numeral(DiscountPrice).format("0,0")+" ₫"}</NativeBase.Text>)}
               <NativeBase.Text style={{
         
      fontSize:DiscountPrice?10:12, color:DiscountPrice?"black":Colors.primaryColor,fontWeight:DiscountPrice?undefined:"bold", opacity:DiscountPrice?0.4:1,
      marginVertical:3,textDecorationLine: DiscountPrice?'line-through': "none", textDecorationStyle: 'solid', alignSelf:"center"
    }}>{numeral(Price).format("0,0")+" ₫"}</NativeBase.Text>
            </Layout>
        
        </Layout>
      </Layout>
      </View>
      </TouchableWithoutFeedback>

    )
  }
  onOrderPress = ()=>{
    Alert.alert(
      '',
      `Đơn hàng của bạn sẽ tự động bị huỷ nếu sau 30 phút kể từ thời gian đặt hàng thành công, bạn chưa nhận được đồ. Bạn có chắc chắn muốn đặt`,
      [
        {text: 'Có', onPress: () => {
          this.orderAPI()
        }},
   
        {text: 'Không', onPress: () => {
         
        }},
      ],
      { cancelable: false }
    )
    
   
  }
  orderAPI = ()=>{
    const {items,partner,DiscountTotalPrice, TotalPrice} = this.state;
    let itemsClone = [...items];
    let orderDetail =[];
    const promotionid = partner.promotionid || ""
    console.log(partner);
    
    itemsClone.forEach(e=>{
 
      let product = {
        SourceOfItemsID:e.SourceOfItemsID,
        Total:e.amount,
        Price:DiscountTotalPrice ==0?TotalPrice :DiscountTotalPrice ,
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
        orderDetail:orderDetail,
        PartnerID:partner.PartnerID,
        promotionid

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
        {text: 'Chi tiết', onPress: () => {
          this.props.navigation.replace("HistoryDetailScreen", {
            OrderID : data.message
          })
        }},
   
        {text: 'Quay về Home', onPress: () => {
          this.props.navigation.navigate("TabScreen")
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
