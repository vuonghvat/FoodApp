/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';

import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
const AuthContext = React.createContext();
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


import store from "./redux/store"
import {Provider} from 'react-redux';
import RootSceen from './components/screens/roots/RootSceen';




export default class App extends React.Component {

  render(){
    return (
   
      <Provider store={store}>
          <RootSceen/>
      </Provider>

  );
  }
}

