
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

import RBSheet from "react-native-raw-bottom-sheet";
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
class HomeScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      isLogged:false,
      keySearch:"",
      location:"Ha Noi"
   
    };
    this.pageCount=3;
  }
  _renderDotIndicator() {
    return <PagerDotIndicator 
    style={{position:"absolute", bottom:0, right:0, left:0}}
    
    selectedDotStyle={{backgroundColor:Colors.Black, width:10, height:10, borderRadius:10, opacity:0.5}}
    pageCount={this.pageCount} />;
}
  render() {
 
    return (
      <Layout style={styles.container}>
       <Layout padding={[10,0] }>
       <Layout margin={[0,0,10,10]}>
        
        </Layout >
        <Layout margin={[10,0,15,15]} style={{ alignSelf: "center"}} row>
    
        <TouchableOpacity style={{flex:1, flexDirection:"row"}} onPress ={()=>{
          this.props.navigation.navigate("SearchScreen")
        }}>
        <Layout flex={1} padding={10} margin={[0,0,0,10]} row radius={20} bgColor={"#e6e6e6"} hidden>
          <FastImage source={ImageAsset.SearchIcon} style={{ width:20, height:20,alignSelf:"center", marginHorizontal:10 }}/>
          <NativeBase.Text style={{fontSize:13, color:Colors.Black , opacity:0.5, flex:1, textAlign:"left", alignSelf:"center"}}>
          Find places, food, address...
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
          <Layout margin={[0,0,15,15]}>
         <Layout row> 
           <NativeBase.Text style={{flex:1}}>
             Most popular
            </NativeBase.Text>
            <Layout row>
            <NativeBase.Text onPress={()=>{
              alert("View more");
            }} style={{ fontSize:12, alignSelf:"center"}}>
              More
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
          <Layout margin={[0,0,15,15]}>
         <Layout row> 
           <NativeBase.Text style={{flex:1}}>
             Most popular
            </NativeBase.Text>
            <Layout row>
            <NativeBase.Text onPress={()=>{
              alert("View more");
            }} style={{ fontSize:12, alignSelf:"center"}}>
              More
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
          <Layout margin={[0,0,15,15]}>
         <Layout row> 
           <NativeBase.Text style={{flex:1}}>
             Most popular
            </NativeBase.Text>
            <Layout row>
            <NativeBase.Text onPress={()=>{
              alert("View more");
            }} style={{ fontSize:12, alignSelf:"center"}}>
              More
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
          <Layout margin={[0,0,15,15]}>
         <Layout row> 
           <NativeBase.Text style={{flex:1}}>
             Most popular
            </NativeBase.Text>
            <Layout row>
            <NativeBase.Text onPress={()=>{
              alert("View more");
            }} style={{ fontSize:12, alignSelf:"center"}}>
              More
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
      </Layout>
    );
  }
  renderLocationItem =()=>{
    const data= [1,2,3,4,5,6,7,8,10,1,2,3,4,5,6,7,8,9,90,1,2,3,4,54,34,53,5,334,5,345,345];
    return item = data.map((e,index)=>{
      return (
        <TouchableOpacity onPress={()=>{
          this.setState({location: "location "+ index});
          this.bottomSheetRef.close();
        }}>
          <Layout padding={[15,15]}>
        <NativeBase.Text>
          Location +{index}
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
      <Layout style={{height:height/6, width:height/6}} margin={[0,0,0,15]}>
        <FastImage resizeMode="cover" source={item.item.image} style={{flex:1}} />
        <Layout>
          <NativeBase.Text style={{fontSize:13, fontWeight:"bold"}}>
            {item.item.name}
          </NativeBase.Text>
     
          <NativeBase.Text  numberOfLines={1}
           ellipsizeMode="tail"
           style={{fontSize:13,color:Colors.Black, opacity:0.3,}}>
            {item.item.address}
          </NativeBase.Text>
        
        </Layout>
      </Layout>
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
