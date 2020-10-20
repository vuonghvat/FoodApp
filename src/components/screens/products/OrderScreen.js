
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
const items = [
  {
    name: "Chicken",
    image: ImageAsset.Food1,
    address:"Ha Noi Viet Nam",
    defaultprice:50,
    Price:45,
    amount:1,
  },
  {
    name: "Hambeger",
    image: ImageAsset.Food2,
    address:"Hung Yen Viet Nam",
    defaultprice:50,
    Price:45,
    amount:1,
  },
  {
    name: "Eggs",
    image: ImageAsset.Food3,
    address:"Hai Dhong Viet Nam",
    defaultprice:50,
    Price:45,
    amount:1,
  },
];
class OrderScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      items : items,
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
  
  renderProducts = ()=>{
      let {items} = this.state;
      return items.map((e,index)=>{
        const Price =e.defaultprice || 0;
        const DiscountPrice = e.Price || 0;
        return (
            <TouchableWithoutFeedback>
            <View style={{flexDirection:"row", marginTop:14}}>
         
                <Layout flex={1} row>
                <Layout>
                    <SmartImage source={e.image} style={{ height:65, width:65}}/>
                </Layout>
                <Layout flex={1} margin={[0,0,12,0]}>
    
        <NativeBase.Text  numberOfLines={1} ellipsizeMode="tail" style={{fontSize:13, fontWeight:"bold"}}>{e.name}</NativeBase.Text>
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



totalHandle=(data,partner)=>{
  console.log(partner);
  
  

    let TotalPrice =0;
    let DiscountTotalPrice = 0;

    data.forEach(element => {
     
        TotalPrice += Number(element.Price) * Number(element.amount);
        DiscountTotalPrice += Number(element.Price) * Number(element.amount);
      
     
    });
   
  
    return {
      TotalPrice,
      DiscountTotalPrice
    };
}
  getCurrentPosition = () => {
  
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
            data={items}
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
        
       this.props.navigation.push("ProductDetailScreen")
      }}>
        <View>
      <Layout style={{height:height/5, width:height/6}} margin={[0,0,0,15]} radius={3} hidden>
        <SmartImage source={  item.item.image} style={{height:90, width:"100%"}} />
        <Layout>
          <NativeBase.Text style={{fontSize:13, fontWeight:"bold"}}>
            {item.item.name}
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
  Alert.alert(
        '',
        `Bạn đã đặt hàng thành công. Mã đơn hàng của bạn là ${"123456"}. Vui lòng cung cấp mã đơn hàng khi đến cửa hàng lấy đồ!`,
        [
          {text: 'Chi tiết', onPress: () => {
            this.props.navigation.replace("HistoryDetailScreen")
          }},
    
          {text: 'Quay về Home', onPress: () => {
            this.props.navigation.navigate("TabScreen")
          }},
        ],
        { cancelable: false }
      )
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
