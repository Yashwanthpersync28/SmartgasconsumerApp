import React from 'react';
import { View, Dimensions } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';

const {height, width} = Dimensions.get('window');
export class Form3dBackgroundComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <View style={[{height:width/8}]}>
                <View style={[styles.borderTopRadius40, styles.marginHorizontal64, styles.bgDarkGreen, styles.absolute, {top: width/18, left: 0, right: 0, bottom: -width/18}]}/>
                <View style={[styles.borderTopRadius40, styles.marginHorizontal36, styles.bgGreen, styles.absolute, {top: width/11, left: 0, right: 0, bottom: -width/11}]}/>
            </View>  
        )
    }
}
