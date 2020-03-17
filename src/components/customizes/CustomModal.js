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
  TouchableOpacity,
} from "react-native";

import Modal from "react-native-modal"
const { width, height } = Dimensions.get("window");

class CustomModal extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { renderContent, contentStyle, isShow } = this.props;
    return (
      <View>
        <Modal
          hardwareAccelerated
          // customBackdrop={<View style={{width,height:height+50, backgroundColor:"red"}}></View>}
          animationType="fade"
          deviceHeight={height + 50}
          deviceWidth={width}
          style={{
            padding: 0,
            margin: 0,
          }}
          isVisible={isShow}
        > 
          <View style={styles.container}>
            <View style={[styles.contentStyle, contentStyle]}>
              {renderContent}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
CustomModal.propTypes = {
  contentStyle: PropTypes.object,
  renderContent: PropTypes.object,
};

const styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: "#f2f2f2",
    width: width / 1.2,
    borderRadius: 6,
  },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default CustomModal;