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

class Layout extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  render() {
    const {
      row,
      bgColor,
      content,
      items,
      flex,
      margin,
      padding,
      style,
      radius,
      hidden,
      height,
      width,
      pointerEvents,
      onLayout,
      key,
    } = this.props;

    const mLength = margin ? margin.length : 0;
     const marginStyle =
       mLength > 0
         ? {
             marginTop:  margin[0] ,
             marginBottom:  (mLength >= 1 ? margin[1] : 0),
             marginLeft:   (mLength >= 2 ? margin[2] : 0) ,
             marginRight: (mLength >= 3 ? margin[3] : 0),
           }
         : { margin };
   
      const pLength = padding? padding.length:0
      const paddingStyle = pLength>0? {  paddingTop: padding[0],
            paddingBottom: (pLength >= 1 ? padding[1] : 0),
            paddingLeft:   (pLength >= 2 ? padding[2] : 0) ,
            paddingRight: (pLength >= 3 ? padding[3] : 0)}:{padding}
    const radiusLength = radius ? radius.length : 0;
    const radiusStyle = radiusLength > 0 ? { 
       borderTopLeftRadius: radius[0] ,
        borderTopRightRadius:radiusLength >= 1 ? radius[1] : 0 ,
        borderBottomLeftRadius: radiusLength >= 2 ? radius[2] : 0,
       borderBottomRightRadius:radiusLength >= 3 ? radius[3] : 0
    } : {borderRadius:radius}
    return (
      <View
        key={key}
        onLayout={onLayout}
        pointerEvents={pointerEvents}
        style={[
          {
            flexDirection: row ? "row" : "column",
            flex: flex ? flex : undefined,
            backgroundColor: bgColor,
            justifyContent: content !== null ? content : undefined,
            alignItems: items !== null ? items : undefined,
            overflow: hidden ? "hidden" : undefined,
            height: height || undefined,
            width: width || undefined,
          },
          marginStyle,
          paddingStyle,
          radiusStyle,
          style,
        ]}
      >
        {this.props.children}
      </View>
    );
  }
}
Layout.propTypes = {
  row: PropTypes.bool,
  flex: PropTypes.number,
  bgColor: PropTypes.string,
  content: PropTypes.string,
  itéms: PropTypes.string,
  style: PropTypes.style,
  radius: PropTypes.number,
  hidden: PropTypes.bool,
  pointerEvents: PropTypes.string,
  key:PropTypes.string
};

const styles = StyleSheet.create({});

export default Layout;
