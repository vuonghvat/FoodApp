import * as NativeBase from "native-base";
import PropTypes from "prop-types";
import React, { Component, PureComponent } from "react";
import {
  StyleSheet,
  Platform,
  View,
  Animated,
  Image,
  Dimensions,
} from "react-native";


const { width, height } = Dimensions.get("window");

class Line extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  render() {
    const {
        top, left, bottom, right,
      color,
      height
    } = this.props;
    return (
      <View style={{ width: "100%", height: height || 1, backgroundColor: color || "#f3f3f3", 
      marginTop:top||0 ,marginBottom:bottom||0, marginLeft:left||0, marginRight:-10}} />
    );
  }
}
Line.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number,
};



export default Line;
