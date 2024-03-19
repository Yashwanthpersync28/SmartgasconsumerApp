import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import * as Progress from 'react-native-progress';
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';

class ConsumptionComparison extends React.Component{
    render(){
        console.log("ConsumptionComparison",this.props)
        const { colorMode }=this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[styles.flexOne, colorMode ? styles.bgLightGray : styles.bgWhite]}>
                <View style={[styles.flexOne, styles.row, styles.spaceBetween]}>
                    <Text style={[ colorMode ? styles.white : styles.black, styles.extraSmall]}>
                        {this.props.title}
                    </Text>
                    <View style={[styles.row, styles.centerVertical]}>
                        <Text style={[colorMode ? styles.white : styles.black, styles.opacity80perc, styles.small]}>
                            {this.props.units < 0 ? "" :this.props.units}
                        </Text>
                        <View style={[styles.centerVertical]}>
                            <Text style={[styles.paddingLeft4, colorMode ? styles.white : styles.black, styles.opacity80perc, styles.extraSmall]}>
                                {this.props.unitName}
                            </Text>
                        </View>
                    </View>              
                </View>
                <View style={[styles.flexOne, styles.row, styles.paddingTop2]}>
                    <View style={[styles.flexThree, styles.centerVertical]}>
                        <Progress.Bar animationType={'timing'} animationConfig={{duration: 2000}}  progress={this.props.units > 0 ? this.props.consumption : 0} width={null} color={Colors.green} height={9} borderRadius={30} borderWidth={0} unfilledColor={colorMode ? Colors.mediumGray : Colors.offWhite} />   
                    </View>                     
                </View>                  
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default ConsumptionComparison;