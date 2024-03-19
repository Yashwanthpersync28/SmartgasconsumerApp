import React from 'react';
import { View,  } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
// Constants
import { LOADING } from 'SmartgasConsumerApp/js/constants/lottie';
// Library
import LottieView from 'lottie-react-native';

export default class LoaderComponent extends React.Component {
    render() {
        return (
            <View style={[, styles.selfCenter, {height: 50, width:50}]}>
                <LottieView style={[]} source={LOADING.loadingLottie} autoPlay loop />
            </View>
        );
    }
}
