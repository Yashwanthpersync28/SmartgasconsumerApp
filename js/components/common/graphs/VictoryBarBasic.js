import React from 'react';
import {Text, View,Dimensions,Platform } from 'react-native';
import { VictoryBar,VictoryContainer,VictoryChart,VictoryLabel,VictoryTooltip, VictoryAxis } from "victory-native";
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import Svg from 'react-native-svg';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const {height, width} = Dimensions.get('window');

class VictoryBarBasicComponent extends React.Component{
    render(){
        return(
            <View style={[styles.flexOne, {top:-height/20,}]}>
                { Platform.OS === 'ios' ? 
                <View style={[{height:height/2.3}]}>
                    <VictoryChart
                       width={Dimensions.get("window").width/1.15} 
                       height={Dimensions.get("window").height/2.3}
                    >
                        <VictoryBar 
                            labels={["", "", "", "","","","",'']}
                            labelComponent={<VictoryLabel angle={270}/>}
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    
                                    onPressOut: () => ({
                                    }),
                                    onPressIn:  () => {
                                        return [{
                                            target: "labels",
                                            mutation:  dataProps  => {
                                                console.log("Data Props",dataProps);
                                                var max = Math.max.apply(Math, dataProps.data.map(function(o) { return o.y; }))
                                                // if(max/dataProps.datum._y > 5){
                                                if(false){
                                                    let index = dataProps.index;
                                                    return dataProps.text != ''
                                                }
                                                else{
                                                    return dataProps.text != '' ?
                                                    null :   { text: dataProps.datum._y.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0], textAnchor: "middle" , dy: RFPercentage(0.8) , dx: -(RFPercentage(2.5)) ,  style: {fill: '#fff',fontSize: RFPercentage(1.8),},}
    
                                                }
                                            }
                                        }]
                                    }
                                }
                            }]}
                            data={this.props.consumption}
                            style={{data: { fill: "#64AE64", elevation: 5}}}
                            cornerRadius={{ top: Math.round(width/45), bottom: Math.round(width/45)}}
                            barWidth={Math.round(width/24)}
                            animate={{
                                onLoad: { duration: 100}
                            }}
                        >
                        </VictoryBar>
                        <VictoryAxis 
                            crossAxis
                            tickLabelComponent={<VictoryLabel  style={[{fontSize:10, fill: this.props.darkMode ? Colors.white : Colors.black, }]} />}           
                            tickValues={this.props.consumption.map( x =>  x.x)}
                            tickFormat={(x) => x }
                            style={{
                                axis: {stroke: "none"},
                            }}
                        />
                    </VictoryChart>
                </View>
                : 
                <Svg style={[{height:height/2.3}]}>
                    <VictoryChart
                       width={Dimensions.get("window").width/1.15} 
                       height={Dimensions.get("window").height/2.3}
                    >
                        <VictoryBar   
                            labels={["", "", "", "","","","",'']}
                            labelComponent={<VictoryLabel angle={270}/>}
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    onPressOut: () => ({
                                    }),
                                    onPressIn:  () => {
                                        return [{
                                            target: "labels",
                                            mutation:  dataProps  => {
                                                
                                                console.log("Data Props",dataProps);
                                                var max = Math.max.apply(Math, dataProps.data.map(function(o) { return o.y; }))
                                                // if(max/dataProps.datum._y > 5){
                                                if(false){
                                                    let index = dataProps.index;
                                                    return dataProps.text != ''
                                                }
                                                else{
                                                    return dataProps.text != '' ?
                                                    null :   { text: dataProps.datum._y.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0], textAnchor: "middle" , dy: RFPercentage(0.8) , dx: -(RFPercentage(2.5)) ,  style: {fill: '#fff',fontSize: RFPercentage(1.8)}, }
    
                                                }
                                            }
                                        }]
                                    }
                                }
                            }]}
                            data={this.props.consumption}
                            style={{data: { fill: "#64AE64", elevation: 5}}}
                            cornerRadius={{ top: Math.round(width/45), bottom: Math.round(width/45)}}
                            barWidth={Math.round(width/24)}
                            animate={{
                                onLoad: { duration: 100}
                            }}
                        >
                        
                        </VictoryBar>
                        <VictoryAxis 
                            crossAxis
                            tickLabelComponent={<VictoryLabel  style={[{fontSize:10, fill: this.props.darkMode ? Colors.white : Colors.black, }]} />}           
                            tickValues={this.props.consumption.map( x =>  x.x)}
                            tickFormat={(x) => x }
                            style={{
                                axis: {stroke: "none"}, overflow: "hidden"
                            }}
                        />
                    </VictoryChart>
                </Svg>}

                <View style={{position:"absolute",zIndex:-1}}> 
                    <Svg style={[]}>
                        <VictoryBar
                            width={Dimensions.get("window").width/1.15} // from react-natives
                            height={Dimensions.get("window").height/2.3}
                            labelComponent={<VictoryTooltip/>}
                            data={this.props.fixed}
                            style={{data: { fill: this.props.darkMode ? "#3C3C43" : Colors.lightGrey}  }}
                            cornerRadius={{ top: Math.round(width/50), bottom: Math.round(width/50) }}
                            barWidth={Math.round(width/28)}
                        />
                    </Svg>
                </View>
            </View>
        );
    }
}

export default VictoryBarBasicComponent;
