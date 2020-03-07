import * as NativeBase from "native-base";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {StyleSheet, Platform, View, TouchableOpacity} from 'react-native';




class Toolbar extends Component {
  render() {
    var {
      toolbarColor,
      title,
      rightIcon,
      leftIcon,
      leftAction,
      rightAction,
      titleLeft,
      imageRight,
      imageLeft,
      hasTabs,
      leftAfterAction,
      titleContainerStyle,
      imageLeftAfter,
      styleLeftContainer,
      styleRightContainer,
      ellipsizeMode,
      numberOfLines,
      rightBeforeAction,
      imageBeforeRight,
      onPressTextTitle,
    } = this.props;
    return (
      <NativeBase.Header
        hasTabs={hasTabs}
        transparent={Platform.OS === "ios" ? true : false}
        style={{
          backgroundColor: toolbarColor,
          height: 60,
          // elevation: 10,
          // shadowOffset: {width: 10, height: 10},
          // shadowColor: 'white',
          // shadowOpacity: 1,
        }}
        androidStatusBarColor={toolbarColor}
        iosBarStyle="dark-content"
      >
        <NativeBase.Left
          style={[
            {
              flex: 1.5,
              flexDirection: "row",
              margin: 0,
              padding: 0,
              justifyContent: "flex-start",
              alignItems: "center",
            },
            styleLeftContainer,
          ]}
        >
          {leftIcon !== "" && (
            <NativeBase.Button transparent onPress={leftAction}>
              <NativeBase.Icon
                name={leftIcon}
                style={{
                  color: "black",
                }}
              />
            </NativeBase.Button>
          )}

          {titleLeft !== "" && (
            <NativeBase.Text
              style={{
                color: "black",
                textAlign: "center",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              {titleLeft}
            </NativeBase.Text>
          )}

          {imageLeft !== null && (
            <TouchableOpacity style={{ marginLeft: 12 }} onPress={leftAction}>
              {imageLeft}
            </TouchableOpacity>
          )}
          {imageLeftAfter !== null && (
            <TouchableOpacity
              style={{ marginLeft: 12 }}
              onPress={leftAfterAction}
            >
              {imageLeftAfter}
            </TouchableOpacity>
          )}
        </NativeBase.Left>
        <NativeBase.Body
          style={[
            {
              flex: rightAction === "" || leftAction === "" ? 2.5 : 0,
            },
            titleContainerStyle,
          ]}
        >
          <NativeBase.Text
            onPress = {onPressTextTitle}
            ellipsizeMode={"tail"}
            numberOfLines={numberOfLines || 1}
            style={[styles.txt_title, this.props.titleStyle]}
          >
            {title}
          </NativeBase.Text>
        </NativeBase.Body>
        <NativeBase.Right
          style={[{ flex: 1.5, flexDirection: "row" }, styleRightContainer]}
        >
          {imageBeforeRight !== null && (
            <TouchableOpacity style={{ marginRight: 12 }} onPress={rightBeforeAction}>
              {imageBeforeRight}
            </TouchableOpacity>
          )}
          {imageRight !== null && (
            <TouchableOpacity style={{ marginRight: 12 }} onPress={rightAction}>
              {imageRight}
            </TouchableOpacity>
          )}
          {rightIcon !== "" && (
            <NativeBase.Button transparent onPress={rightAction}>
              <View>
                <NativeBase.Text
                  style={{
                    color: "#FFF",
                    fontSize: fontSizer(15),
                  }}
                >
                  {rightIcon}
                </NativeBase.Text>
              </View>
            </NativeBase.Button>
          )}
        </NativeBase.Right>
      </NativeBase.Header>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    flex: 1
  },
  txt_title: {
    fontSize: 14,
    left: 0,
    right: 0,
    textAlign: "center",
    alignSelf: "center",
    
  }
});

Toolbar.propTypes = {
  toolbarColor: PropTypes.string,
  title: PropTypes.string,
  rightIcon: PropTypes.string,
  leftIcon: PropTypes.string,
  leftAction: PropTypes.func,
  rightAction: PropTypes.func,
  titleLeft: PropTypes.string,
  imageRight: PropTypes.object,
  imageLeft: PropTypes.object,
  imageLeftAfter: PropTypes.object,
  leftAfterAction: PropTypes.func,
  titleContainerStyle: PropTypes.object,
  styleLeftContainer: PropTypes.style,
  styleRightContainer: PropTypes.style,
  numberOfLines: PropTypes.number,
  ellipsizeMode: PropTypes.string,
  rightBeforeAction: PropTypes.func,
  onPressTextTitle:PropTypes.func,
};

Toolbar.defaultProps = {
  toolbarColor: "green",
  title: "",
  rightIcon: "",
  leftIcon: "",
  leftAction: null,
  rightAction: null,
  titleLeft: "",
  imageRight: null,
  imageLeft: null,
  titleContainerStyle: {},
  onPressTextTitle:null,
};

export default Toolbar;
