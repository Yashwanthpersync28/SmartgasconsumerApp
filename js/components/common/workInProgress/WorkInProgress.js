import React from 'react';
import { View, Text } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
// Libraries
import LottieView from 'lottie-react-native';
import { WORK_IN_PROGRESS } from 'SmartgasConsumerApp/js/constants/lottie';

class WorkInProgressComponent extends React.Component{
    render(){
        const {language, darkMode} = this.props;
        return(
           <View style={[styles.flexOne, darkMode ? styles.bgGreen : styles.bgWhite]}>
                <Text style={[styles.flexOne, styles.paddingTopHeader, styles.large, styles.selfCenter, styles.green, styles.marginTop]}>
                    Work In Progress
                </Text>
                <LottieView style={[]} source={WORK_IN_PROGRESS.workInProgress} autoPlay loop />
           </View>
        );
    }
}

export default WorkInProgressComponent;
