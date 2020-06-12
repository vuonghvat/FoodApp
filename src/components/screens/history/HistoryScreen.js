
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
import { connect} from "react-redux"
import Layout from "../../layouts/Layout"
import {loggedIn, updateScreen} from "../../../redux/app/action"
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
import Toast from 'react-native-simple-toast';
class HistoryScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading:false
      
    };

  }
 

  componentWillReceiveProps = (props)=>{
    console.log(props);
    
    if(props.isUpdate){
    
      this.getHistory()
      this.props.dispatch(updateScreen(false))
    }
  }
componentDidMount(){
 this.getHistory();
}
getHistory =()=>{
  request((res,err)=>{
      
       
    console.log("history", res,err);
    if(res){
      const data = res.data;
     // console.log("-------",res,err);
      if(data.err && data.err =="timeout"){
     
        this.setState({isLoading:false})
        this.props.dispatch(loggedIn(false))
        return;
        
      }else{

        this.setState({data})
      
      }
       
    }
      else{
        Toast.show("Kiểm tra kết nối", Toast.LONG);
        this.setState({...this.state,isLoading:false})
      }

        
      
      
  

  }).get(URL.UrlGetHistory+`${StaticUser.getCurrentUser().CustomerID}`,null)
}
  render() {
 
    return (
      <Layout style={styles.container}>
          <Toolbar
      
          title="Lịch sử mua hàng"
          toolbarColor={"white"}
          titleStyle={{fontWeight:"bold"}}
        
        />
          {this.state.data.length === 0 && (
            <Layout flex={1} content="center" items="center">
              <NativeBase.Text style={{fontSize:13}}>
                Không có đơn hàng nào
              </NativeBase.Text>
              </Layout>
          )}
             {this.state.data.length > 0 && (
              <NativeBase.Content>
              { this.renderItem()}
            </NativeBase.Content>
          )}
       
         <ProgressDialog isShow={this.state.isLoading}/>
      </Layout>
    );
  }
 
  renderItem =()=>{
    const {data} = this.state;
//     OrderID: "6y478l2s0k8x2r2bi"
// StatusID: 1
// CreateDate: "2020-04-12T13:19:06.000Z"
// ship: 0
// shipAddress: "Hung Yen Viet nam"
// OrderNote: "Hang ok"
// OrderPayment: 1
    return data.map((e,index)=>{
      return (
        <TouchableWithoutFeedback 
        onPress={()=>{
          this.props.navigation.navigate("HistoryDetailScreen",{
            OrderID:e.OrderID
          })
        }} style={{padding:10}}>
          <View style={{backgroundColor:"white",elevation:2, padding:10}}>
        
            <Layout row>
              <NativeBase.Text>Mã đơn hàng: </NativeBase.Text>
      <NativeBase.Text style={{fontWeight:"bold", marginLeft:8}}>{e.OrderID}</NativeBase.Text>
            </Layout>
            <Layout row>
              <NativeBase.Text>Tên cửa hàng: </NativeBase.Text>
      <NativeBase.Text style={{fontWeight:"bold", marginLeft:8}}>{e.PartnerName}</NativeBase.Text>
            </Layout>
      <NativeBase.Text style={{fontSize:12}}>{moment(e.CreateDate).format("DD/MM/YYYY HH:mm:ss")}</NativeBase.Text>
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
const mapProps =  state =>{
  return {
    isUpdate:state.appReducer.isUpdate
  }
}
export default connect(mapProps)(HistoryScreen);

