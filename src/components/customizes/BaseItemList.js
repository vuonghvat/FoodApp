import React, { PureComponent } from "react";
import { View } from "react-native";

export default class BaseItemList extends PureComponent {
  render() {
    return <View>{this.props.renderView}</View>;
  }
}
