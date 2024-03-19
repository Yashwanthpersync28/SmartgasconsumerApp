import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';

class EnergyTipsComponent extends React.Component{
    render(){
        const { height, width } = Dimensions.get('window');
        const {language, darkMode} = this.props;
        return(
            <View style={[,styles.flexOne, {width:width/1.16}, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.row, styles.padding, styles.paddingHorizontal24, styles.marginRight16, styles.elevateMild, styles.marginVertical]}>
                <View style={[, styles.paddingVertical]}>
                    <View style={[]}>
                        <Text style={[styles.regular, styles.darkGreen]}>
                            {this.props.header}
                        </Text>
                    </View>
                    <View style={[, styles.centerVertical, styles.centerVertical, styles.paddingTop]}>
                        <Text style={[, styles.centerVertical, styles.fontSize13, darkMode ? styles.white : styles.black, styles.opacity65perc, styles.lineHeight18]}>
                            {this.props.description}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default EnergyTipsComponent;