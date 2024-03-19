import React from 'react';
import { View, Dimensions, Platform, Text} from 'react-native';
import { VictoryBar, VictoryGroup, VictoryLabel, VictoryTooltip, VictoryChart, VictoryAxis } from "victory-native";
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import Svg from 'react-native-svg';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { strings } from "SmartgasConsumerApp/js/strings";
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';
import { chartLabelPosition } from '../../../helpers/common/chartDataHelper';

const { height, width } = Dimensions.get("window")

class VictoryMultipleBarComponent extends React.Component{
    render(){
        console.log("VictoryMultipleBarComponent",this.props?.consumption)
        return(
            <ErrorBoundaryMainComponent>
            <View style={[styles.flexOne, {height:height/2.7}]}>
                { Platform.OS === 'ios' ? 
                    <View style={[]}>
                        {this.props?.consumption.length ? <VictoryChart
                            width={width/1.0} // from react-native
                            height={height/2.7}
                            padding={{top: height/60, left: width/14 + 20, right: width/14 + 20, bottom: height/40}}
                            >
                            <VictoryGroup offset={RFPercentage(1.6)}
                                domainPadding={{x:-RFPercentage(0)}}
                                width={width/1.2} // from react-native
                                height={height/3 + 20}
                            >
                                <VictoryBar
                                    labels={["", "", "", "","","","",'']}
                                    labelComponent={<VictoryLabel angle={270}   />}
                                    events={[{
                                        target: "data",
                                        eventHandlers: {
                                            onPressOut: () => ({mutation: () => console.log('out1')}),
                                            onPressIn: () => {
                                                console.log('outIN')
                                                return [{
                                                    target: "labels",
                                                    mutation: dataProps => {
                                                        return dataProps.text != '' ?
                                                        null : {
                                                            text: dataProps.datum.y,
                                                            textAnchor: "middle",
                                                            dy: RFPercentage(0.6),
                                                            dx: (RFPercentage(chartLabelPosition(dataProps))),
                                                            style: {fill: '#fff', fontSize: RFPercentage(1.3)}
                                                        }
                                                    }
                                                }]
                                            }
                                        }
                                    }]}
                                    data={this.props.consumption}
                                    style={{data: { fill: "gray"}}}
                                    cornerRadius={{ top: RFPercentage(0.5), bottom:RFPercentage(0.5) }}
                                    barWidth={RFPercentage(1.1)}
                                    animate={{
                                        onLoad: { duration: 100, }
                                    }}
                                />
                                <VictoryBar
                                    width={width/1.2} // from react-native
                                    height={height/3 + 20}
                                    labels={["", "", "", "","","","",'']}
                                    labelComponent={<VictoryLabel angle={270}   />}
                                    events={[{
                                        target: "data",
                                        eventHandlers: {
                                            onPressOut: () => ({  mutation: () => console.log('out')}),
                                            onPressIn: () => {
                                                return [{
                                                    target: "labels",
                                                    mutation: dataProps => {
                                                        let index = dataProps.index;
                                                        console.log('item selected is',dataProps.index,dataProps)
                                                        return dataProps.text != '' ?
                                                        null : {
                                                            text: dataProps.datum.y,
                                                            textAnchor: "middle",
                                                            dy: RFPercentage(0.6),
                                                            dx: (RFPercentage(chartLabelPosition(dataProps))),
                                                            style: {fill: '#fff',fontSize: RFPercentage(1.3)}
                                                        }
                                                    }
                                                }]
                                            }
                                        }
                                    }]}
                                    data={this.props.curr}
                                    style={{data: { fill: "#64AE64"}}}
                                    cornerRadius={{ top: RFPercentage(0.5), bottom:RFPercentage(0.5) }}
                                    barWidth={RFPercentage(1.1)}
                                    animate={{onLoad: { duration: 100, }}}
                                />
                            </VictoryGroup>
                            <VictoryAxis style={{ 
                                axis: {stroke: "transparent"}, 
                                ticks: {stroke: "transparent"},
                                tickLabels: { fill:"transparent"} 
                            }} />
                            <VictoryAxis 
                                tickLabelComponent={<VictoryLabel verticalAnchor="middle"
                                style={[{fontSize: RFPercentage(1.6), fill: this.props.darkMode ? Colors.white : Colors.black}]} />}           
                                tickValues={this.props.consumption.map( x =>  x.x)}
                                tickFormat={(x) => x }
                                style={{axis: {stroke: "none"},}}
                            />
                            <VictoryAxis 
                                dependentAxis
                                tickLabelComponent={<VictoryLabel dx={10} style={[{fontSize:10, fill: this.props.darkMode ? Colors.white : Colors.black, }]} />}           
                                style={{ axis: {stroke: "none"} }}
                            />
                        </VictoryChart>: <View></View>}
                        {/* <View style={[ styles.paddingVertical2, styles.allCenter, styles.paddingBottom]}>
                            <Text style={[this.props.darkMode ? styles.white : styles.black, styles.extraSmall, styles.selfCenter]}>
                                {strings[this.props.language].comparison.graphButton}
                            </Text>
                        </View> */}
                    </View>
                :
                    <Svg style={[]}>

                        {this.props?.consumption.length ? <VictoryChart
                            padding={{top: height/60, left: width/14 + 25, right: width/14 + 20, bottom: height/40}}
                            width={width/1.0} // from react-native
                            height={height/2.7}
                            // domainPadding={{x: RFPercentage(2), y: RFPercentage(4)}}

                        >
                            <VictoryGroup offset={RFPercentage(1.8)}
                                domainPadding={{x:-RFPercentage(0)}}
                                width={width/1.2} // from react-native
                                height={height/3 + 20}
                            >
                                <VictoryBar
                                    labels={["", "", "", "","","","",'']}
                                    labelComponent={<VictoryLabel angle={270}   />}
                                    events={[{
                                        target: "data",
                                        eventHandlers: {
                                            onPressOut: () => ({mutation: () => console.log('out')}),
                                            onPressIn: () => {
                                                return [{
                                                    target: "labels",
                                                    mutation: dataProps => {
                                                        return dataProps.text != '' ?
                                                        null : {
                                                            text: dataProps.datum.y.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                                            textAnchor: "middle",
                                                            dy: RFPercentage(0.6),
                                                            dx: (RFPercentage(chartLabelPosition(dataProps))),
                                                            style: {fill: '#fff', fontSize: RFPercentage(1.3)}
                                                        }
                                                    }
                                                }]
                                            }
                                        }
                                    }]}
                                    data={this.props.consumption}
                                    style={{data: { fill: "gray"}}}
                                    cornerRadius={{ top: RFPercentage(0.5), bottom:RFPercentage(0.5) }}
                                    barWidth={RFPercentage(1.4)}
                                    animate={{
                                        onLoad: { duration: 100, }
                                    }}
                                />
                                <VictoryBar
                                    width={width/1.2} // from react-native
                                    height={height/3 + 20}
                                    labels={["", "", "", "","","","",'']}
                                    labelComponent={<VictoryLabel angle={270}   />}
                                    events={[{
                                        target: "data",
                                        eventHandlers: {
                                            onPressOut: () => ({  mutation: () => console.log('out')}),
                                            onPressIn: () => {
                                                return [{
                                                    target: "labels",
                                                    mutation: dataProps => {
                                                        let index = dataProps.index;
                                                        console.log('item selected is',dataProps.index,dataProps)
                                                        return dataProps.text != '' ?
                                                        null : {
                                                            text: dataProps.datum.y.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                                            textAnchor: "middle",
                                                            dy: RFPercentage(0.6),
                                                            dx: (RFPercentage(chartLabelPosition(dataProps))),
                                                            style: {fill: '#fff',fontSize: RFPercentage(1.3)}
                                                        }
                                                    }
                                                }]
                                            }
                                        }
                                    }]}
                                    data={this.props.curr}
                                    style={{data: { fill: "#64AE64"}}}
                                    cornerRadius={{ top: RFPercentage(0.5), bottom:RFPercentage(0.5) }}
                                    barWidth={RFPercentage(1.4)}
                                    animate={{onLoad: { duration: 100, }}}
                                />
                            </VictoryGroup>
                            <VictoryAxis style={{ 
                                axis: {stroke: "transparent"}, 
                                ticks: {stroke: "transparent"},
                                tickLabels: { fill:"transparent"} 
                            }} />
                            <VictoryAxis 
                                tickLabelComponent={<VictoryLabel verticalAnchor="middle"
                                style={[{fontSize: RFPercentage(1.6), fill: this.props.darkMode ? Colors.white : Colors.black}]} />}           
                                tickValues={this.props.consumption.map( x =>  x.x)}
                                tickFormat={(x) => x }
                                style={{axis: {stroke: "none"},}}
                            />
                            <VictoryAxis 
                                dependentAxis
                                tickLabelComponent={<VictoryLabel dx={10} style={[{fontSize:10, fill: this.props.darkMode ? Colors.white : Colors.black, }]} />}           
                                style={{ axis: {stroke: "none"} }}
                            />
                        </VictoryChart>:<View></View>}
                        {/* <View style={[ styles.paddingVertical2, styles.allCenter, styles.paddingBottom]}>
                            <Text style={[this.props.darkMode ? styles.white : styles.black, styles.extraSmall, styles.selfCenter]}>
                                {strings[this.props.language].comparison.graphButton}
                            </Text>
                        </View> */}
                    </Svg>
                    }   
                    <View style={{position:"absolute",zIndex:-1}}> 
                        <Svg style={[{}]}>
                            {this.props?.consumption.length ? <VictoryChart
                                padding={{top: height/60, left: width/14 + 25, right: width/14 + 20, bottom: height/40}}
                                width={width/1.0} // from react-native
                                height={height/2.7}
                            >
                                <VictoryGroup offset={RFPercentage(1.8)}
                                    domainPadding={{x:-RFPercentage(0)}}
                                    width={width/1.2} // from react-native
                                    height={height/3 + 20}
                                >   
                                    <VictoryBar
                                        labelComponent={<VictoryTooltip/>}
                                        data={this.props.lastFixed}
                                        style={{data: { fill: this.props.darkMode ? "#3C3C43" : Colors.lightGrey}  }}
                                        cornerRadius={{ top: RFPercentage(0.5), bottom:RFPercentage(0.5) }}
                                        barWidth={RFPercentage(1.4)}
                                    />
                                    <VictoryBar
                                        // width={width/1.2} // from react-natives
                                        // height={height/2.7}
                                        labelComponent={<VictoryTooltip/>}
                                        data={this.props.currentFixed}
                                        style={{data: { fill: this.props.darkMode ? "#3C3C43" : Colors.lightGrey}  }}
                                        cornerRadius={{ top: RFPercentage(0.5), bottom:RFPercentage(0.5) }}
                                        barWidth={RFPercentage(1.4)}
                                    />
                                </VictoryGroup>
                                <VictoryAxis style={{ 
                                    axis: {stroke: "transparent"}, 
                                    ticks: {stroke: "transparent"},
                                    tickLabels: { fill:"transparent"} 
                                }} />
                            </VictoryChart>:<View></View>}
                        </Svg>
                    </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default VictoryMultipleBarComponent;
