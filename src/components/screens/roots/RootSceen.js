
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

import Layout from "../../layouts/Layout"
import {connect} from "react-redux"
import { loggedIn } from "../../../redux/app/action";
import LoginScreen from "../login/LoginScreen"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FutureScreen from '../login/FutureScreen'

import ImageAsset from "../../../assets/images/ImageAsset";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import VerifyNumberPhoneScreen from "../signup/VerifyNumberPhoneScreen";
import SignupInfoScreen from "../signup/SignupInfoScreen";
import Colors from "../../../assets/themes/colors";
import MoreScreen from "../mores/MoreScreen";
import SearchScreen from "../search/SearchScreen";

import ProductDetailScreen from "../products/ProductDetailScreen";
import HomeScreen from "../home/HomeScreen";
import ReviewScreen from "../products/ReviewScreen";
import CardScreen from "../products/CardScreen";
import OrderScreen from "../products/OrderScreen";
import HistoryScreen from "../history/HistoryScreen";
import AsyncStorageApp from "../../../utils/AsyncStorageApp";
import StaticUser from "../../../utils/StaticUser";
import HistoryDetailScreen from "../history/HistoryDetailScreen";
import ListAllProduct from "../home/ListAllProduct";
import QAScreen from "../products/QAScreen";
import ChangePasswordScreen from "../login/ChangePasswordScreen";



const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();



class RootSceen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
     userToken:"",
     isLogged:undefined
    };
    this.bootstrapAsync()
  }
   bootstrapAsync = async () => {
    let userToken;
    
    try {
      userToken = await AsyncStorage.getItem('userToken');
      
    } catch (e) {
      // Restoring token failed
    }
   
   
  };
componentWillReceiveProps=(props)=>{
  console.log("props",props);
  if(props.isLogged){
    console.log("props",props);
    
    this.setState({isLogged:true});

  }else{

    this.setState({isLogged:false});
  }
}
componentWillMount(){
  AsyncStorageApp._retrieveData("user_login",res=>{
   

    const token = res?res.access_token || undefined:undefined;
    const user =  res?res.user || undefined:undefined;
    console.log("res");
    if(res){
  
      if(token &&  user){
        StaticUser.currentUser.userName = user.CustomerUsername;
        StaticUser.currentUser.phone = user.CustomerPhone;
        StaticUser.currentUser.email = user.CustomerEmail;
        StaticUser.currentUser.name = user.CustomerName;
        StaticUser.currentUser.CustomerID = user.CustomerID
        this.props.dispatch(loggedIn(true))
        this.setState({isLogged:true})
      }
    }else{
     
      this.setState({isLogged:false})
    }
  
  })
}
componentDidMount(){


}
  TabScreen = ()=> {
  return (
    <Tab.Navigator 
    initialRouteName="HomeScreen"
    activeColor={Colors.primaryColor}
    inactiveColor="gray"
    barStyle={{ backgroundColor: Colors.white }}
     >
    <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image source={ImageAsset.Home} style={{tintColor:color, height:20, width:20}}/>
          ),
        }}
      />
  
      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'Lịch Sử',
          tabBarIcon: ({ color, size }) => (
            <Image source={ImageAsset.TimeIcon} style={{tintColor:color, height:20, width:20}}/>
          ),
        }}
      />
      <Tab.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ color, size }) => (
            <Image source={ImageAsset.AccountIcon} style={{tintColor:color, height:20, width:20}}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

  
  render() {
    if(this.state.isLogged ===undefined){
      return null;
    }
    if(this.state.isLogged)
    return (
      <NavigationContainer>
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="TabScreen" component={this.TabScreen}/>
              <Stack.Screen name="SearchScreen" component={SearchScreen}/>
              <Stack.Screen name ="ProductDetailScreen" component ={ProductDetailScreen} />
              <Stack.Screen name="ReviewScreen" component= {ReviewScreen}/>
              <Stack.Screen name="CardScreen" component= {CardScreen}/>
              <Stack.Screen name="OrderScreen" component= {OrderScreen}/>
              <Stack.Screen name="HistoryScreen" component= {HistoryScreen}/>
              <Stack.Screen name="HistoryDetailScreen" component= {HistoryDetailScreen}/>
              <Stack.Screen name="ListAllProduct" component= {ListAllProduct}/>
              <Stack.Screen name="QAScreen" component= {QAScreen}/>
              <Stack.Screen name="ChangePasswordScreen" component= {ChangePasswordScreen}/> 
            </Stack.Navigator>
            
                
      </NavigationContainer>
    );
      if(!this.state.isLogged)
    return (
      <NavigationContainer>
      <Stack.Navigator  headerMode="none">
                <>
                <Stack.Screen name="FutureScreen" component={FutureScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="VerifyNumberPhoneScreen" component={VerifyNumberPhoneScreen} />
                <Stack.Screen name="SignupInfoScreen" component={SignupInfoScreen} />

                </>
      </Stack.Navigator>
      </NavigationContainer>
    );
  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapProps =  state =>{
  return {
    isLogged:state.appReducer.isLogged
  }
}
export default connect(mapProps)(RootSceen);
