import React from 'react';
import { View, Text, StatusBar } from 'react-native';
// Styles and Colors
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';


class CircleTickComponent extends React.Component{
    render(){
        const {size, darkMode} = this.props;

        return(
            <View style={[styles.allCenter, { width: size, height: size, borderRadius: size/2, borderWidth:size/50, borderColor: Colors.darkGreen}]}>
                <View style={[styles.paddingBottom12, darkMode ? styles.bgLightGray : styles.bgWhite, { marginLeft: size/2, marginTop: -size/3.5, transform: [{rotate: '315deg'}]}]}>
                    <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, { height: size/5, width: size/1.4, borderWidth:size/50, borderTopWidth:0,borderRightWidth:0, borderColor: Colors.darkGreen }]}/>
                </View>
            </View>
        );
    }
}

export default CircleTickComponent;

