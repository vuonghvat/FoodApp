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

 class AnimatedLayout extends Component {
   constructor(props) {
     super(props);

     this.state = {
       visible: props.visible,
     };
   }
   componentWillMount() {
     this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
   }

   componentWillReceiveProps(nextProps) {
  
     
     if (nextProps.visible) {
       this.setState({ visible: true });
     }

     Animated.timing(this._visibility, {
       toValue: nextProps.visible ? 1 : 0,
       duration: 200,
     }).start(() => {

       this.setState({ visible: nextProps.visible });
     });
   }

   
   render() {
     const { visible, style, children, ...rest } = this.props;

     const opacity = this._visibility.interpolate({
       inputRange: [0, 1],
       outputRange: [0, 1],
     });
     const scale = this._visibility.interpolate({
       inputRange: [0,0.5, 1],
       outputRange: [0.5,1.2, 1],
     });
    const translate = this._visibility.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -2],
    });
    
     
     const containerStyle = {
       opacity,
       transform: [
         {
           scale,
         },
         { translateX: translate },
       ],
     };

     const combinedStyle = [containerStyle, style];
     return (
       <Animated.View
         style={combinedStyle}
         {...rest}
       >
         <View>{this.state.visible?children:null}</View>
       </Animated.View>
     );
   }
 }
export default AnimatedLayout;
