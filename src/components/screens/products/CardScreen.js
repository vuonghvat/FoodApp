
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

class CardScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
        items : [],
      isLoading:false,
      isShowPopupReview:false,
      page:1,
      TotalPrice:0,
      isCheckAll:false,
      partner:undefined

    

   
    };
    this.pageCount=3;
  }

componentDidMount(){

 this.getAllItems(this.state.page);

 
}
getAllItems =(page) =>{
    this.setState({isLoading:true})
    
    console.log(this.props);
    
    const {params } = this.props.route;


 request((res,err)=>{

 
  //console.log("-----",URL.UrlGetItemCard,res,err);
  this.setState({...this.state,isLoading:false})
  if(res){

   
   
    const data = res.data;

    if(data.err && data.err =="timeout"){
   
      this.setState({...this.state,isLoading:false})
      this.props.dispatch(loggedIn(false))
      return;
      
    }else{
     
     const  partner =data.Partner
     let TotalPrice =0;
      if(data.ListItems)
       TotalPrice =  data.ListItems.length >0 ?this.totalHandle(data.ListItems):0;
  
      this.setState({items:data.ListItems,partner,isLoading:false, TotalPrice:TotalPrice})
    
    }
    

  
     
  }
    else{
      Toast.show("Kiểm tra kết nối", Toast.LONG);
      this.setState({...this.state,isLoading:false})
    }

      
    
    

 //SourceOfItemsID/:limit/:offset
}).get(URL.UrlGetItemCard +`${params.CustomerID}`,null)
}
totalHandle=(data)=>{
    let TotalPrice =0;
    data.forEach(element => {
        TotalPrice += Number(element.Price) * Number(element.amount)
    });
    return TotalPrice;
}
onStarRatingPress = () => {
    
};
changeCheck =(index)=>{
  let { items} = this.state;

    if(items[index].isChecked){
      items[index].isChecked =false
    }else{
      items[index].isChecked =true
    }
    this.setState({items})

}
renderItem=()=>{
    const {items} = this.state;
 
      
    return items.map((e,index)=>{
      const Price =e.Price || 0;
      const typeid = e.typeid || 0
      if(typeid && typeid >0 )
      var DiscountPrice =Price -  (Price * typeid / 100);
      else DiscountPrice =undefined;
      console.log("itemmmmmmmmmmmmmmmmmmmmmmmmmm", e);

        return (
            <TouchableWithoutFeedback>
                <View style={{flexDirection:"row", marginTop:14}}>
             
                    <NativeBase.CheckBox onPress={()=>this.changeCheck(index)} style={{marginRight:20, marginTop:20}} checked={e.isChecked?e.isChecked:false} color={Colors.primaryColor}/>
                
                    <Layout>
                        <SmartImage source={{uri: e.Image}} style={{ height:65, width:65}}/>
                    </Layout>
                    <Layout flex={1} margin={[0,0,12,0]}>

        <NativeBase.Text style={{fontSize:13, fontWeight:"bold"}}>{e.ItemName}</NativeBase.Text>
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
            </Layout><NativeBase.Text style={{color:Colors.primaryColor}}>{numeral(e.Price).format("0,0") +" ₫"}</NativeBase.Text>


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
    let { items } = this.state;
    if(value <0 && items[index].amount <= 1){
      value = 0;
    }
    items[index].amount +=  value;
    const TotalPrice = this.totalHandle(items);
    this.setState({items,TotalPrice})
  
  }
  
  checkAll =()=>{
    let { items, isCheckAll} = this.state;
   
      var cloneData = JSON.parse(JSON.stringify(items));
    
    if(isCheckAll){
      cloneData.map(e=>{
   
        e.isChecked = false;
        return e;
      
    })
    
  

    this.setState({items:cloneData, isCheckAll: false});
  }else{
   cloneData.map(e=>{
     
      e.isChecked =true;
      return e;
  
  })
 
  
  this.setState({items:cloneData, isCheckAll: true});
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
        <NativeBase.Text style={{fontWeight:"bold"}}>{numeral(this.state.TotalPrice).format("0,0") +" ₫"}</NativeBase.Text>
         </Layout>
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
          {this.renderModalReview()}
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
    let { items} = this.state;
   // let orderItems = [];
    if(this.checkHasProduct()){
      items = items.filter(e=>{
        return e.isChecked == true;
      })
     // alert();
      AsyncStorageApp.storeData("order_product",JSON.stringify(items));
      console.log("ITEMS ORDER: ",  this.state.partner);
   

      this.props.navigation.navigate("OrderScreen",{
        partner : this.state.partner
      });
      return;
    }
  

    Toast.show("Vui lòng chọn sản phẩm cần mua", Toast.LONG);





    //     const { star, comment,product} = this.state;
    //     if(star ==0){
    //       Toast.show("Vui lòng chọn Star Rating", Toast.LONG);
    //       return;
    //     }
    //     const data = {
            
    //         ustomerID:"customer000000000001",
    //         OrderNote:"dm vuong",
    //         OrderPayment:"1",
    //         orderDetail:[
    //           {
    //             SourceOfItemsID:"sourceofitems0000001",
    //             Total:"3",
    //             Price:"50000",
    //             Ship:"1",
    //             Description:"nhieu tuong ot"
    //           }
    //         ]  
    //     }
    //     this.setState({isLoading:true})
    // request((res,err)=>{

    // console.log("-----",URL.UrlCreateReview,res,err);
    // if(res){
    //   const data = res.data;

    //   if(data.err && data.err =="timeout"){
    
    //     this.setState({...this.state,isLoading:false})
    //     this.props.dispatch(loggedIn(false))
    //     return;
        
    //   }else{
    //     this.setState({isShowPopupReview:false,isLoading:false})
    //     this.getProductDetails();
    //   }  
    // }
    //   else{
    //     Toast.show("Kiểm tra kết nối", Toast.LONG);
    //     this.setState({...this.state,isLoading:false})
    //   }
    // }).post(URL.UrlOrder,data)
  }

  rateStar =(star)=>{
  
    this.setState({star})
  }

  onSubmitReview = ()=>{

      const { star, comment,product} = this.state;
      if(star ==0){
        Toast.show("Vui lòng chọn Star Rating", Toast.LONG);
        return;
      }
      const data = {
        CustomerID: product.CustomerID ,
        SourceOfItemsID: product.SourceOfItemsID,
        Rate: star,
        Comment: comment
      }

      this.setState({isLoading:true})
      request((res,err)=>{
    
      console.log("-----",URL.UrlCreateReview,res,err);
      if(res){

    const data = res.data;

    if(data.err && data.err =="timeout"){
   
      this.setState({...this.state,isLoading:false})
      this.props.dispatch(loggedIn(false))
      return;
    }else{
      this.setState({isShowPopupReview:false,isLoading:false})
      this.getProductDetails();
    }   
  }
    else{
      Toast.show("Kiểm tra kết nối", Toast.LONG);
      this.setState({...this.state,isLoading:false})
    }

      
    
    


  }).post(URL.UrlCreateReview,data)
  }


  renderModalReview =()=>{
    return ( <CustomModal
    isShow={this.state.isShowPopupReview}
    renderContent={
      <View style={{ padding: 20 }}>
      
        <View style={{ flexDirection: "row" }}>
       
          <View style={{  }}>
            <NativeBase.Text style={{fontSize:18, fontWeight:"bold"}}>
              Đánh giá
            </NativeBase.Text>
    <NativeBase.Text style={{fontSize:13}}>{StaticUser.getCurrentUser().name}</NativeBase.Text>
          </View>
        </View>
        <View style={{ alignItems: "center", padding: 10 }}>
          <StarRating
            starStyle={{}}
            disabled={false}
            maxStars={5}
            rating={this.state.star}
            starSize={20}
            fullStarColor={"#eed816"}
            halfStarColor={"#eed816"}
            emptyStarColor={"#eed816"}
            selectedStar={rating => this.rateStar(rating)}
          />
        </View>
        <View
          style={{ height: 156, backgroundColor: "white", borderRadius: 6 }}
        >
          <NativeBase.Input
            multiline={true}
            placeholder={"Bình luận"}
            style={[
             
              {
                textAlignVertical: "top",
                fontSize:13
              },
            ]}
            onChangeText={comment => this.setState({comment})}
          />
        </View>
      
        <NativeBase.Button
          onPress={this.onSubmitReview}
          style={{ backgroundColor: Colors.primaryColor, justifyContent:"center" , alignItems:"center"}}
        >
          <NativeBase.Text>Gửi</NativeBase.Text>
        </NativeBase.Button>
        <TouchableOpacity
          onPress={() =>{
            this.setState({isShowPopupReview:false})
          }}
          style={{ position: "absolute", top: 6, right: 6 }}
        >
          <Image
            style={{
              width: 24,
              height: 24,
            }}
            source={ImageAsset.CloseIcon}
          />
        </TouchableOpacity>
        
      </View>
    }
  />
);
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
