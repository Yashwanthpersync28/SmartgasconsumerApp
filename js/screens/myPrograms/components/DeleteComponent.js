import React from 'react';
import { View, Text, StatusBar } from 'react-native';
// Styles and Colors
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';


class DeleteComponent extends React.Component{
    render(){
        const {size, darkMode} = this.props;

        return(
            <ErrorBoundaryMainComponent>
            <View style={[styles.allCenter]}>
                <View style={[,{ width: size/1.8, height: size/4.2, borderRadius: size/7, borderWidth:size/40, borderColor: Colors.darkGreen, borderBottomWidth:0, borderBottomEndRadius:0, borderBottomLeftRadius:0}]}>
               
                </View>
                <View style={[, { width: size/0.85, borderWidth:size/40, borderColor: Colors.darkGreen, borderBottomWidth:0, borderBottomEndRadius:0, borderBottomLeftRadius:0}]}>
               
                </View>
                <View style={[{ width: size/1.1, height: size, borderRadius: size/7, borderWidth:size/40, borderColor: Colors.darkGreen, borderTopWidth:0, borderTopLeftRadius:0, borderTopRightRadius:0}]}>
               
                </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default DeleteComponent;

