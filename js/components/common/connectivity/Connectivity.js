import React from 'react';
import { View, Text, StatusBar } from 'react-native';
// Styles and Colors
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Library
import LottieView from 'lottie-react-native';
// Backend
import {strings} from "SmartgasConsumerApp/js/strings";
// Constants
import {CONNECTIVITY} from 'SmartgasConsumerApp/js/constants/lottie';

class ConnectivityComponent extends React.Component{
    render(){
        const {language, darkMode} = this.props;

        return(
            <View style={[styles.flexOne,
                styles.widthFixed,
                styles.heightFixed,
                styles.paddingTopHeader,
                darkMode ? styles.bgBlack : styles.bgIdk,
                styles.paddingHorizontal24,
                styles.absolute, {
                zIndex: 99999,
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
            }]}>
                { darkMode ?  <StatusBar backgroundColor={Colors.black} barStyle='light-content'  /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'  />}
                <View style={[{width: 300}, styles.flexOne, styles.selfCenter]}>
                    <LottieView source={CONNECTIVITY.noInternet} autoPlay loop />
                </View>
                <View style={[styles.flexOne, styles.centerHorizontal]}>
                    <Text style={[styles.darkGreen, styles.medium, styles.marginVertical4, styles.textCenter]}>
                        {strings[language].connectivityHeader}
                    </Text>
                    <Text style={[styles.medium, styles.opacity25perc, darkMode ? styles.white :  styles.black]}>
                        {strings[language].connectivitybody1}
                    </Text>
                    <Text style={[styles.medium, styles.opacity25perc, darkMode ? styles.white :  styles.black]}>
                        {strings[language].connectivitybody2}
                    </Text>
                </View>
            </View>
        );
    }
}

export default ConnectivityComponent;





