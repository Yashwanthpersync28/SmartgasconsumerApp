import React from 'react';
import { View, Dimensions, Pressable, Platform } from 'react-native';
import { VictoryBar, VictoryChart, VictoryLabel, VictoryTooltip, VictoryAxis } from "victory-native";
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import Svg from 'react-native-svg';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import moment from 'moment'
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';
import { chartLabelPosition } from '../../../helpers/common/chartDataHelper';

const {height, width} = Dimensions.get('window');

class VictoryHistoryHorizontalBarComponent extends React.Component{
    render(){
        const {language, darkMode, chart} = this.props;

        console.log("aewasdf", this.props);

        return(
            <ErrorBoundaryMainComponent>
            <View style={[styles.flexOne,{top:-RFPercentage(5)},]}>
                {Platform.OS === 'ios' ?
                <View style={[{height:height/1.1}]}>
                    <VictoryChart
                        domainPadding={{x: RFPercentage(9), y: RFPercentage(4)}}
                        height={Dimensions.get("window").width/1.03}
                        width={Dimensions.get("window").height/1.1}
                        >
                        <VictoryAxis 
                                crossAxis
                                tickLabelComponent={<VictoryLabel  style={[{fontSize: 8, fill: darkMode ? Colors.white : Colors.black, }]} />}           
                                tickValues={this.props.consumption.map( x =>  x.x)}
                                tickFormat={(x) =>  chart == 'custom' ? moment(x).format('DD/MM') : `${x.slice(0, -2)}` }
                            />
                            <VictoryAxis 
                                crossAxis
                                tickLabelComponent={<VictoryLabel dy={10} style={[{fontSize: 8, fill: darkMode ? Colors.white : Colors.black,  }]} />}           
                                tickValues={this.props.consumption.map( x =>  x.x)}
                                tickFormat={(x) =>  chart == 'custom' ? moment(x).format('DD/MM') : `${x.slice(-2)}` }
                            />
                            <VictoryAxis 
                                tickLabelComponent={<VictoryLabel style={[{fontSize:10, fill: darkMode ? Colors.white : Colors.green, }]}   />}
                                dependentAxis   
                                // tickValues={this.props.consumption.map( x =>  x.y)}
                                tickFormat={(t) => `${(t).toFixed(2)}`}
                                tickCount={10}
                            />                        
                            <VictoryBar

                            labels={["", "", "", "","","","","", "", "", "","","","","", "", "", "","","","","", "", "", "","","","","", "", "", "","","","","", "", "", "","","","","", "", "", "","","",""]}
                            labelComponent={<VictoryLabel angle={270}/>}
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    onPressOut: () => ({
                                        mutation: () => console.log('out')
                                    }),
                                    onPressIn: () => {
                                        return [{
                                            target: "labels",
                                            mutation: dataProps => {
                                                let index = dataProps.index;
                                                console.log('item selected is',dataProps.index,dataProps)
                                                return dataProps.text != '' ? null : { text: dataProps.datum._y.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0], textAnchor: "middle" , dy: RFPercentage(0.5) , dx: -(RFPercentage(2.5)) ,  style: {fill: '#fff',fontSize: RFPercentage(1.2)}}
                                            }
                                        }]
                                    }
                                }
                            }]}
                            data={this.props.consumption}
                            style={{data: { fill: "#64AE64"}}}
                            cornerRadius={{ top: RFPercentage(0.6),  }}
                            barWidth={RFPercentage(1.4)}
                            animate={{
                                onLoad: { duration: 100, }
                            }}
                        />
                    </VictoryChart>
                </View>
                :
                    <Svg style={[{height:height/1.1}]}>
                        <VictoryChart
                        domainPadding={{x: RFPercentage(9), y: RFPercentage(4)}}
                        height={Dimensions.get("window").width/1.03}
                            width={Dimensions.get("window").height/1.1}
                        >
                            <VictoryAxis 
                                crossAxis
                                tickLabelComponent={<VictoryLabel  style={[{fontSize: 8, fill: darkMode ? Colors.white : Colors.black, }]} />}           
                                tickValues={this.props.consumption.map( x =>  x.x)}
                                tickFormat={(x) =>  chart == 'custom' ? moment(x).format('DD/MM') : `${x}` }
                            />
                            {/* <VictoryAxis 
                                crossAxis
                                tickLabelComponent={<VictoryLabel dy={10} style={[{fontSize: 8, fill: darkMode ? Colors.white : Colors.black,  }]} />}           
                                tickValues={this.props.consumption.map( x =>  x.x)}
                                tickFormat={(x) =>  chart == 'custom' ? moment(x).format('DD/MM') : `${x.slice(-2)}` }
                            /> */}
                            <VictoryAxis 
                                tickLabelComponent={<VictoryLabel style={[{fontSize:10, fill: darkMode ? Colors.white : Colors.green, }]}   />}
                                dependentAxis   
                                // tickValues={this.props.consumption.map( x =>  x.y)}
                                tickFormat={(t) => `${(t).toFixed(2)}`}
                                tickCount={10}
                            />
                            <VictoryBar
                            labels={["", "", "", "","","","","", "", "", "","","","","", "", "", "","","","","", "", "", "","","","","", "", "", "","","","","", "", "", "","","","","", "", "", "","","","",""]}
                            labelComponent={<VictoryLabel angle={270}/>}
                                events={[{
                                    target: "data",
                                    eventHandlers: {
                                        onPressOut: () => ({
                                            mutation: () => console.log('out')
                                        }),
                                        onPressIn: () => {
                                            return [{
                                                target: "labels",
                                                mutation: dataProps => {
                                                    let index = dataProps.index;
                                                    console.log('item selected is',dataProps.index,dataProps)
                                                    return dataProps.text != '' ? null : { text: dataProps.datum._y.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0], textAnchor: "middle" , dy: RFPercentage(0.5) , dx: RFPercentage(chartLabelPosition(dataProps))  ,  style: {fill: '#fff',fontSize: RFPercentage(1.2)}}
                                                }
                                            }]
                                        }
                                    }
                                }]}
                                data={this.props.consumption}
                                style={{data: { fill: "#64AE64"}}}
                                cornerRadius={{ top: RFPercentage(0.6),  }}
                                barWidth={RFPercentage(1.4)}
                                animate={{
                                    onLoad: { duration: 100, }
                                }}
                            />
                        </VictoryChart>
                    </Svg>
                }
                <View style={{position:"absolute",zIndex:-1}}> 
                    <Svg style={[{}]}>
                        <VictoryBar
                        domainPadding={{x: RFPercentage(9), y: RFPercentage(4)}}
                        // width={Dimensions.get("window").width/1.05} 
                            height={Dimensions.get("window").width/1.03}
                            width={Dimensions.get("window").height/1.1}
                            labelComponent={<VictoryTooltip/>}
                            data={this.props.fixed}
                            style={{data: { fill: darkMode ?  "#3C3C43" : Colors.lightGrey }  }}
                            cornerRadius={{ top: RFPercentage(0.6),  }}
                            barWidth={RFPercentage(1.4)}
                        />
                    </Svg>
                </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default VictoryHistoryHorizontalBarComponent;
