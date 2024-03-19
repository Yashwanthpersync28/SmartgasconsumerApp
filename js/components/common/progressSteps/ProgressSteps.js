import React from 'react';
import { Text, View } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';

class ProgressStepsComponent extends React.Component{
    render(){
        const {language, darkMode} = this.props;
        return(
            <View style={[styles.allCenter]}>
                <View style={[styles.icon40, this.props.bgColor, styles.allCenter]}>
                    <Text style={[styles.white, styles.palanquinLight, styles.regularPlus]}>
                        {this.props.step}
                    </Text>
                </View>
                <View>
                    <Text style={[styles.palanquinLight, styles.fontSize13, styles.marginTop10, darkMode ? styles.white : styles.black]}>
                        {this.props.label}
                    </Text>
                </View>
            </View>
        );
    }
}

export default ProgressStepsComponent;