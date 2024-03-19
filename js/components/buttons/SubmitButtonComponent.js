import { View, Text, TouchableOpacity,Dimensions } from "react-native";
import React from "react";
import { heightValue, screenHeight, screenWidth, styles, widthValue } from "../../styles/styles";
import { TextComponent } from "../TextComponent";
export const SubmitButtonComponent = ({
  name,
  onPress,
  style,
  TextStyle,
  disabled,
}) => {

  const { width,height } = Dimensions.get('window');

  return (
    <View style={[styles.allCenter, {opacity: disabled ? 0.4 : 1}
    ]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          { borderRadius: 24 },
          styles.allCenter,
          height/18,
          width/1.6,
          styles.bgViolet,
          style
        ]}
      >
        <Text
          style={[
            styles.white,
            styles.fontSize14,
            styles.fontWeight700,
            TextStyle,
          ]}
        >{name}</Text>
      </TouchableOpacity>
    </View>
  );
};
