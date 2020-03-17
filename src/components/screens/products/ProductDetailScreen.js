
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

class ProductDetailScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      product:undefined,
      isLoading:false,
      quantity:1,
      isShowPopupReview:false,
      star:0,
      comment:"",
      isRating:false
    

   
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
hasRating =(data) =>{

 request((res,err)=>{
 
  console.log("-----",URL.UrlCheckHasRating,res,err);
  if(res){

   

    const data = res.data;

    if(data.err && data.err =="timeout"){
   
      this.setState({...this.state,isLoading:false})
      this.props.dispatch(loggedIn(false))
      return;
      
    }else{

      this.setState({isRating:data,isLoading:false})
    
    }
    

  
     
  }
    else{
      Toast.show("Kiểm tra kết nối", Toast.LONG);
      this.setState({...this.state,isLoading:false})
    }

      
    
    


}).post(URL.UrlCheckHasRating,data)
}
getProductDetails = ()=>{

  console.log(this.props);
  const { params } = this.props.route;

  
  this.setState({isLoading:true})
 
  request((res,err)=>{
 
    console.log("-----",URL.UrlGetProducts+params.SourceOfItemsID,res,err);
    if(res){

     
 
      const data = res.data;
  
      if(data.err && data.err =="timeout"){
     
        this.setState({...this.state})
        this.props.dispatch(loggedIn(false))
        return;
        
      }else{
        const dataCheck =  {
          SourceOfItemsID:data.SourceOfItemsID,
          CustomerID:data.CustomerID
         }
        this.hasRating(dataCheck);
        this.setState({product:data})
      
      }
      

    
       
    }
      else{
        Toast.show("Kiểm tra kết nối", Toast.LONG);
        this.setState({...this.state})
      }

        
      
      
  

  }).get(URL.UrlGetProducts+params.SourceOfItemsID,null)

}
onQuantityPress =(value)=>{
  let { quantity } = this.state;
  if(value <0 && quantity <= 1){
    value = 0;
  }
  quantity +=  value;
  this.setState({quantity})

}

onStarRatingPress = () => {
    
};
renderReview =(data)=>{

  return data.map((e,index)=>{
    if(index < 2)
    return ( <Layout bgColor="white" style={{elevation:4, padding:8, marginTop:10}}>
    <Layout row> 
 <Layout flex={1}>
  <NativeBase.Text style={{flex:1, fontSize:13}} >{e.CustomerName}</NativeBase.Text>
 </Layout>

   <Layout flex={1} content="center" items ="center">
   <StarRating
       starStyle={{}}
       disabled={false}
       maxStars={5}
       rating={e.rate}
       starSize={13}
       fullStarColor={"#eed816"}
       halfStarColor={"#eed816"}
       emptyStarColor={"#eed816"}
      //  selectedStar={rating => this.onStarRatingPress(rating)}
     />
   </Layout>
 <Layout flex={1}>
 <NativeBase.Text style={{fontSize:12, textAlign:"right"}}>
     {"10/20/2020"}
   </NativeBase.Text>
 </Layout>

   </Layout>
  <NativeBase.Text style={{fontSize:13}}>{e.Comment}</NativeBase.Text>
 </Layout>
   
   )
  })
 
}
  render() {

    let a ={
      itemName: "item 7",
      SourceOfItemsID: "sourceofitems0000004",
      ItemID: "items000000000000008",
      Summary: 100,
      Image: "https://firebasestorage.googleapis.com/v0/b/foodapp-5c233.appspot.com/o/images%2Ffood2.jpg?alt=media&token=3008e35c-cc1f-4751-92e8-c16811a199d2",
      Price: 50000,
      StartTime: "2020-03-14T01:27:21.000Z",
      EndTime: "2020-12-31T00:00:00.000Z",
      Description: "ergdsfgsdfgsdfgdsfgdsfgdsfg",
      FeeID: null,
      view: null,
      PartnerID: "partner0000000000001",
      CustomerID: "customer000000000002",
      PartnerName: "NaBe shop1",
      PartnerAddress: "Xom Ca, Nguyen Xa, Bac Tu Liem",
      PartnerEmail: "tdhoang96@gmail.com",
      PartnerPhone: 957463887,
      PartnerDescription: "chuyen buon ban giay the thao",
      PartnerImage: "https://www.uplevo.com/img/designbox/hinh-nen-dien-thoai-dep-simpson.jpg",
      PartnerTypeID: 0,
      CityID: 1,
      StatusID: 1,
      star: null,
      like: null
    }
    const  { product} = this.state;
    const Image = product?product.Image || "":"";
    const Price = product?product.Price || 0:0;
    const Description = product?product.Description || "":"";
    const view = product?product.view || "":"";
    const PartnerName = product?product.PartnerName || "":"";
    const PartnerAddress = product?product.PartnerAddress || "":"";
    const PartnerEmail = product?product.PartnerEmail || "":"";
    const PartnerPhone = product?product.PartnerPhone || "":"";
    const PartnerDescription = product?product.PartnerDescription || "":"";
    const PartnerImage = product?product.PartnerImage || "":"";
    const star = product?product.star || 0:0;
    const like = product?product.like || 0:0;
    const Name = product?product.ItemName || "":"";
    const rate = product?product.rate || []:[];


    
    return (
      <Layout style={styles.container}>
      
        <NativeBase.Content contentContainerStyle={{ paddingBottom:60}}>
        <Layout height={height/3.2}>
            <SmartImage source = {{ uri : Image}} style={{flex:1}}/>

         </Layout>
          <Layout style={{paddingHorizontal:15}}>
         
         <Layout>

          <NativeBase.Text style={{fontSize:20, fontWeight:"bold", marginVertical:5}}>
                {Name}
                </NativeBase.Text>
                <NativeBase.Text style={{fontSize:18, marginVertical:5,opacity:0.5}}>
                  {numeral(Price).format("0,0") +" ₫"}
                </NativeBase.Text>
                <Layout row>
                  <FastImage resizeMode="contain" source ={ImageAsset.TrackIcon} style={{ height:16, width:16, alignSelf:"center"}} />
                  <NativeBase.Text style={{ marginVertical:5,opacity:0.5, alignSelf:"center", fontSize:12}}>
                  {PartnerAddress}
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
              <NativeBase.Text style={{margin:5, textAlign:"left", fontSize:13}}> Ngon bổ và rẻ vô cùng{"\n"}  maiz o mại zoo</NativeBase.Text>
            </Layout>
           </Layout>
           <Layout>
          <NativeBase.Text style={{fontWeight:"bold", marginTop:20}}>Đánh giá </NativeBase.Text>
             { rate.length > 0 ? this.renderReview(rate):(<NativeBase.Text style={{fontSize:13, marginVertical:15}}>Không có đánh giá</NativeBase.Text>)}
             <View style={{ height:0.5, width:"100%", backgroundColor:"gray"}}/>
             <Layout row>
                  {this.state.isRating &&  (  <TouchableWithoutFeedback onPress={()=>{
                 this.setState({isShowPopupReview:true})
               }}>
                 <View style={{flex:1, justifyContent:"center",padding:10}}>
                   <NativeBase.Text style={{textAlign:"center", fontSize:13}}>
                     Thêm đánh giá
                   </NativeBase.Text>
                 </View>
               </TouchableWithoutFeedback>)}
               { rate.length > 2 && (<View style={{ width:1, height:"100%", backgroundColor:"gray"}}/>)}
                {rate.length > 2  && ( <TouchableWithoutFeedback
                onPress ={()=>{
                  this.props.navigation.navigate("ReviewScreen",{
                    SourceOfItemsID: product.SourceOfItemsID
                  })
                }}
                >
             
             <View style={{flex:1,justifyContent:"center"}}>
             <NativeBase.Text style={{textAlign:"center", fontSize:13, padding:10}}>
                   Xem thêm
                 </NativeBase.Text>
               </View>
             </TouchableWithoutFeedback>)}
               
             </Layout>
               <View style={{ height:0.5, width:"100%", backgroundColor:"gray"}}/>
          </Layout>
          <Layout>
          <NativeBase.Text style={{fontWeight:"bold", marginTop:20}}>Câu hỏi </NativeBase.Text>
             {this.renderReview(rate)}
            
          </Layout>
                  
          </Layout>
        
        </NativeBase.Content>
        <Layout row height ={50} style={{position:"absolute", width:"100%", bottom:0, elevation:5 }}>
          <Layout flex={1} content="center" items = "center" bgColor="white">
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
        <Layout height={50} style={{position:"absolute", top:0, }}>
                  <TouchableWithoutFeedback onPress={()=>{
                    this.props.navigation.goBack();
                  }}>
                    <View>
                    <Layout radius={100} content ={"center"} items ="center" bgColor={"rgba(0, 0, 0, 0.6)"} paddimng ={10} margin={10}>
            <FastImage 
            tintColor="white"
            source ={ImageAsset.ArrowBackIcon} style={{ height:18, width:18, margin:5, tintColor:"white"}} resizeMode="contain"/>
            </Layout>
                    </View>
                  </TouchableWithoutFeedback>

          </Layout>
          {this.renderModalReview()}
        <ProgressDialog isShow={this.state.isLoading}/>
    </Layout>)
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
export default connect(mapStateToProps)(ProductDetailScreen);
