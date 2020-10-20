
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
  PermissionsAndroid,
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
import URL from "../../../api/URL";
import request from "../../../api/request"

import ProgressDialog from "../../customizes/ProgressDialog";
import Toast from 'react-native-simple-toast';
import SmartImage from "../../customizes/SmartImage";
import StaticUser from "../../../utils/StaticUser";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoder";

import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import CustomModal from "../../customizes/CustomModal";
const cities =[
  {
    name: 'Hà Nội',
  },
  {
    name: 'Hải Phòng',
  },
  {
    name: 'Hưng Yên',
  },
  {
    name: 'Hòa Bình',
  },
  {
    name: 'Nam Định',
  },

]
class HomeScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      isLogged:false,
      keySearch:"",
      location:"Hà Nội",
      cities:cities,
      locationFilted:[],
      isLoading:false,
      address:"",
      isShowModalLocation:false,
    

   
    };
    this.pageCount=3;
  }
  _renderDotIndicator() {
    return <PagerDotIndicator 
    style={{position:"absolute", bottom:0, right:0, left:0}}
    
    selectedDotStyle={{backgroundColor:Colors.Black, width:10, height:10, borderRadius:10, opacity:0.5}}
    pageCount={this.pageCount} />;
}
renderModalLocation =()=>{
  return ( <CustomModal
  isShow={this.state.isShowModalLocation}
  renderContent={
    <View style={{ padding: 20 }}>
      <NativeBase.Text>
        Chọn thành phố
      </NativeBase.Text>
      <TouchableOpacity 
      onPress={()=>{
        this.setState({isShowModalLocation:false})
     
      }}
       style={{backgroundColor:Colors.primaryColor, marginTop:10, padding:4}}>
      <NativeBase.Text style={{textAlign:"center", color:"white", fontWeight:"bold"}}>
        Hà Nội
      </NativeBase.Text>
      </TouchableOpacity>
      <TouchableOpacity
         onPress={()=>{
          this.setState({isShowModalLocation:false, CityID:2,location:"Hồ Chí Minh"})
          this.getProductData(2);
          AsyncStorageApp.storeData("location",JSON.stringify(2))
        }}
       style={{backgroundColor:Colors.primaryColor, marginTop:10, padding:4}}>
      <NativeBase.Text style={{textAlign:"center", color:"white", fontWeight:"bold"}}>
        Hồ Chí Minh
      </NativeBase.Text>
      </TouchableOpacity>
      <TouchableOpacity
         onPress={()=>{
          this.setState({isShowModalLocation:false, CityID:3,location:"Đà Nẵng"})
          this.getProductData(2);
          AsyncStorageApp.storeData("location",JSON.stringify(3))
        }}
       style={{backgroundColor:Colors.primaryColor, marginTop:10, padding:4}}>
      <NativeBase.Text style={{textAlign:"center", color:"white", fontWeight:"bold"}}>
        Đà Nẵng
      </NativeBase.Text>
      </TouchableOpacity>
      
      
    </View>
  }
/>
);
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
          this.props.navigation.navigate("SearchScreen",{
            CityID: this.state.CityID
          })
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

                  {banners.map(e=>{
                    return (     
                         <Layout  style={{backgroundColor:Colors.BackgroundColor}}  content="center" items="center">
                    <FastImage
                      resizeMode="cover"
                       source={e} style={{width:width-30, height:height/4, marginVertical:20}}/>
                    
                
                </Layout>)
                  })}
          
                   
                    
                </IndicatorViewPager>
            </Layout>
            <Layout height={5} width={width-30} margin={[15,15]} style={{alignSelf:"center", opacity:0.05}} bgColor={Colors.Black}/>
            
            
            
            {data.length > 0 && (<Layout>
              <Layout margin={[0,0,15,15]}>
         <Layout row> 
           <NativeBase.Text style={{flex:1}}>
             Mới nhất
            </NativeBase.Text>
            <Layout row>
            <NativeBase.Text onPress={()=>{
        
               this.props.navigation.navigate("ListAllProduct")
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
            data={data}
            showsHorizontalScrollIndicator={false}
            renderItem={item => (
              <BaseItemList renderView={this.renderItem(item)} />
            )}
            keyExtractor={(item, index) => index.toString()}
            />
          </Layout>
          <Layout height={5} width={width-30} margin={[15,15]} style={{alignSelf:"center", opacity:0.05}} bgColor={Colors.Black}/>
            </Layout>)}



              {data.length  >0 && (<Layout>
                <Layout margin={[0,0,15,15]}>
         <Layout row> 
           <NativeBase.Text style={{flex:1}}>
             Xem nhiều nhất
            </NativeBase.Text>
            <Layout row>
            <NativeBase.Text onPress={()=>{
              
                this.props.navigation.navigate("ListAllProduct")
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
            data={data}
            showsHorizontalScrollIndicator={false}
            renderItem={item => (
              <BaseItemList renderView={this.renderItem(item)} />
            )}
            keyExtractor={(item, index) => index.toString()}
            />
          </Layout>
          <Layout height={5} width={width-30} margin={[15,15]} style={{alignSelf:"center", opacity:0.05}} bgColor={Colors.Black}/>
              </Layout>)}


              {data.length>0 && (<Layout>
                    
          <Layout margin={[0,0,15,15]}>
         <Layout row> 
           <NativeBase.Text style={{flex:1}}>
             Tất cả 
            </NativeBase.Text>
            <Layout row>
            <NativeBase.Text onPress={()=>{
       
              this.props.navigation.navigate("ListAllProduct")
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
            data={data}
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
        {this.renderModalLocation()}
      </Layout>
    );
  }
  renderLocationItem =()=>{
    const { cities, locationFilted ,keySearch} = this.state;
    const arrToMap = keySearch == ''?cities:locationFilted
    return arrToMap.map((e,index)=>{
      return (
        <TouchableOpacity onPress={()=>{
          this.setState({location: e.CityName});
          this.bottomSheetRef.close();
        }}>
          <Layout padding={[15,15]}>
        <NativeBase.Text>
        {e.name}
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
          onChangeText={keySearch=>{
            const {cities,locationFilted} = this.state;
            if(keySearch == ''){
              this.setState({keySearch, cities});
              return;

            }
     
            const arrFilter = [...cities].filter(e=>e.name.toLowerCase().trim().indexOf(keySearch.toLowerCase().trim()) >-1)
          
            this.setState({keySearch, locationFilted:arrFilter});

          }}
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

  const Price =item.item.defaultprice || 0;
  const DiscountPrice = item.item.Price || 0;
  const image= item.item.image;
  const name = item.item.name;

    return (
      <TouchableWithoutFeedback onPress={()=>{
       this.props.navigation.navigate("ProductDetailScreen")
      }}>
        <View>
      <Layout style={{width:height/6}} margin={[0,0,0,15]} radius={3} hidden>
        <SmartImage source={image} style={{height:90, width:"100%"}} />
        <Layout>
          <NativeBase.Text numberOfLines={2} ellipsizeMode="tail" style={{fontSize:13, fontWeight:"bold", height:50}}>
            {name}
          </NativeBase.Text>
            <Layout row>
            {DiscountPrice && ( <NativeBase.Text style={{
      fontSize:12, color:Colors.primaryColor, fontWeight:"bold",marginEnd:10,
      marginVertical:3
    }}>{numeral(DiscountPrice).format("0,0")+" ₫"}</NativeBase.Text>)}
               <NativeBase.Text style={{
         
      fontSize:DiscountPrice?10:12, color:DiscountPrice?"black":Colors.primaryColor,fontWeight:DiscountPrice?undefined:"bold", opacity:DiscountPrice?0.4:1,
      marginVertical:3,textDecorationLine: DiscountPrice?'line-through': "none", textDecorationStyle: 'solid', alignSelf:"center"
    }}>{numeral(Price).format("0,0")+" ₫"}</NativeBase.Text>
            </Layout>
    
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
