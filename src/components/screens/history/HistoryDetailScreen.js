
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
import {loggedIn} from "../../../redux/app/action"
import Colors from "../../../assets/themes/colors";
import FastImage from "react-native-fast-image"
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'react-native-best-viewpager';
import ImageAsset from "../../../assets/images/ImageAsset";
const  height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import firebase from 'react-native-firebase';
import URL from "../../../api/URL";
import request from "../../../api/request";
import StaticUser from "../../../utils/StaticUser";
import ProgressDialog from "../../customizes/ProgressDialog";
import Toolbar from "../../customizes/Toolbar";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import SmartImage from "../../customizes/SmartImage";
import moment from "moment";

class HistoryDetailScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading:false,
      Partner:undefined,
      ListItems:[]
      
    };

  }
 


componentDidMount(){
    const {params} = this.props.route;
    const OrderID = params?params.OrderID|| undefined:undefined
  request((res,err)=>{
      
       
    console.log("history detail", res,err);
    if(res){
      const data = res.data;
     // console.log("-------",res,err);
      if(data.err && data.err =="timeout"){
     
        this.setState({isLoading:false})
        this.props.dispatch(loggedIn(false))
        return;
        
      }else{
      
        const Partner = data.Partner || undefined;
        const ListItems =data.ListItems || [];
        this.setState({Partner,ListItems})
      
      }
       
    }
      else{
        Toast.show("Kiểm tra kết nối", Toast.LONG);
        this.setState({...this.state,isLoading:false})
      }

        
      
      
  

  }).get(URL.UrlHistoryDetail+`${OrderID}`,null)
}
  render() {
   // data:
        // Partner:
        // PartnerID: "partner0000000000001"
        // CustomerID: "customer000000000002"
        // PartnerName: "NaBe shop1"
        // PartnerAddress: "Xom Ca, Nguyen Xa, Bac Tu Liem"
        // PartnerEmail: "tdhoang96@gmail.com"
        // PartnerPhone: "957463887"
        // PartnerDescription: "chuyen buon ban giay the thao"
        // PartnerImage: "https://i.imgur.com/MkIXW51.png"
        // PartnerTypeID: 0
        // CityID: 1
        // ship: 1
        // StatusID: 1
        // __proto__: Object
        // ListItems: Array(1)
        // 0:
        // ItemName: "KHOAI TÂY LẮC"
        // total: 1
        // price: 50000
        // SourceOfItemsID: "sourceofitems0000004"
        // ItemID: "items000000000000008"
        // Image: "https://firebasestorage.googleapis.com/v0/b/foodapp-5c233.appspot.com/o/images%2Ffood2.jpg?alt=media&token=3008e35c-cc1f-4751-92e8-c16811a199d2"
        // Description: "ergdsfgsdfgsdfgdsfgdsfgdsfg"
        // __proto__: Object
        const {Partner} = this.state;
        
        const PartnerName= Partner?Partner.PartnerName || "":""
        const PartnerAddress= Partner?Partner.PartnerAddress || "":""
        const PartnerEmail= Partner?Partner.PartnerEmail || "":""
        const PartnerPhone= Partner?Partner.PartnerPhone || "":""
        const PartnerDescription= Partner?Partner.PartnerDescription || "":""
        


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
          title="Chi tiết"
          toolbarColor={"white"}
          titleStyle={{fontWeight:"bold"}}
          
        
        />
         
         <Layout padding={15}>
            <NativeBase.Text style={{fontWeight:"bold"}}>
            Thông tin cửa hàng:
            </NativeBase.Text>
            <Layout row margin={[10]}>
            <NativeBase.Text style={{fontSize:13, flex:1}}>
            Tên cửa hàng:
            </NativeBase.Text>
            <NativeBase.Text style={{fontSize:13,textAlign:"right", maxHeight:2*height/3}}>
            {PartnerName}
            </NativeBase.Text>
            </Layout>
            <Layout row margin={[10]}>
            <NativeBase.Text style={{fontSize:13, flex:1}}>
            Địa chỉ:
            </NativeBase.Text>
            <NativeBase.Text style={{fontSize:13,textAlign:"right", maxHeight:2*height/3}}>
            {PartnerAddress}
            </NativeBase.Text>
            </Layout>
            <Layout row margin={[10]}>
            <NativeBase.Text style={{fontSize:13, flex:1}}>
            Email:
            </NativeBase.Text>
            <NativeBase.Text style={{fontSize:13,textAlign:"right", maxHeight:2*height/3}}>
            {PartnerEmail}
            </NativeBase.Text>
            </Layout>
            <Layout row margin={[10]}>
            <NativeBase.Text style={{fontSize:13, flex:1}}>
            Số điện thoại:
            </NativeBase.Text>
            <NativeBase.Text style={{fontSize:13,textAlign:"right", maxHeight:2*height/3}}>
            {PartnerPhone}
            </NativeBase.Text>
            </Layout>
            <Layout row margin={[10]}>
            <NativeBase.Text style={{fontSize:13, flex:1}}>
            Tên cửa hàng:
            </NativeBase.Text>
            <NativeBase.Text style={{fontSize:13,textAlign:"right", maxHeight:2*height/3}}>
            {PartnerName}
            </NativeBase.Text>
            </Layout>
            <Layout row margin={[10]}>
            <NativeBase.Text style={{fontSize:13, flex:1}}>
            Mô tả:
            </NativeBase.Text>
            <NativeBase.Text style={{fontSize:13,textAlign:"right", maxHeight:2*height/3}}>
            {PartnerDescription}
            </NativeBase.Text>
            </Layout>
            
           
         </Layout>
         <Layout padding={15} >
            <NativeBase.Text style={{fontWeight:"bold"}}>
            Thông tin đơn hàng:
            </NativeBase.Text>
            <Layout row margin={[10]}>
            <NativeBase.Text style={{fontSize:13, flex:1}}>
            Tình trạng:
            </NativeBase.Text>
            <NativeBase.Text style={{fontSize:13,textAlign:"right",fontWeight:"bold", maxHeight:2*height/3}}>
            {"Đã đặt"}
            </NativeBase.Text>
            </Layout>

            </Layout>
            <NativeBase.Content contentContainerStyle={{padding:15}}>
              { this.renderItem()}
            </NativeBase.Content>
        
       
         <ProgressDialog isShow={this.state.isLoading}/>
      </Layout>
    );
  }
  renderItem =()=>{
      const {ListItems}= this.state;
      console.log(ListItems,"ListItems");
      
    return ListItems.map((e,index)=>{
        return (
            <TouchableWithoutFeedback style={{}}>
            <View style={{flexDirection:"row", marginTop:14}}>
         
                <Layout flex={1} row>
                <Layout>
                    <SmartImage source={{uri: e.Image}} style={{ height:65, width:65}}/>
                </Layout>
                <Layout flex={1} margin={[0,0,12,0]}>
    
    <NativeBase.Text  numberOfLines={1} ellipsizeMode="tail" style={{fontSize:13, fontWeight:"bold"}}>{e.ItemName}</NativeBase.Text>
    <NativeBase.Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize:12,}}>{e.Description}</NativeBase.Text>
    <NativeBase.Text style={{color:Colors.primaryColor}}>{numeral(e.price).format("0,0")+" ₫"}</NativeBase.Text>
                   
                </Layout>
               
                </Layout>
                <Layout content="center" items="center" margin={[0,0,0,36]}>
        <NativeBase.Text style={{alignSelf:"center", fontSize:12}}>x {e.total}</NativeBase.Text>

        
                </Layout>
                <TouchableOpacity 
                onPress={()=>{
               
                }}
                style={{position:"absolute", right:0, top:0}}>
                   <NativeBase.Text style={{fontSize:12}}>
                       Hủy đơn
                   </NativeBase.Text>

                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
          );
      })
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.BackgroundColor
  },
});

export default connect()(HistoryDetailScreen);
