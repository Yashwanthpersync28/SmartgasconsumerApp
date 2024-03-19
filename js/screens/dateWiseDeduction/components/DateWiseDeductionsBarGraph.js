import React from 'react';
import {Text, View, Dimensions, Platform, FlatList } from 'react-native';
import { VictoryBar, VictoryChart,VictoryLabel,VictoryTooltip, VictoryAxis } from "victory-native";
import { styles } from '../../../styles';
import Colors from '../../../styles/Colors';
import Svg from 'react-native-svg';
import { RFPercentage } from "react-native-responsive-fontsize";
import { chartLabelPosition } from '../../../helpers/common/chartDataHelper';
import { useSelector } from 'react-redux';

const {height, width} = Dimensions.get('window');

export const DWDBarGraph = ({ consumption, fixed, reset }) => {

    const darkMode = useSelector((state) => state.darkMode )

    const MainView = Platform.OS == "android" ? Svg : View

    return(
        <View style={[styles.flexOne, {}]}>
            <MainView style={[{}]}>
                <VictoryChart
                    width={consumption.length < 8 ? width/1.4 : width*consumption.length*0.1} 
                    height={height/2.4}
                    padding={{top: 10, left: 40, right: 40, bottom: 95}}
                >
                    <VictoryBar 
                        externalEventMutations={reset}
                        labels={["", "", "", "","","","",'', "", "", "", "","","","",'',"", "", "", "","","","",'',"", "", "", "","","","",'',"", "", "", "","","","",'',"", "", "", "","","","",'']}
                        labelComponent={<VictoryLabel angle={270}/>}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPressIn:  () => {
                                    return [{
                                        target: "labels",
                                        mutation:  dataProps  => {
                                            return dataProps.text != '' ?
                                            null :   { text: dataProps.datum._y.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0], textAnchor: "middle" , dy: RFPercentage(0.7) , dx: RFPercentage(chartLabelPosition(dataProps)) ,  style: {fill: '#fff',fontSize: RFPercentage(1.5),},}
                                        }
                                    }]
                                }
                            }
                        }]}
                        data={consumption}
                        style={{data: { fill: Colors.green, elevation: 5}}}
                        cornerRadius={{ top: Math.round(width/45), bottom: Math.round(width/45)}}
                        barWidth={Math.round(width/24)}
                        animate={{onLoad: { duration: 100}}}
                    />
                    <VictoryAxis 
                        crossAxis
                        tickLabelComponent={<VictoryLabel  style={[{fontSize:9, fill: darkMode ? Colors.white : Colors.black, }]} />}           
                        tickValues={consumption.map( x =>  x.x)}
                        tickFormat={(x) =>  x.slice(0, 5)}
                        // tickFormat={(x) => x }
                        style={{
                            axis: {stroke: "none"},
                        }}
                    />
                </VictoryChart>
            </MainView>
            {/* Background Bars */}
            <View style={{position:"absolute",zIndex:-1}}> 
                <Svg style={[]}>
                    <VictoryBar
                    width={consumption.length < 8 ? width/1.4 : width*consumption.length*0.1} 
                    height={height/2.4}
                        padding={{top: 10, left: 40, right: 40, bottom: 95}}
                        labelComponent={<VictoryTooltip/>}
                        data={fixed}
                        style={{data: { fill: darkMode ? Colors.mediumGray : Colors.lightGrey}  }}
                        cornerRadius={{ top: Math.round(width/50), bottom: Math.round(width/50) }}
                        barWidth={Math.round(width/28)}
                    />
                </Svg>
            </View>
        </View>
    );
}


