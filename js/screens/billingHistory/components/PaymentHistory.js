import React from 'react';
import { Text, View, Dimensions } from 'react-native';
// Styles and Colors
import { styles } from 'SmartgasConsumerApp/js/styles';
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

class PaymentHistoryComponent extends React.Component{
    render(){

        const {language, darkMode} = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[styles.flexOne, styles.padding, styles.marginVertical10, styles.paddingHorizontal24, this.props.backgroundColor, styles.radius18, styles.marginHorizontal16, styles.elevate3]}>
                <View style={[styles.flexOne, styles.absolute, styles.centerVertical, { right: RFPercentage(2.5)}, styles.elevateOneAndHalf]}>
                    <View style={[styles.absolute, styles.icon30, this.props.icon == 'x' ? { backgroundColor: Colors.mediumGray } : { backgroundColor: Colors.darkGreen }, styles.allCenter]}>
                        <FIcons name={this.props.icon} size={RFPercentage(2.5)} color={Colors.white}/>
                    </View>
                </View>
                <View style={[styles.flexOne, styles.row, styles.paddingVertical6]}>
                    <Text style={[darkMode ? styles.white : styles.black, styles.regular]}>
                        {this.props.date}
                    </Text>
                    <Text style={[darkMode ? styles.white : styles.black, styles.small]}>
                        {`${this.props.dateSuffix} `}
                    </Text>
                    <Text style={[styles.regular, this.props.headerColor]}>
                        {this.props.month} {this.props.year}
                    </Text>
                </View>
                <View style={[styles.flexOne, styles.row,]}>
                    <View style={[styles.flexOne,]}>
                        <View style={[styles.flexOne, styles.row]}>
                            <Text style={[styles.fontSize13, this.props.textColor]}>
                                {strings[language].amount}
                            </Text>
                            <View style={[styles.paddingHorizontal10, styles.opacity80perc]}>
                                <Text style={[styles.selfCenter]}>
                                    <FIcons name={'database'} size={RFPercentage(1.8)} color={this.props.iconColor}/>
                                </Text>
                                <Text style={[styles.absolute,styles.zIndex, { right:RFPercentage(2), top:RFPercentage(0.8) }]}>
                                    <MCIcons name={'currency-usd-circle-outline'} size={RFPercentage(1.8)} color={this.props.iconColor}/>
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.flexOne, styles.row]}>
                            <Text style={[styles.medium22, this.props.fontColor]}>
                                {this.props.amount}
                            </Text>
                            <Text style={[styles.small, styles.right, styles.paddingRegular, this.props.textColor, styles.opacity50perc]}>
                                INR
                            </Text>
                        </View>                                    
                    </View>
                    <View style={[ styles.marginHorizontal16, styles.marginVertical, styles.opacity65perc, { borderLeftWidth: 1, borderColor: this.props.iconColor}]}>

                    </View>
                    <View style={[ styles.flexOne]}>
                        <View style={[ styles.flexOne, styles.row, styles.paddingVertical2]}>
                            <Text style={[this.props.textColor, styles.fontSize13]}>
                                {strings[language].consumption}
                            </Text>
                            <View style={[styles.paddingHorizontal4, styles.opacity80perc]}>
                                <EIcons name={'price-ribbon'} size={RFPercentage(2.3)} color={this.props.iconColor}/>
                            </View>
                        </View>
                        <View style={[styles.flexOne, styles.row]}>
                            <Text style={[styles.medium22, this.props.fontColor]}>
                                {this.props.consumption}
                            </Text>
                            <Text style={[styles.small, styles.right, styles.paddingRegular, this.props.textColor, styles.opacity50perc]}>
                                Units
                            </Text>
                        </View>  
                    </View>
                </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default PaymentHistoryComponent;

