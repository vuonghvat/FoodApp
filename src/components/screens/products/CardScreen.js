
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
import URL from "../../../api/URL";
import request from "../../../api/request"

import ProgressDialog from "../../customizes/ProgressDialog";
import Toast from 'react-native-simple-toast';
import SmartImage from "../../customizes/SmartImage";


class CardScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
        items : items,
      isLoading:false,
      isShowPopupReview:false,
      page:1,
      TotalPrice:0,
      DiscountTotalPrice:0,
      isCheckAll:false,
      partner:undefined

    

   
    };
    this.pageCount=3;
  }


totalHandle=(data,partner)=>{
 

    let TotalPrice =0;
    let DiscountTotalPrice = 0;
    data.forEach(element => {
      if(element.isChecked){
        TotalPrice += Number(element.defaultprice) * Number(element.amount);
        DiscountTotalPrice += Number(element.Price) * Number(element.amount);
      }
     
    });

    return {
      TotalPrice,
      DiscountTotalPrice
    };
}
onStarRatingPress = () => {
    
};
changeCheck =  (index)=>{
  let { items,partner} = this.state;

    if(items[index].isChecked){
      items[index].isChecked =false
    }else{
      items[index].isChecked =true
    }
    const {TotalPrice, DiscountTotalPrice} =  this.totalHandle(items,partner); 
   
   this.setState({items,DiscountTotalPrice,TotalPrice})
 
}
renderItem=()=>{
    const {items} = this.state;
 
      
    return items.map((e,index)=>{
      const Price =e.defaultprice || 0;
      const DiscountPrice = e.Price || 0;
    


        return (
            <TouchableWithoutFeedback>
                <View style={{flexDirection:"row", marginTop:14}}>
             
                    <NativeBase.CheckBox onPress={()=>this.changeCheck(index)} style={{marginRight:20, marginTop:20}} checked={e.isChecked?e.isChecked:false} color={Colors.primaryColor}/>
                
                    <Layout>
                        <SmartImage source={ e.image} style={{ height:65, width:65}}/>
                    </Layout>
                    <Layout flex={1} margin={[0,0,12,0]}>

        <NativeBase.Text style={{fontSize:13, fontWeight:"bold"}}>{e.name}</NativeBase.Text>
        <NativeBase.Text style={{fontSize:12,}}>{e.Description}</NativeBase.Text>


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
            


                        <Layout row style={{borderWidth:0.5, borderColor:"gray", marginVertical:5, marginHorizontal:1, alignSelf:"flex-start"}}>
                         <TouchableOpacity
                         onPress={()=>this.changeQuantity(-1,index)}
                         >  

                              <FastImage style={{height:18, width:18, alignSelf:"center"}} resizeMode="contain" source={ImageAsset.Minusicon} /></TouchableOpacity>
        <NativeBase.Text style={{fontSize:13, paddingHorizontal:12,borderWidth:0.5, borderColor:"gray", }}>{e.amount}</NativeBase.Text>
                            <TouchableOpacity
                              onPress={()=>this.changeQuantity(1,index)}
                            >
                                <FastImage style={{height:18, width:18, alignSelf:"center"}} resizeMode="contain" source={ImageAsset.PlusIcon} /></TouchableOpacity>
                        </Layout>
                    </Layout>
                </View>
            </TouchableWithoutFeedback>
        );
    })
}


changeQuantity =(value,index)=>{
    let { items,partner } = this.state;
    if(value <0 && items[index].amount <= 1){
      value = 0;
    }
    items[index].amount +=  value;
    const {TotalPrice, DiscountTotalPrice} = this.totalHandle(items,partner);
    this.setState({items,TotalPrice,DiscountTotalPrice})
  
  }
  
  checkAll =()=>{
    let { items, isCheckAll,partner} = this.state;
   
      var cloneData = JSON.parse(JSON.stringify(items));
    
    if(isCheckAll){
      cloneData.map(e=>{
   
        e.isChecked = false;
        return e;
      
    })
    
  
    const {TotalPrice, DiscountTotalPrice} =  this.totalHandle(cloneData,partner); 
   
    this.setState({items:cloneData,DiscountTotalPrice,TotalPrice,isCheckAll: false})

  
  }else{
   cloneData.map(e=>{
     
      e.isChecked =true;
      return e;
  
  })
 
  const {TotalPrice, DiscountTotalPrice} =  this.totalHandle(cloneData,partner); 
   
  this.setState({items:cloneData,DiscountTotalPrice,TotalPrice,isCheckAll: true})
 
  }

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
          title="Giỏ hàng"
          titleStyle={{fontWeight:"bold"}}
          toolbarColor={"white"}
        
        />
      
        <NativeBase.Content contentContainerStyle={{ paddingBottom:60, paddingHorizontal:15}}>
            {this.renderItem()}
        </NativeBase.Content>
        <Layout row style={{padding:15, backgroundColor:"#f3f3f3"}}>
          <Layout flex={1}>

        <Layout row> 
         <NativeBase.CheckBox onPress={()=>this.checkAll()} checked={this.state.isCheckAll}/>
          <NativeBase.Text style={{fontSize:13, marginLeft:15}}>Chọn tất cả</NativeBase.Text></Layout>
          <Layout row >
         <NativeBase.Text style={{marginLeft:10}}>Tổng tiền:</NativeBase.Text>
        <NativeBase.Text style={{fontWeight:"bold", textDecorationLine: this.state.DiscountTotalPrice >0? 'line-through':'none', textDecorationStyle: 'solid',}}>{numeral(this.state.TotalPrice).format("0,0") +" ₫"}</NativeBase.Text>
         </Layout>
         {this.state.DiscountTotalPrice >0 && ( <Layout row >
         <NativeBase.Text style={{marginLeft:10}}>Tổng tiền khuyến mãi:</NativeBase.Text>
        <NativeBase.Text style={{fontWeight:"bold"}}>{numeral(this.state.DiscountTotalPrice).format("0,0") +" ₫"}</NativeBase.Text>
         </Layout>)}
        
          </Layout>
        
          <Layout row>
         <TouchableOpacity
         onPress={this.onOrderPress}
          style={{justifyContent:"center", alignItems:"center", marginLeft:15}}>
             <Layout style={{backgroundColor:Colors.primaryColor,padding:10,}} radius={6} hidden>
                 <NativeBase.Text style={{fontWeight:"bold", color:"white"}}>Mua hàng</NativeBase.Text>
             </Layout>
         </TouchableOpacity>
          </Layout>

        </Layout>
         
        <ProgressDialog isShow={this.state.isLoading}/>
    </Layout>)
  }

  checkHasProduct = ()=>{
    const { items} = this.state;
    let isChecked = false;
    items.forEach(e=>{
        if(e.isChecked){
          
          isChecked =  true;
          
        }
    })
    return isChecked;
  }

  onOrderPress = ()=>{
    this.props.navigation.navigate('OrderScreen')
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
export default connect(mapStateToProps)(CardScreen);
