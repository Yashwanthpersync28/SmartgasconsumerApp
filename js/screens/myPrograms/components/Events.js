import React from 'react';
import { Text, View } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
// Icons
import FIcons from 'react-native-vector-icons/Feather';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Library
import moment from "moment"
// Language
import {strings} from "SmartgasConsumerApp/js/strings";
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';


class EventsComponent extends React.Component{
    render(){
        const {language, darkMode, eventName, savings, date} = this.props;

        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.padding20, styles.marginHorizontal10, styles.marginVertical, styles.paddingHorizontal30]}>
                <View style={[styles.row]}>
                    <Text style={[styles.regularPlus, darkMode ? styles.white : styles.black]}>
                        {eventName.split(' ').slice(0,1).join(' ')}
                    </Text>
                    <Text style={[styles.regularPlus, styles.green]}>
                        {` ${eventName.split(' ').slice(1).join(' ')}`}
                    </Text>
                </View>
                <View style={[styles.row, styles.flexOne, styles.paddingTop]}>
                    <View style={[styles.flexOne]}>
                        <View style={[styles.row, styles.paddingVertical2]}>
                            <Text style={[darkMode ? styles.white : styles.black]}>
                                {strings[language].myPrograms.date}
                            </Text>
                            <View style={[styles.paddingHorizontal4]}>
                                <FIcons name={'award'} size={14} color={Colors.green}/>
                            </View>
                            
                        </View>
                        <Text style={[styles.green]}>
                            {moment(date).format('DD-MM-YYYY')}
                        </Text>
                    </View>
                    <View style={[{borderLeftWidth: 1},darkMode ? { borderColor: Colors.white } : { borderColor: Colors.black } ,styles.marginHorizontal16, styles.opacity50perc]}/>
                    <View style={[styles.flexOne]}>
                        <View style={[styles.row, styles.paddingVertical2]}>
                            <Text style={[darkMode ? styles.white : styles.black]}>
                                {strings[language].myPrograms.savings}
                            </Text>
                            <View style={[styles.paddingHorizontal4]}>
                                <MCIcons name={'database'} size={16} color={Colors.green}/>
                            </View>
                        </View>
                        <View style={[styles.row]}>
                            <Text style={[styles.green]}>
                                {savings}
                            </Text>
                            <Text style={[darkMode ? styles.white : styles.black, styles.paddingHorizontal4, styles.opacity65perc]}>
                                INR
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.absolute,{right:-5, bottom:-5},styles.icon24, styles.bgDarkGreen, styles.allCenter]}>
                    <Text style={[styles.white, styles.normal]}>
                        {' >'}
                    </Text>
                </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default EventsComponent;
