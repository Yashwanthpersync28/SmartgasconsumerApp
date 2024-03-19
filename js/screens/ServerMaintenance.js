import React from "react"
import { View,Text } from "react-native"
import LottieView from 'lottie-react-native';
import { SERVER } from "../constants/lottie";
import { useSelector } from "react-redux";
import { styles } from "../styles";


export const ServerMaintenanceScreen =({darkMode}) =>
{
    // const {darkMode} = useSelector((state)=>state.system)
    return(

        <View style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne,styles.centerHorizontal]}>
            <Text style={[styles.fontSize36,styles.marginTop32]} >Sorry!</Text>
            <Text style={[styles.fontSize23,styles.marginVertical14]}>Server under Maintenance</Text>
            <LottieView style={[]} source={SERVER.server} autoPlay loop />
        </View>
    );
}
{/* notice_type notice_title notice_desc */}