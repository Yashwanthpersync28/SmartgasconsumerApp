import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import * as Progress from 'react-native-progress';
import { RFPercentage } from "react-native-responsive-fontsize";
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';

class DashboardConsumption extends React.Component{
    render(){
        const { colorMode }=this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[,styles.flexOne,styles.marginHorizontal, styles.marginVertical2, colorMode ? styles.bgLightGray : styles.bgWhite, styles.padding10, styles.paddingHorizontal20, styles.radius16, styles.elevate2]}>
                <View style={[styles.row,styles.spaceBetween,styles.flexOne]}>
                    <View>
                        <Text style={[styles.flexOne, colorMode ? styles.white : styles.black ,styles.opacity80perc, styles.normal]}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={[colorMode ? styles.white : styles.black, styles.opacity80perc, styles.normal]}>
                            {this.props.value == "-1" ? "0" : this.props.value}
                        </Text>
                        <Text style={[colorMode ? styles.white : styles.black, styles.opacity80perc, styles.normal]}>
                            {` ${this.props.unit}`}
                        </Text>
                    </View>    
                </View>
                <View style={[styles.flexOne, styles.centerVertical, styles.marginTop10]}>
                    <Progress.Bar progress={this.props?.value > 0 ? this.props?.consumptionPercent : 0} width={null} color={Colors.green} height={RFPercentage(2)} borderRadius={30} borderWidth={0} unfilledColor={colorMode ? Colors.mediumGray : Colors.lightGrey} />
                </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default DashboardConsumption;