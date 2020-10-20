
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
  Alert,
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
import moment from "moment";

const qas =[
  {
    cauhoi:{ question:'What is your name?'},
    traloi:[
      {
        answer:"My name is Vuong"
      },
      {
        answer:"My name is Tan"
      },
    ]
  }
]
const rates =[
  {
    comment:'Good'
  },
  {
    comment:'Cool'
  },
  {
    comment:'Cool'
  }
]
class ProductDetailScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      product:undefined,
      isLoading:false,
      quantity:0,
      isShowPopupReview:false,
      isShowPopupQA:false,
      star:0,
      comment:"",
      isRating:false,
      listRecommend:[],
      qas:qas,
      question:"",
      rootSumary: 12,
      rate:rates


    

   
    };
    this.pageCount=3;
  }
    _renderDotIndicator() {
      return <PagerDotIndicator 
      style={{position:"absolute", bottom:0, right:0, left:0}}
      
      selectedDotStyle={{backgroundColor:Colors.Black, width:10, height:10, borderRadius:10, opacity:0.5}}
      pageCount={this.pageCount} />;
  }

onQuantityPress =(value)=>{
  let {  quantity,rootSumary } = this.state;
  if(rootSumary <= 0 && value > 0)
  return;
  if(quantity == 0 && value < 0 )
  return;
  
    rootSumary -=  value;
    quantity += value;
  this.setState({rootSumary,quantity})
  


}

onStarRatingPress = () => {
    
};

renderQA=()=>{
  const {qas} = this.state;

  return qas.map((e,index)=>{
    const cauhoi = e.cauhoi;
    const traloi = e.traloi
    if(index < 2)
    return ( <TouchableOpacity onPress={()=>{
     
      this.props.navigation.navigate("QAScreen",{
        QA:e
      })
    }}>
      <Layout bgColor="white" style={{elevation:4, padding:8, marginTop:10}}>
      <Layout>

        <NativeBase.Text style={{fontSize:13, fontWeight:"bold"}}>{'Vuong'}</NativeBase.Text>
  <NativeBase.Text style={{fontSize:12,marginTop:5}}>{cauhoi.question}</NativeBase.Text>
      </Layout>
        {traloi.length >0 && (
          <Layout row style={{marginTop:5}}>
          <View style={{width:0.5, height:"100%", alignSelf:"center", backgroundColor:"gray", marginEnd:15}}/>
          <Layout flex={1} style={{ height:"100%"}}>
        <NativeBase.Text style={{fontSize:12,textAlign:"left", color:"gray"}}>{traloi[0].answer}</NativeBase.Text>
          </Layout>
          
        </Layout>
        )}
 </Layout>
    </TouchableOpacity>
   
   )
  })
 
}
renderReview=(data)=>{

  return data.map((e,index)=>{
    const CreateDate = e.CreateDate
    const CustomerUsername  = e.CustomerUsername ;
    if(index < 2)
    return ( <Layout bgColor="white" style={{elevation:4, padding:8, marginTop:10}}>
    <Layout row> 
 <Layout flex={1}>
  <NativeBase.Text style={{flex:1, fontSize:13}} >{'Vuong Nguyen'}</NativeBase.Text>
 </Layout>

   <Layout flex={1} content="center" items ="center">
   <StarRating
       starStyle={{}}
       disabled={false}
       maxStars={5} 
       rating={5}
       starSize={13}
       fullStarColor={"#eed816"}
       halfStarColor={"#eed816"}
       emptyStarColor={"#eed816"}
      //  selectedStar={rating => this.onStarRatingPress(rating)}
     />
   </Layout>
 <Layout flex={1}>
 <NativeBase.Text style={{fontSize:12, textAlign:"right"}}>
     {moment().format('DD/MM/YYYY')}
   </NativeBase.Text>
 </Layout>

   </Layout>
  <NativeBase.Text style={{fontSize:13}}>{e.comment}</NativeBase.Text>
 </Layout>
   
   )
  })
 
}
  addToCard =()=>{
    
    let { product,quantity} = this.state;
     if(product.Summary <0) product.Summary =0;
     if(product.Summary ==0 )
     {
      Toast.show("Không có hàng để thêm", Toast.LONG);
       return;
     }
     if(quantity ==0 ){
      Toast.show("Vui lòng chọn số lượng", Toast.LONG);
      return;
     }
    const data ={
      CustomerID:StaticUser.getCurrentUser().CustomerID,
      SourceOfItemsID:product.SourceOfItemsID,
      amount:this.state.quantity,
      PartnerID: product.PartnerID
    }
 request((res,err)=>{
 
 // console.log("-----",URL.UrlAddToCart,res,err);
  if(res){

   

    const data = res.data;

    if(data.err && data.err =="timeout"){
   
      this.setState({...this.state,isLoading:false})
      this.props.dispatch(loggedIn(false))
      return;
      
    }else{


      this.setState({isLoading:false})
      if(data.status){
        Toast.show("Thêm thành công", Toast.LONG);
        this.props.navigation.navigate("CardScreen",{
          CustomerID: StaticUser.getCurrentUser().CustomerID
        })
      }else if(data.message == "repeate"){
        Alert.alert(
          '',
          `Bạn có muốn hủy bỏ sản phẩm đã chọn trong giỏ hàng để tiếp tục?`,
          [
            {text: 'Hủy', onPress: () => {
              // this.props.navigation.replace("HistoryDetailScreen", {
              //   OrderID : data.message
              // })
            }},
       
            {text: 'Có', onPress: () => {
             this.deleteAllCard();
            }},
          ],
          { cancelable: false }
        )
      
       }
     
     


    
    }
    

  
     
  }
    else{
      Toast.show("Kiểm tra kết nối", Toast.LONG);
      this.setState({...this.state,isLoading:false})
    }

      
    
    


}).post(URL.UrlAddToCart,data)
  }


  deleteAllCard =()=>{
    request((res,err)=>{
 
    
      if(res){
  
        const data = res.data;
        //  console.log(res);
          
        if(data.err && data.err =="timeout"){
       
          this.setState({...this.state,isLoading:false})
          this.props.dispatch(loggedIn(false))
          return;
          
        }else{
          this.setState({isLoading:false})
          
          this.addToCard();
    
      
         
      }
    }
        else{
          Toast.show("Kiểm tra kết nối", Toast.LONG);
          this.setState({...this.state,isLoading:false})
        }
    
          
        
        
    
    
    }).get(URL.UrlDeleteAllCArd+`${StaticUser.getCurrentUser().CustomerID}/delete`,null)
  }
  onOrderPress =()=>{
  
    this.props.navigation.navigate("OrderScreen");
  }
  render() {

    const  { product,rate} = this.state;
    const DiscountPrice = 30;
    const Price =25;
    const Description ="tuyet voi"

    return (
      <Layout style={styles.container}>
      
        <NativeBase.Content contentContainerStyle={{ paddingBottom:60}}>
        <Layout height={height/3.2}>
            <SmartImage source = {ImageAsset.Food3} style={{flex:1}}/>

         </Layout>
          <Layout style={{paddingHorizontal:15}}>
         
         <Layout>

          <NativeBase.Text style={{fontSize:20, fontWeight:"bold", marginVertical:5}}>
                {"Nguyen Vuong"}
                </NativeBase.Text>
                <NativeBase.Text style={{fontSize:15, marginVertical:5}}>
                {"Tho Ngoc"}
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
    
              <Layout>
                <NativeBase.Text style={{fontSize:13, color:"red"}}>
                  {`Giảm ${10}% cho tổng giá trị đơn hàng từ ${numeral(200000).format("0,00")}`}
                </NativeBase.Text>
               
              </Layout>
                <Layout row>
                  <FastImage resizeMode="contain" source ={ImageAsset.TrackIcon} style={{ height:16, width:16, alignSelf:"center"}} />
                  <NativeBase.Text style={{ marginVertical:5,opacity:0.5, alignSelf:"center", fontSize:12}}>
                  {'ha Noi Viet Nam'}
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
                    {this.state.rootSumary}
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
                 <NativeBase.Text style={{margin:5, textAlign:"left", fontSize:13}}> {Description}</NativeBase.Text>
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
                  this.props.navigation.navigate("ReviewScreen")
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
                    {this.state.qas.length === 0 && (
                      <NativeBase.Text style={{fontSize:13, marginVertical:15}}>Không có câu hỏi nào</NativeBase.Text>
                    )}
                   {this.renderQA()}
                   <View style={{ height:0.5, width:"100%", backgroundColor:"gray"}}/>
                   <Layout row>
                    <TouchableWithoutFeedback onPress={()=>{
                 this.setState({isShowPopupQA:true})
               }}>
                 <View style={{flex:1, justifyContent:"center",padding:10}}>
                   <NativeBase.Text style={{textAlign:"center", fontSize:13}}>
                     Thêm Câu hỏi
                   </NativeBase.Text>
                 </View>
               </TouchableWithoutFeedback>
                {this.state.qas.length>2 && (<View style={{ width:0.5, height:"100%", backgroundColor:"gray"}}/>) } 

                {this.state.qas.length>2 && (
                   <TouchableWithoutFeedback
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
                </TouchableWithoutFeedback>
                )}
               
             </Layout>
                  
                </Layout>
           
          <Layout>
          <NativeBase.Text style={{fontWeight:"bold", marginTop:20}}>Sản phẩm liên quan </NativeBase.Text>
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
                  
                  
          </Layout>
        
        </NativeBase.Content>
        <Layout row height ={50} style={{position:"absolute", width:"100%", bottom:0, elevation:5 }}>
        <TouchableWithoutFeedback onPress={this.addToCard}>
          <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"white"}}>
          <Layout>
            <NativeBase.Text>
              Thêm vào giỏ
            </NativeBase.Text>
          </Layout>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.onOrderPress}>
          <View 
           style={{elevation:5,flexDirection:"row", alignItems:"center", justifyContent:"center", flex:1, backgroundColor:Colors.primaryColor}}>
            <FastImage
            tintColor={"white"}
             source={ImageAsset.CardIcon} style={{ alignSelf:"center", width:20, height:20, tintColor:"white", marginRight:6 }}/>
            <NativeBase.Text style={{fontWeight:"bold", color:"white"}}>
              Đặt hàng
            </NativeBase.Text>
          </View>
          </TouchableWithoutFeedback>
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
          {this.renderModalQA()}
        <ProgressDialog isShow={this.state.isLoading}/>
    </Layout>)
  }
  rateStar =(star)=>{
  
    this.setState({star})
  }
  renderItem =(item)=>{
    return (
      <TouchableWithoutFeedback onPress={()=>{
      
       this.props.navigation.push("ProductDetailScreen",{
        SourceOfItemsID: item.item.SourceOfItemsID,
       
       })
      }}>
        <View>
      <Layout style={{height:height/5, width:height/6}} margin={[0,0,0,15]} radius={3} hidden>
        <SmartImage source={ImageAsset.Food1} style={{height:90, width:"100%"}} />
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
  
  onSubmitReview = ()=>{

      const { rate} = this.state;
      if(star ==0){
        Toast.show("Vui lòng chọn Star Rating", Toast.LONG);
        return;
      }
      const dataReview = {
        comment:'Nice'
      }
      rate.push(dataReview);
      this.setState({rate})
      
  }
  addQuestion = ()=>{

    let { question,qas} = this.state;
    if(question ==""){
      Toast.show("Vui lòng nhập câu hỏi", Toast.LONG);
      return;
    };
    const newQuestion = {
      cauhoi:{ question:'What is your fullname?'},
      traloi:[]
    }
    qas.push(newQuestion);
    console.log(qas);
    this.setState({qas, isShowPopupQA:false})

    
  
  
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
    <NativeBase.Text style={{fontSize:13}}>{StaticUser.getCurrentUser().userName}</NativeBase.Text>
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
  renderModalQA =()=>{
    return ( <CustomModal
    isShow={this.state.isShowPopupQA}
    renderContent={
      <View style={{ padding: 20 }}>
      
        <View style={{ flexDirection: "row" }}>
       
          <View style={{  }}>
            <NativeBase.Text style={{fontSize:18, fontWeight:"bold"}}>
              Thêm câu hỏi
            </NativeBase.Text>
    <NativeBase.Text style={{fontSize:13}}>{'Admin'}</NativeBase.Text>
          </View>
        </View>
       
        <View
          style={{ height: 156, backgroundColor: "white", borderRadius: 6 }}
        >
          <NativeBase.Input
            multiline={true}
            value={this.state.question}
            placeholder={"Đặt câu hỏi"}
            style={[
             
              {
                textAlignVertical: "top",
                fontSize:13
              },
            ]}
            onChangeText={question => this.setState({question})}
          />
        </View>
      
        <NativeBase.Button
          onPress={this.addQuestion}
          style={{ backgroundColor: Colors.primaryColor, justifyContent:"center" , alignItems:"center"}}
        >
          <NativeBase.Text>Gửi</NativeBase.Text>
        </NativeBase.Button>
        <TouchableOpacity
          onPress={() =>{
            this.setState({isShowPopupQA:false})
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
    isLogged : state.appReducer.isLogged,
    isUpdate: state.appReducer.isUpdate,
  }
}
export default connect(mapStateToProps)(ProductDetailScreen);
