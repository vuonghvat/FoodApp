import React, { PureComponent } from "react";
import { View,Modal,ActivityIndicator,Text } from "react-native";

export default class ProgressDialog extends PureComponent {

 

  render() {
      if(this.props.isShow)
    return <CustomProgressBar />
    return null;
  }

}
   const CustomProgressBar = ({ visible }) => (
        <Modal onRequestClose={() => null} visible={visible}>
          <View style={{ flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
              <Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
              <ActivityIndicator size="large" />
            </View>
          </View>
        </Modal>
      );