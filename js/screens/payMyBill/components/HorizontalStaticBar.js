import React from 'react';
import { View, Dimensions } from 'react-native';
import { VictoryBar, VictoryTooltip } from "victory-native";
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import Svg from 'react-native-svg';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';

class HorizontalStaticBarComponent extends React.Component{
    render(){
 
        return(
            <ErrorBoundaryMainComponent>
            <View style={[{marginTop:-RFPercentage(6), left: -RFPercentage(1)}]}>
                <Svg style={[{}]}>
                    <VictoryBar
                        width={Dimensions.get("window").width/2.4} 
                        height={Dimensions.get("window").height/5.7}
                        data={this.props.phaseOne}
                        style={{data: { fill: "#64AE64"}}}
                        cornerRadius={{ top: RFPercentage(0.7) }}
                        barWidth={RFPercentage(1.4)}
                        animate={{
                            onLoad: { duration: 100, }
                        }}
                    />
                </Svg>
                <View style={{ position:"absolute", zIndex:-1 }}> 
                    <Svg style={[{ x:RFPercentage(2.3), y:-RFPercentage(0.7) }]}>
                        <VictoryBar
                            width={Dimensions.get("window").width/2.4} 
                            height={Dimensions.get("window").height/5.5}
                            labelComponent={<VictoryTooltip/>}
                            data={this.props.phaseTwo}
                            style={{data: { fill: this.props.colorMode ? Colors.white : Colors.black , opacity:0.50 }}}
                            cornerRadius={{ top: RFPercentage(0.7) }}
                            barWidth={RFPercentage(1.4)}
                        />
                    </Svg>
                </View> 
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default HorizontalStaticBarComponent;
