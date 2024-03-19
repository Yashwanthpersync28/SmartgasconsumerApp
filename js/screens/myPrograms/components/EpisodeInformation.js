import React from 'react';
import { Text, View } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Library
import moment from "moment"
// Language
import {strings} from "SmartgasConsumerApp/js/strings";
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';


class EpisodeInformationComponent extends React.Component{
    render(){
        const {language, darkMode, description, type} = this.props;
        console.log('THis Props', this.props);
        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.paddingHorizontal20, styles.paddingVertical6, styles.marginHorizontal10, styles.marginVertical, styles.paddingHorizontal30]}>
                <View style={[styles.row, styles.spaceBetween, styles.paddingVertical10]}>
                    <Text style={[styles.normal, darkMode ? styles.white : styles.black]}>
                       {type == "past" ? strings[language].myPrograms.programCategory : strings[language].myPrograms.eventCategory}
                    </Text>
                    <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                        {description.programCategory}
                    </Text>
                </View>
                <View style={[{borderBottomWidth:0.5},styles.opacity50perc, darkMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                <View style={[styles.row, styles.spaceBetween, styles.paddingVertical10]}>
                    <Text style={[styles.normal, darkMode ? styles.white : styles.black]}>
                        {type == "past" ? strings[language].myPrograms.mySavings : strings[language].myPrograms.expectedSavings}
                    </Text>
                    <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                        {type == "past" ? description.mySaving : description.expectedSaving}
                    </Text>
                </View>
                <View style={[{borderBottomWidth:0.5},styles.opacity50perc, darkMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                <View style={[styles.row, styles.spaceBetween, styles.paddingVertical10]}>
                    <Text style={[styles.normal, darkMode ? styles.white : styles.black]}>
                        {strings[language].myPrograms.startDate}
                    </Text>
                    <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                        {moment(description.startDate).format('DD-MM-YYYY')}      
                    </Text>
                </View>
                <View style={[{borderBottomWidth:0.5},styles.opacity50perc, darkMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                <View style={[styles.row, styles.spaceBetween, styles.paddingVertical10]}>
                    <Text style={[styles.normal, darkMode ? styles.white : styles.black]}>
                        {strings[language].myPrograms.endDate} 
                    </Text>
                    <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                        {moment(description.endDate).format('DD-MM-YYYY')}
                    </Text>
                </View>
                <View style={[{borderBottomWidth:0.5},styles.opacity50perc, darkMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                <View style={[styles.row, styles.spaceBetween, styles.paddingVertical10]}>
                    <Text style={[styles.normal, darkMode ? styles.white : styles.black]}>
                        {strings[language].myPrograms.duration}
                    </Text>
                    <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                        {description.duration > 1 ? `${description.duration} Days` : `${description.duration} Day` }
                    </Text>
                </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default EpisodeInformationComponent;
