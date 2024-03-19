import React from 'react';
import { Text, View, Dimensions} from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import * as Progress from 'react-native-progress';
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


class MonthlyComparison extends React.Component{
    render(){

        const { colorMode }=this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[styles.flexOne, colorMode ? styles.bgLightGray : styles.bgWhite]}>
                <View style={[styles.flexOne, styles.row, styles.spaceBetween]}>
                    <Text style={[colorMode ? styles.white : styles.black, styles.opacity80perc, styles.small]}>
                        {this.props.title}
                    </Text>
                    <View style={[ styles.paddingLeft10, styles.row]}>
                        <Text style={[ this.props.fontColor, styles.opacity80perc, styles.small,]}>
                            {this.props.units}
                        </Text>
                        <Text style={[ styles.paddingLeft4, this.props.fontColor, styles.opacity80perc, styles.extraSmall, styles.selfCenter]}>
                            {this.props.unitName}
                        </Text>
                    </View>
                </View>
                <View style={[styles.centerVertical, styles.paddingVertical4]}>
                    <Progress.Bar  animationType={'timing'} animationConfig={{duration: 2000}} progress={this.props.consumption} width={null} color={Colors.green} height={11} style={[{borderRadius: 50}]} borderRadius={30} borderWidth={0} unfilledColor={colorMode ? Colors.mediumGray : Colors.offWhite} />
                </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default MonthlyComparison;