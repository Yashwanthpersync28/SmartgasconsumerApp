import React from 'react';
import { Text, View, Dimensions } from 'react-native';
// Styles and Colors
import { styles } from '../../../styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Icons
import FIcons from 'react-native-vector-icons/Feather';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EIcons from 'react-native-vector-icons/Entypo';
// Library
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// Backend
import {strings} from "SmartgasConsumerApp/js/strings";
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';

class PrepaidHistoryComponent extends React.Component{
    render(){
        const {language, darkMode, amount, date} = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[styles.flexOne, styles.padding20, styles.marginTop24, styles.paddingBottom2, styles.paddingHorizontal24, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius20, styles.marginHorizontal16, styles.elevate3]}>
                <View style={[styles.flexOne, styles.absolute, styles.centerVertical, { right: 15}, styles.elevateOneAndHalf, styles.elevate3]}>
                    <View style={[styles.absolute, styles.icon28, this.props.icon == 'x' ? { backgroundColor: Colors.mediumGray } : { backgroundColor: Colors.darkGreen }, styles.allCenter]}>
                        <FIcons name={'check'} size={18} color={Colors.white}/>
                    </View>
                </View>
                <View style={[styles.flexOne, styles.row]}>
                    <View style={[styles.flexOne,]}>
                        <View style={[styles.flexOne, styles.row]}>
                            <Text style={[styles.fontSize13, darkMode ? styles.white : styles.black]}>
                                Date                         
                            </Text>
                            <View style={[styles.paddingHorizontal4, styles.opacity80perc]}>
                                <FIcons name={'award'} size={RFPercentage(2.3)} color={Colors.green}/>
                            </View>
                        </View>
                        <View style={[styles.flexOne]}>
                            <Text style={[styles.regularPlus, styles.darkGreen]}>
                                {date}                            
                            </Text>
                          
                        </View>                                    
                    </View>
                    <View style={[ styles.marginHorizontal16, styles.marginVertical, styles.opacity25perc, { borderLeftWidth: 1, borderColor: Colors.white}]}>

                    </View>
                    <View style={[ styles.flexOne]}>
                        <View style={[ styles.flexOne, styles.row, styles.paddingVertical2]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.fontSize13]}>
                                Amount
                            </Text>
                            <View style={[styles.paddingHorizontal10, styles.opacity80perc]}>
                                <Text style={[styles.selfCenter]}>
                                    <FIcons name={'database'} size={RFPercentage(1.8)} color={Colors.green}/>
                                </Text>
                                <Text style={[styles.absolute,styles.zIndex, { right:RFPercentage(2), top:RFPercentage(0.8) }]}>
                                    <MCIcons name={'currency-usd-circle-outline'} size={RFPercentage(1.8)} color={Colors.green}/>
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.flexOne, styles.row, styles.flexEndHorizontal]}>
                            <Text style={[styles.regularPlus, styles.darkGreen]}>
                                {amount}   
                            </Text>
                            <Text style={[styles.small, styles.right, styles.paddingHorizontal, styles.padding2, darkMode ? styles.white : styles.black, styles.opacity50perc]}>
                                INR
                            </Text>
                        </View>  
                    </View>
                </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default PrepaidHistoryComponent;

