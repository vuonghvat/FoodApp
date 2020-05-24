
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

class QAScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      QA : undefined,
      isLoading:false,
      comment:"",

    

   
    };
 
  }

componentDidMount(){

    const {params} = this.props.route;
    if(params){
        if(params.QA){
          console.log(params.QA);
          
            this.setState({QA:params.QA})
        }
    }
 //this.getReviews(this.state.page);

 
}
addComment =() =>{
    this.setState({isLoading:true})
    
    console.log(this.props);
    
    const {params } = this.props.route;
    console.log(StaticUser.getCurrentUser(),"----------------------------------");
    
    const data ={
        CustomerID : StaticUser.getCurrentUser().CustomerID,
        anser: this.state.comment,
         QnAID: params.QA.cauhoi.ID
    }
 request((res,err)=>{
 
  //console.log("-----",URL.UrlGetAllReviews,res,err);
  if(res){
    console.log(res);

    const data = res.data;

    if(data.err && data.err =="timeout"){
   
      this.setState({...this.state,isLoading:false})
      this.props.dispatch(loggedIn(false))
      return;
      
    }else{
      let {QA} = this.state;
      const as ={
      CreateDate: new Date(),
      CustomerUsername: "",
      anser: this.state.comment,
      }
      if(QA.traloi)
      QA.traloi.push(as);
      this.setState({isLoading:false,QA,comment:""})
      
      this.props.dispatch(updateScreen(true))
    
    }
    

  
     
  }
    else{
      Toast.show("Kiểm tra kết nối", Toast.LONG);
      this.setState({...this.state,isLoading:false})
    }

      
    
    

 //SourceOfItemsID/:limit/:offset
}).post(URL.UrlComment ,data,{
    ContentType: 'application/json'
})
}


  render() {

    

    const {QA} = this.state;
    const cauhoi =QA? QA.cauhoi :undefined;
    const traloi = QA?QA.traloi:[]
   // console.log(traloi);
    
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
          title={"Câu hỏi"}
        
          toolbarColor={"white"}
        
        />
      <Layout bgColor="white" style={{ padding:15, marginTop:10, flex:1}}>
      <NativeBase.Text style={{fontSize:13, fontWeight:"bold"}}>{cauhoi?cauhoi.CustomerName :""}</NativeBase.Text>
        <Layout style={{borderRadius:6, marginTop:15,padding:10, backgroundColor:"#b3e0ff"}}>

       
      <NativeBase.Text style={{fontSize:12,marginTop:5}}>{cauhoi?cauhoi.question:""}</NativeBase.Text>
      </Layout>
    
      <FlatList
        data={traloi.reverse()}
       style={{flex:1}}
         renderItem={(item)=>this.renderAS(item)}
      />
       
        <Layout row margin={[20]}>
        <Layout style={{height:40, flex:1}} >
      <NativeBase.Input 
                value={this.state.comment}
                placeholderTextColor="gray"
                 onChangeText={comment=>this.setState({comment})} 
                placeholder={"Trả lời câu hỏi"} style={{padding:10,fontSize:13, width:"100%", backgroundColor:"#f3f3f3", borderRadius:10}}/>
            </Layout>
            <TouchableOpacity
            onPress={this.addComment}
             style={{alignSelf:"center", marginLeft:10}}>
                <NativeBase.Text style={{fontWeight:"bold", fontSize:13}}>Send</NativeBase.Text>
            </TouchableOpacity>
        </Layout>
 </Layout>
       
 
        <ProgressDialog isShow={this.state.isLoading}/>
    </Layout>)
  }
 
  
renderAS = (item)=>{



    return (<Layout content="flex-end" items="flex-end" row style={{marginTop:5, width:"100%"}}>
      
      <Layout  style={{alignSelf:"flex-end",padding:10, borderRadius:10, backgroundColor:"#d9d9d9"}}>
        {item.item.CustomerUsername !=="" && (
          <NativeBase.Text style={{fontSize:12, fontWeight:"bold"}}>{item.item.CustomerUsername}</NativeBase.Text>
        )}
    <NativeBase.Text style={{fontSize:12,textAlign:"left", color:"gray"}}>{item.item.anser}</NativeBase.Text>
      </Layout>
      
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
export default connect(mapStateToProps)(QAScreen);
