import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
// Backend
import {strings} from "SmartgasConsumerApp/js/strings";
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';

class HouseholdApplianceComponent extends React.Component{
    render(){
        const {language, darkMode} = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.padding16, styles.radius16, styles.paddingHorizontal24, styles.marginVertical4, styles.marginHorizontal, styles.elevate2]}>
                {/* <Text style={[styles.palanquinMedium, styles.darkGreen, styles.fontSize15, styles.paddingVertical2]}> */}
                <Text style={[styles.darkGreen, styles.fontSize15, styles.paddingVertical2]}>
                    {strings[language].energyCostCalc.didYouKnow}
                </Text>
                {/* <Text style={[styles.palanquinMedium, styles.fontSize13, styles.lineHeight18]}> */}
                <Text style={[darkMode ? styles.white : styles.black, styles.fontSize13, styles.lineHeight18, styles.opacity65perc, {width:Dimensions.get('window').width/1.4}]}>
                    {strings[language].energyCostCalc.didYouKnowContent}
                </Text>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default HouseholdApplianceComponent;