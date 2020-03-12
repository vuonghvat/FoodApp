
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
import HomeScreen from '../home/HomeScreen';
import FutureScreen from '../login/FutureScreen'

import ImageAsset from "../../../assets/images/ImageAsset";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import VerifyNumberPhoneScreen from "../signup/VerifyNumberPhoneScreen";
import SignupInfoScreen from "../signup/SignupInfoScreen";
import Colors from "../../../assets/themes/colors";
import MoreScreen from "../mores/MoreScreen";
import SearchScreen from "../search/SearchScreen";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

// function TabScreen() {
//   return (
//     <Tab.Navigator 
//     initialRouteName="HomeScreen"
//     activeColor={Colors.primaryColor}
//     inactiveColor="gray"
//     barStyle={{ backgroundColor: Colors.white }}
//      >
//     <Tab.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <Image source={ImageAsset.Home} style={{tintColor:color, height:20, width:20}}/>
//           ),
//         }}
//       />
  
//       <Tab.Screen
//         name="MoreScreen"
//         component={MoreScreen}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <Image source={ImageAsset.Home} style={{tintColor:color, height:20, width:20}}/>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

class RootSceen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
     userToken:"",
     isLogged:false
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
componentDidMount(){
  this.setState({isLogged:this.props.isLogged});
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
        name="MoreScreen"
        component={MoreScreen}
        options={{
          tabBarLabel: 'Thêm',
          tabBarIcon: ({ color, size }) => (
            <Image source={ImageAsset.AccountIcon} style={{tintColor:color, height:20, width:20}}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

  
  render() {
   
    if(this.state.isLogged)
    return (
      <NavigationContainer>
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="TabScreen" component={this.TabScreen}/>
              <Stack.Screen name="SearchScreen" component={SearchScreen}/>
            </Stack.Navigator>
            
                
      </NavigationContainer>
    );

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
