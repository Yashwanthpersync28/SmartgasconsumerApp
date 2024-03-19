import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, Platform, AppState, FlatList } from 'react-native';
import { VictoryBar, VictoryChart, VictoryLabel, VictoryTooltip, VictoryAxis } from "victory-native";
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import { RFPercentage } from "react-native-responsive-fontsize";
import { chartLabelPosition } from '../../../helpers/common/chartDataHelper';
import { useSelector } from 'react-redux';


const { height, width } = Dimensions.get('window');

export const VictoryBarComponent = ({ consumption, fixed, table, current }) => {

    // Selectors
    const darkMode = useSelector(state => state.darkMode)

    return (
        <View style={[styles.flexOne, { top: -height / 20, }]}>
            {table ?
                //table ios
                <View style={[styles.flexOne, styles.marginTop48, styles.marginHorizontal20, styles.padding10]}>
                    <View style={[styles.row,]}>
                        <Text style={[darkMode ? styles.white : styles.black, styles.fontSize13, styles.textLeft, { flex: 0.2 }]}>Sl. No.</Text>
                        <Text style={[darkMode ? styles.white : styles.black, styles.fontSize13, styles.flexOne, styles.textCenter]}>{current === "today" ? "Time" : current === 'week' ? "Days" : current === 'month' ? "Month" : null}</Text>
                        <Text style={[darkMode ? styles.white : styles.black, styles.fontSize13, styles.flexOne, styles.textCenter]}>Consumption</Text>
                        {/* <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize11]}>Current Week</Text> */}
                    </View>
                    <View style={[{ borderBottomWidth: 0.7 }, styles.opacity25perc, styles.paddingTop, darkMode ? { borderColor: Colors.white } : { borderColor: Colors.black }]} />
                    <View style={[styles.row, styles.spaceBetween,]}>
                        <FlatList data={consumption.length && consumption} renderItem={(item) => <View style={[styles.opacity65perc]}>
                            <View style={[styles.row,]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.fontSize11, styles.opacity80perc, styles.paddingTop4, styles.textLeft, { flex: 0.2 }]}>{item.index + 1} </Text>
                                <Text style={[darkMode ? styles.white : styles.black, styles.fontSize11, styles.opacity80perc, styles.paddingTop4, styles.flexOne, styles.textCenter]}>{item.item.x}</Text>
                                <Text style={[darkMode ? styles.white : styles.black, styles.fontSize11, styles.opacity80perc, styles.paddingTop4, styles.flexOne, styles.textCenter]}>{item.item.y}</Text>
                            </View>
                            <View style={[{ borderBottomWidth: 0.7 }, styles.opacity25perc, styles.paddingTop4, darkMode ? { borderColor: Colors.white } : { borderColor: Colors.black }]} />
                        </View>} />
                    </View>
                </View>
                :
                <View>
                    <VictoryChart
                        width={Dimensions.get("window").width / 1.15}
                        height={Dimensions.get("window").height / 2.3}
                    >
                        <VictoryBar
                            labels={["", "", "", "", "", "", "", '']}
                            labelComponent={<VictoryLabel angle={270} />}
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    onPressOut: () => ({
                                    }),
                                    onPressIn: () => {
                                        return [{
                                            target: "labels",
                                            mutation: dataProps => {
                                                return dataProps.text != '' ?
                                                    null : { text: dataProps.datum._y.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0], textAnchor: "middle", dy: RFPercentage(0.8), dx: RFPercentage(chartLabelPosition(dataProps)), style: { fill: '#fff', fontSize: RFPercentage(1.8), }, }

                                                // }
                                            }
                                        }]
                                    }
                                }
                            }]}
                            data={consumption}
                            style={{ data: { fill: "#64AE64", elevation: 5 } }}
                            cornerRadius={{ top: Math.round(width / 45), bottom: Math.round(width / 45) }}
                            barWidth={Math.round(width / 24)}
                            animate={{
                                onLoad: { duration: 100 }
                            }}
                        >
                        </VictoryBar>
                        <VictoryAxis
                            crossAxis
                            tickLabelComponent={<VictoryLabel style={[{ fontSize: 10, fill: darkMode ? Colors.white : Colors.black, }]} />}
                            tickValues={consumption.map(x => x.x)}
                            tickFormat={(x) => x}
                            style={{
                                axis: { stroke: "none" },
                            }}
                        />
                    </VictoryChart>
                    <View style={{ position: "absolute", zIndex: -1 }}>
                        <VictoryBar
                            width={Dimensions.get("window").width / 1.15} // from react-natives
                            height={Dimensions.get("window").height / 2.3}
                            labelComponent={<VictoryTooltip />}
                            data={fixed}
                            style={{ data: { fill: darkMode ? "#3C3C43" : Colors.lightGrey } }}
                            cornerRadius={{ top: Math.round(width / 50), bottom: Math.round(width / 50) }}
                            barWidth={Math.round(width / 28)}
                        />
                    </View>
                </View>
            }
        </View>
    );
}


