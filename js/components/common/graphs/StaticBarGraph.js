import React from 'react';
import {Text, View,Dimensions,Pressable } from 'react-native';
import { VictoryBar,VictoryContainer,VictoryChart,VictoryLabel,VictoryTooltip } from "victory-native";
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import Svg from 'react-native-svg';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

class StaticBarGraphComponent extends React.Component{
    render(){
 
        return(
            <View style={[styles.flexOne, {height:Dimensions.get("window").height/2,borderWidth:1, top:-40}]}>
                <Svg style={[{}]}>
                <VictoryBar
                    width={Dimensions.get("window").width/1.7} // from react-native
                    height={Dimensions.get("window").height/5.7}
                    // height={Dimensions.get("window").height/3.7}
                    // height={RFPercentage(200)/Dimensions.get("window").width}
                    data={this.props.phaseOne}
                    style={{data: { fill: "#64AE64"}}}
                    cornerRadius={{ top: RFPercentage(0.7) }}
                    barWidth={RFPercentage(1.4)}
                    animate={{
                         onLoad: { duration: 100, }
                    }}
                />
                </Svg>

                <View style={{position:"absolute",zIndex:-1}}> 
                <Svg style={[{x:RFPercentage(2.3),y:-RFPercentage(0.7)}]}>
                    <VictoryBar
                        width={Dimensions.get("window").width/1.7} // from react-natives
                        height={Dimensions.get("window").height/5.5}
                        labelComponent={<VictoryTooltip/>}
                        data={this.props.phaseTwo}
                        style={{data: { fill: this.props.colorMode ? Colors.white : Colors.black , opacity:0.50}  }}
                        cornerRadius={{ top: RFPercentage(0.7) }}
                        barWidth={RFPercentage(1.4)}
                    />
                    </Svg>
                </View>
                
            </View>
        );
    }
}

export default StaticBarGraphComponent;
