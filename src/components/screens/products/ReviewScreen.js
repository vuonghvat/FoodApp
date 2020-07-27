
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
import moment from "moment";

class ReviewScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
        data : [],
      isLoading:false,
     
      isShowPopupReview:false,
      star:0,
      comment:"",
      isRating:false,
      page:1

    

   
    };
    this.pageCount=3;
  }

componentDidMount(){

 this.getReviews(this.state.page);

 
}
getReviews =(page) =>{
    this.setState({isLoading:true})
    
    console.log(this.props);
    
    const {params } = this.props.route;

 request((res,err)=>{
 
  console.log("-----",URL.UrlGetAllReviews,res,err);
  if(res){

   

    const data = res.data;

    if(data.err && data.err =="timeout"){
   
      this.setState({...this.state,isLoading:false})
      this.props.dispatch(loggedIn(false))
      return;
      
    }else{

      this.setState({data,isLoading:false})
    
    }
    

  
     
  }
    else{
      Toast.show("Kiểm tra kết nối", Toast.LONG);
      this.setState({...this.state,isLoading:false})
    }

      
    
    

 //SourceOfItemsID/:limit/:offset
}).get(URL.UrlGetAllReviews +`${params.SourceOfItemsID}/10/${(page -1)*10}`,null)
}

onStarRatingPress = () => {
    
};
renderReview =()=>{
    const {data} = this.state;

  return data.map((e,index)=>{
    const CreateDate = e.CreateDate
 
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
 {moment(CreateDate).format('DD/MM/YYYY')}
   </NativeBase.Text>
 </Layout>

   </Layout>
  <NativeBase.Text style={{fontSize:13}}>{e.Comment}</NativeBase.Text>
 </Layout>
   
   )
  })
 
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
          title="Tất cả đánh giá"
        
          toolbarColor={"white"}
        
        />
      
        <NativeBase.Content contentContainerStyle={{ paddingBottom:60, paddingHorizontal:15}}>
            {this.renderReview()}
        </NativeBase.Content>
        
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
export default connect(mapStateToProps)(ReviewScreen);
