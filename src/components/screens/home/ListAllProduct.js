
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
const data = [
  {
  name: "Chicken",
  image: ImageAsset.Food1,
  address:"Ha Noi Viet Nam",
  defaultprice:50,
  Price:45
},
{
  name: "Hambeger",
image: ImageAsset.Food2,
address:"Hung Yen Viet Nam",
defaultprice:50,
Price:45
},
{
  name: "Eggs",
image: ImageAsset.Food3,
address:"Hai Dhong Viet Nam",
defaultprice:50,
Price:45
},
{
  name: "Sheet Cake",
image: ImageAsset.Food4,
address:"Nam Dinh Viet Nam",
defaultprice:50,
Price:45
},
{
  name: "Hot dog",
image: ImageAsset.Food1,
address:"Ca Mau Viet Nam",
defaultprice:50,
Price:45
},
{
name: "Xuc xich",
image: ImageAsset.Food2,
address:"Kien Giang Viet Nam",
defaultprice:50,
Price:45
},
{
name: "Chicken",
image: ImageAsset.Food3,
address:"Ha Noi Viet Nam",
defaultprice:50,
Price:45
},
{
name: "Chicken",
image: ImageAsset.Food4,
address:"Hoang Mai Ha Noi",
defaultprice:50,
Price:45
}

];
const banners =[
  ImageAsset.Food1, ImageAsset.Food3,
  ImageAsset.Food2

]
class ListAllProduct extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
        products: data,
       isLoading:false
      
    };

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
    const Price =e.defaultprice || 0;
   const DiscountPrice = e.Price || 0;
   
      return (
        <TouchableWithoutFeedback 
        onPress={()=>{
          this.props.navigation.navigate("ProductDetailScreen")
        }}
        >
          <View style={{flexDirection:"row", marginTop:15}}>
            <Layout >
              <SmartImage source={e.image} style={{ height:79, width:79, }}/>

            </Layout>
            <Layout margin ={[0,0,10]}>
             <NativeBase.Text   style={{fontSize:13, fontWeight:"bold"}}>
               {e.name}
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

