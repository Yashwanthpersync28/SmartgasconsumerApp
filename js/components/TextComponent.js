import React from "react";
import { Text } from "react-native";
// import { useSelector } from "react-redux";
// import { textColor } from "../styles/styles";

export const TextComponent = ({ name, style,onPress,darkMode}) => {

    // const { darkMode } = useSelector((state) => state.system)


    return(
        <Text style={[ ...style]} onPress={onPress}>
            {name}
        </Text>
    )
}

// textColor(darkMode)