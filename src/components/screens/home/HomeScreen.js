
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
import StaticUser from "../../../utils/StaticUser";

class HomeScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      isLogged:false,
      keySearch:"",
      location:"Ha Noi",
      cities:[],
      CityID: 1,
      isLoading:false,
      lastestProducts:[],
      viewMostProducts:[],
      allProducts:[]

   
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

  this.getBanner();
  this.getCity();
  this.getProducts(this.state.CityID,"Lastest");
  this.getProducts(this.state.CityID,"MostView");
  this.getProducts(this.state.CityID,"all");
 
}
getBanner =()=>{
  request((res,err)=>{
      
       
    console.log("banner", res,err);
    if(res){
      const banners = res.data;

      this.setState({banners})
       
    }
      else{
        Toast.show("Kiểm tra kết nối", Toast.LONG);
        this.setState({...this.state,isLoading:false})
      }

        
      
      
  

  }).get(URL.UrlGetBanner,null)
}
getProducts = (CityID, type)=>{

  this.setState({isLoading:true})
  request((res,err)=>{
      
      
       
        
    if(res){

      // const cities = res.data;
      // console.log(cities);
      // this.setState({cities:cities?cities||[]:[]})
      // err: "auth_fail"
      // msg: "Xác thực không thành công. Vui lòng đăng nhập lại!"
      const data = res.data;
     // console.log("-------",res,err);
      if(data.err && data.err =="timeout"){
     
        this.setState({...this.state,isLoading:false})
        this.props.dispatch(loggedIn(false))
        return;
        
      }else{

        if(type =="Lastest"){
       
          this.setState({lastestProducts:data,isLoading:false})
        }else if(type == "MostView"){
      
          this.setState({viewMostProducts:data,isLoading:false})
        }else{
        
          this.setState({allProducts:data,isLoading:false})
        }
      
      }
      

    
       
    }
      else{
        Toast.show("Kiểm tra kết nối", Toast.LONG);
        this.setState({...this.state,isLoading:false})
      }

        
      
      
  

  }).get(URL.UrlGetProducts+`${CityID}/all/${type}/all/10/0`,null)

}
getCity =()=>{
  request((res,err)=>{
      
       
        
    if(res){
      const cities = res.data;
    //  console.log(cities);
      this.setState({cities:cities?cities||[]:[]})
       
    }
      else{
        Toast.show("Kiểm tra kết nối", Toast.LONG);
        this.setState({...this.state,isLoading:false})
      }

        
      
      
  

  }).get(URL.UrlGetCity,null)
}
  render() {
 
    return (
      <Layout style={styles.container}>
       <Layout padding={[10,0] }>
       <Layout margin={[0,0,10,10]}>
        
        </Layout >
        <Layout margin={[10,0,15,15]} style={{ alignSelf: "center"}} row>
          <Layout content="center" padding={[0,0,5,5]} >
            <TouchableOpacity onPress={()=>{
              this.props.navigation.navigate("CardScreen",{
                CustomerID: StaticUser.getCurrentUser().CustomerID
              })
            }}>
            <FastImage source ={ImageAsset.CardIcon} style={{height:30, width:30, alignSelf:"center"}} resizeMode="contain"/>
            </TouchableOpacity>
       
          </Layout>
        <TouchableOpacity style={{flex:1, flexDirection:"row"}} onPress ={()=>{
          this.props.navigation.navigate("SearchScreen")
        }}>
        <Layout flex={1} padding={10} margin={[0,0,0,10]} row radius={20} bgColor={"#e6e6e6"} hidden>
          <FastImage source={ImageAsset.SearchIcon} style={{ width:20, height:20,alignSelf:"center", marginHorizontal:10 }}/>
          <NativeBase.Text style={{fontSize:13, color:Colors.Black , opacity:0.5, flex:1, textAlign:"left", alignSelf:"center"}}>
          Tìm kiếm
          </NativeBase.Text>
        </Layout>
        </TouchableOpacity>

        
        <Layout row>
          <NativeBase.Text
          onPress={()=>{
            this.bottomSheetRef.open();
          }}
        style={{fontSize:18,maxWidth:100,alignSelf:"center"}}>{this.state.location}</NativeBase.Text>
          <FastImage resizeMode="contain" source={ImageAsset.TrackIcon} style={{width:18, height:18,marginHorizontal:5, alignSelf:"center"}}/>
          </Layout>
          </Layout>

       </Layout>
           <NativeBase.Content style={{marginTop:15}}>
           <Layout>
            <IndicatorViewPager
        
                initialPage={0}
                ref={this.viewPager}
              
                    style={{height:height/4}}
                    indicator={this._renderDotIndicator()}
                >
                  <Layout  style={{backgroundColor:Colors.BackgroundColor}}  content="center" items="center">
                        <FastImage
                          resizeMode="cover"
                         source={ImageAsset.Banner1} style={{width:width-30, height:height/4, marginVertical:20}}/>
                        
                    
                    </Layout>
                    <Layout  style={{backgroundColor:Colors.BackgroundColor}}  content="center" items="center">
                        <FastImage
                          resizeMode="cover"
                         source={ImageAsset.Banner2} style={{width:width-30, height:height/4}}/>
                        
                    
                    </Layout>
                    <Layout   style={{backgroundColor:Colors.BackgroundColor}}  content="center" items="center">
                        <FastImage
                          resizeMode="cover"
                         source={ImageAsset.Banner3} style={{width:width-30, height:height/4}}/>
                        
                    
                    </Layout>
                    
                </IndicatorViewPager>
            </Layout>
            <Layout height={5} width={width-30} margin={[15,15]} style={{alignSelf:"center", opacity:0.05}} bgColor={Colors.Black}/>
            
            
            
            {this.state.lastestProducts.length > 0 && (<Layout>
              <Layout margin={[0,0,15,15]}>
         <Layout row> 
           <NativeBase.Text style={{flex:1}}>
             Mới nhất
            </NativeBase.Text>
            <Layout row>
            <NativeBase.Text onPress={()=>{
              alert("View more");
            }} style={{ fontSize:12, alignSelf:"center"}}>
              Thêm
            </NativeBase.Text>
            <FastImage style={{width:15, height:15, alignSelf:"center"}} resizeMode="contain" source={ImageAsset.ArrowNextIcon}/>
            </Layout>
            </Layout>
            <FlatList
            contentContainerStyle={{}}
            horizontal
            style={{
              marginTop:10
          
            }}
            data={this.state.lastestProducts}
            showsHorizontalScrollIndicator={false}
            renderItem={item => (
              <BaseItemList renderView={this.renderItem(item)} />
            )}
            keyExtractor={(item, index) => index.toString()}
            />
          </Layout>
          <Layout height={5} width={width-30} margin={[15,15]} style={{alignSelf:"center", opacity:0.05}} bgColor={Colors.Black}/>
            </Layout>)}



              {this.state.viewMostProducts.length  >0 && (<Layout>
                <Layout margin={[0,0,15,15]}>
         <Layout row> 
           <NativeBase.Text style={{flex:1}}>
             Xem nhiều nhất
            </NativeBase.Text>
            <Layout row>
            <NativeBase.Text onPress={()=>{
              alert("View more");
            }} style={{ fontSize:12, alignSelf:"center"}}>
              Thêm
            </NativeBase.Text>
            <FastImage style={{width:15, height:15, alignSelf:"center"}} resizeMode="contain" source={ImageAsset.ArrowNextIcon}/>
            </Layout>
            </Layout>
            <FlatList
            contentContainerStyle={{}}
            horizontal
            style={{
            
              marginTop:10
             
            }}
            data={this.state.viewMostProducts}
            showsHorizontalScrollIndicator={false}
            renderItem={item => (
              <BaseItemList renderView={this.renderItem(item)} />
            )}
            keyExtractor={(item, index) => index.toString()}
            />
          </Layout>
          <Layout height={5} width={width-30} margin={[15,15]} style={{alignSelf:"center", opacity:0.05}} bgColor={Colors.Black}/>
              </Layout>)}


              {this.state.allProducts.length>0 && (<Layout>
                    
          <Layout margin={[0,0,15,15]}>
         <Layout row> 
           <NativeBase.Text style={{flex:1}}>
             Tất cả 
            </NativeBase.Text>
            <Layout row>
            <NativeBase.Text onPress={()=>{
              alert("View more");
            }} style={{ fontSize:12, alignSelf:"center"}}>
              Thêm
            </NativeBase.Text>
            <FastImage style={{width:15, height:15, alignSelf:"center"}} resizeMode="contain" source={ImageAsset.ArrowNextIcon}/>
            </Layout>
            </Layout>
            <FlatList
            contentContainerStyle={{}}
            horizontal
            style={{
          

              marginTop:10
           
            }}
            data={this.state.allProducts}
            showsHorizontalScrollIndicator={false}
            renderItem={item => (
              <BaseItemList renderView={this.renderItem(item)} />
            )}
            keyExtractor={(item, index) => index.toString()}
            />
          </Layout>
          <Layout height={5} width={width-30} margin={[15,15]} style={{alignSelf:"center", opacity:0.05}} bgColor={Colors.Black}/>
              </Layout>)}
         
         
            </NativeBase.Content>
            {/* <BottomSheet
            ref={(bottomSheetRef)=>{
              this.bottomSheetRef =bottomSheetRef;
            }}
           // enabledContentGestureInteraction
            initialSnap={2}
            snapPoints = {[height-60, height/2.4, 0]}
            renderContent = {this.renderContent}
            renderHeader = {this.renderHeader}
        />
         */}
            <RBSheet
          ref={ref => {
            this.bottomSheetRef = ref;
          }}
          height={height/2.3}
          duration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center",
              overflow:"hidden",
              borderTopRightRadius:15,  
                borderTopLeftRadius:15 
       
          
            }
          }}
        >
          {this.renderContent()}
        </RBSheet>
        <ProgressDialog isShow={this.state.isLoading}/>
      </Layout>
    );
  }
  renderLocationItem =()=>{
    const { cities } = this.state;
    return cities.map((e,index)=>{
      return (
        <TouchableOpacity onPress={()=>{
          this.getProducts(e.CityID)
          this.setState({location: e.CityName});
          this.bottomSheetRef.close();
        }}>
          <Layout padding={[15,15]}>
        <NativeBase.Text>
        {e.CityName}
        </NativeBase.Text>
      </Layout>
        </TouchableOpacity>
      )
    })
  }
  renderContent =()=>{
    
    return (<Layout height={height/2.3} width="100%" padding={15} 
     style={{backgroundColor:"#f3f3f3", 
     
         }}>
      <NativeBase.Text style={{fontWeight:"bold", marginVertical:10}}>
        Choose City
      </NativeBase.Text>
      <Layout row radius={20} bgColor={Colors.white} hidden>

          <FastImage source={ImageAsset.SearchIcon} style={{ width:20, height:20,alignSelf:"center", marginHorizontal:10 }}/>
          <NativeBase.Input 
          value={this.state.keySearch}
          onChangeText={keySearch=>this.setState({keySearch})}
          placeholder={"Search"}
          style={{fontSize:13,height:40, color:Colors.Black , opacity:0.4, flex:1, textAlign:"left", alignSelf:"center"}}/>
          {this.state.keySearch!=="" && (
             <TouchableOpacity
             style={{alignSelf:"center"}}
              onPress={()=>{
               this.setState({keySearch:""})
             }}>
             <FastImage source={ImageAsset.CloseIcon} style={{ width:22, height:22, marginHorizontal:10, opacity:0.5 }}/>
             </TouchableOpacity>
          )}
        </Layout>
      
        <NativeBase.Content>
          {this.renderLocationItem()}
        </NativeBase.Content>
    </Layout>)
  }


  renderItem =(item)=>{
   console.log(item);

    return (
      <TouchableWithoutFeedback onPress={()=>{
       this.props.navigation.navigate("ProductDetailScreen",{
        SourceOfItemsID: item.item.SourceOfItemsID
       })
      }}>
        <View>
      <Layout style={{height:height/5, width:height/6}} margin={[0,0,0,15]} radius={3} hidden>
        <SmartImage source={ { uri: item.item.Image}} style={{flex:1}} />
        <Layout>
          <NativeBase.Text style={{fontSize:13, fontWeight:"bold"}}>
            {item.item.ItemName}
          </NativeBase.Text>
    <NativeBase.Text style={{
      fontSize:12, color:"black", opacity:0.4,
      marginVertical:3
    }}>{numeral(item.item.Price).format("0,0")+" ₫"}</NativeBase.Text>
          <NativeBase.Text  numberOfLines={1}
           ellipsizeMode="tail"
           style={{fontSize:13,color:Colors.Black, opacity:0.3,}}>
            {item.item.address}
          </NativeBase.Text>
        
        </Layout>
      </Layout>
      </View>
      </TouchableWithoutFeedback>

    )
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
export default connect(mapStateToProps)(HomeScreen);
