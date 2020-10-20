
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
  Alert,

} from "react-native";
import Toast from 'react-native-simple-toast';
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

import URL from "../../../api/URL";
import request from "../../../api/request";
import StaticUser from "../../../utils/StaticUser";
import ProgressDialog from "../../customizes/ProgressDialog";
import Toolbar from "../../customizes/Toolbar";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import SmartImage from "../../customizes/SmartImage";
import moment from "moment";
import { NavigationActions, StackActions } from 'react-navigation';
 

class HistoryDetailScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading:false,
      Partner:undefined,
      ListItems:[],
      TotalPrice:0,
      DiscountTotalPrice:0
      
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
            {"PartnerName"}
            </NativeBase.Text>
            </Layout>
            <Layout row margin={[10]}>
            <NativeBase.Text style={{fontSize:13, flex:1}}>
            Địa chỉ:
            </NativeBase.Text>
            <NativeBase.Text style={{fontSize:13,textAlign:"right", maxHeight:2*height/3}}>
            {"PartnerAddress"}
            </NativeBase.Text>
            </Layout>
            <Layout row margin={[10]}>
            <NativeBase.Text style={{fontSize:13, flex:1}}>
            Email:
            </NativeBase.Text>
            <NativeBase.Text style={{fontSize:13,textAlign:"right", maxHeight:2*height/3}}>
            {"PartnerEmail"}
            </NativeBase.Text>
            </Layout>
            <Layout row margin={[10]}>
            <NativeBase.Text style={{fontSize:13, flex:1}}>
            Số điện thoại:
            </NativeBase.Text>
            <NativeBase.Text style={{fontSize:13,textAlign:"right", maxHeight:2*height/3}}>
            {"PartnerPhone"}
            </NativeBase.Text>
            </Layout>
           
            <Layout row margin={[10]}>
            <NativeBase.Text style={{fontSize:13, flex:1}}>
            Mô tả:
            </NativeBase.Text>
            <NativeBase.Text style={{fontSize:13,textAlign:"right", maxHeight:2*height/3}}>
            {"PartnerDescription"}
            </NativeBase.Text>
            </Layout>
            
           
         </Layout>
         <Layout padding={15} >
            <NativeBase.Text style={{fontWeight:"bold"}}>
            Thông tin đơn hàng:
            </NativeBase.Text>
            <Layout row margin={[10]}>
            <NativeBase.Text style={{fontSize:13, flex:1}}>
            Tổng tiền:
            </NativeBase.Text> 
            <NativeBase.Text style={{fontSize:13,textAlign:"right",fontWeight:"bold", maxHeight:2*height/3}}>
            { this.state.DiscountTotalPrice !== 0 ?
            numeral(this.state.DiscountTotalPrice).format("0,0")+" ₫"
            :
            numeral(this.state.TotalPrice).format("0,0")+" ₫"}
            </NativeBase.Text>
            </Layout>
            <Layout row margin={[10]}>
            <NativeBase.Text style={{fontSize:13, flex:1}}>
            Tình trạng:
            </NativeBase.Text>
            <NativeBase.Text style={{fontSize:13,textAlign:"right",fontWeight:"bold", maxHeight:2*height/3}}>
            {this.getStatus()}
            </NativeBase.Text>
            </Layout>
              <Layout row content="flex-end" items="flex-end">
            
              </Layout>
            </Layout>
            <NativeBase.Content contentContainerStyle={{padding:15}}>
              { this.renderItem()}
            </NativeBase.Content>
        
       
         <ProgressDialog isShow={this.state.isLoading}/>
      </Layout>
    );
  }
  getStatus =()=>{
  
      
        return "Chờ phê duyệt";
        
  }
  cancelOrder =()=>{
    
    Alert.alert(
      '',
      `Bạn có chắc chắn muốn hủy đơn hàng này không?`,
      [
        {text: 'Hủy', onPress: () => {
       
        }},
   
        {text: 'Xác nhận', onPress: () => {
          const {params} = this.props.route;
          const OrderID = params?params.OrderID|| undefined:undefined
          console.log(URL.UrlCancelOrder+`${OrderID}`);
          
        request((res,err)=>{
            
             
          console.log("history detail", res,err);
          if(res){
            const data = res.data;
           // console.log("-------",res,err);
            if(data.err && data.err =="timeout"){
             // this.get
              this.setState({isLoading:false})
           
              this.props.dispatch(loggedIn(false))
              return;
              
            }else{
              if(data.status){
                let {Partner} = this.state;
                Partner.order_status = 3;
                this.setState({Partner})
                Toast.show("Bạn đã hủy thành công", Toast.LONG);
                this.props.navigation.replace("TabScreen");

       
              }else{
                Toast.show("Hủy không thành công", Toast.LONG);
              }
             
            
            }
             
          }
            else{
              Toast.show("Kiểm tra kết nối", Toast.LONG);
              this.setState({...this.state,isLoading:false})
            }
      
              
            
            
        
           
        }).get(URL.UrlCancelOrder+`${OrderID}`,null)
        }},
      ],
      { cancelable: false }
    )

    
  }
  renderItem =()=>{

      const {ListItems,Partner}= this.state;
      console.log(ListItems,"ListItems");
        const StatusID =  Partner?Partner.StatusID || "":""
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
