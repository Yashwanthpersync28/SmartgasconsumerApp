import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux'
import { heightValue, styles, widthValue } from '../../styles/styles';
import Colors from '../../styles/Colors';
import IIcons from 'react-native-vector-icons/Ionicons';
import ADIcons from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';



export const BottomTabComponent = (props) => {
     const { focused, Icon } = props
     const darkMode = useSelector((state)=> state.darkMode)
     const global = useSelector((state)=> state)

    //  console.log("Dashboard",props)
        const dashboard = Icon == "grid-outline" && focused
        const search = Icon == "grid-outline" && focused
       return(
        <View style = {[styles.flexOne]}>        
            <View style = {[  styles.flexOne]}>
                <View style={[styles.flexOne, styles.allCenter]}>
                    { Icon == "plus" ?  
                        <ADIcons name = { Icon } color = { focused ? Colors.green : darkMode ? Colors.white : Colors.greyMediumicon } size = { focused ?  heightValue(32) : heightValue(36) }/>
                        : 
                        <MIcon name = { Icon } color = { focused ? Colors.green : darkMode ? Colors.white : Colors.black }  size = { focused ?  heightValue(26) : heightValue(30) }/>
                    }
                </View>
                <View  
                    backgroundColor = { focused ? Colors.green : "transparent" }
                    style={{ padding: 2, width: widthValue(8),  borderTopRightRadius:4, borderTopLeftRadius:4, }}
                />
                <View/>
            </View>    
        </View>           
    );
}