import React from 'react';
import { View, Dimensions, Pressable, Platform,TouchableOpacity,FlatList,Text } from 'react-native';
import { VictoryBar, VictoryChart, VictoryLabel, VictoryTooltip, VictoryAxis } from "victory-native";
// import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import Svg from 'react-native-svg';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import moment from 'moment'
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';
import { styles } from '../../../styles';
import { chartLabelPosition } from '../../../helpers/common/chartDataHelper';

const {height, width} = Dimensions.get('window');

class VictoryHistoryBarComponent extends React.Component{

    constructor(props){
        super(props)
        this.state={
            // table:null
        };
    }

    render(){
        const {language, darkMode, chart,onPress} = this.props;
        console.log("This propss",this.props);
        return(
            <ErrorBoundaryMainComponent>
            <View style={[styles.flexOne,{top:-RFPercentage(5)}]}>
                {Platform.OS === 'ios' ?
                //ios
                (this.props.table?  
                    //ios table
                        <View style={[styles.flexOne,styles.marginTop48,styles.marginHorizontal20,styles.padding10]}>
                        <View style={[styles.row]}>
                        <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize13,styles.textLeft,{flex:0.3}]}>Sl. No.</Text>
                            {/* <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize11,styles.marginRight32]}>Time</Text> */}
                            <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize13,styles.flexOne,styles.textCenter]}>{this.props.current === "today"? "Hours":this.props.current=== 'week'? "Days": this.props.current === 'month'? "Month": null}</Text>
                            <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize13,styles.flexOne,styles.textCenter]}>Consumption</Text>
                            {/* <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize11]}>Current Week</Text> */}
                        </View>
                        <View style={[{borderBottomWidth: 0.7}, styles.opacity25perc, styles.paddingTop, this.props.darkMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                        <View style={[styles.row,styles.spaceBetween,]}>
                        <FlatList data={this.props?.consumption} renderItem={(item)=><View style={[styles.opacity65perc]}>
                            <View style={[styles.row]}>
                            <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize11,styles.opacity80perc, styles.paddingTop4,styles.textLeft,{flex:0.3}]}>{item.index+1} </Text>
                            <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize11,styles.opacity80perc, styles.paddingTop4,styles.flexOne,styles.textCenter]}>{item.item.x}</Text>
                            <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize11,styles.opacity80perc, styles.paddingTop4,styles.flexOne,styles.textCenter]}>{item.item.y}</Text>
                            </View>
                        <View style={[{borderBottomWidth: 0.7}, styles.opacity25perc, styles.paddingTop4, this.props.darkMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                        </View>}/>
                        </View>
                        </View>   
                    :
                    //ios graph
                    <View style={[{height:height/1.9}]}>

                    {this.props?.consumption.length ? <VictoryChart
                        domainPadding={{x: RFPercentage(5), y: RFPercentage(4)}}
                        height={Dimensions.get("window").height/1.8}
                    >
                        <VictoryAxis 
                            crossAxis
                            tickLabelComponent={<VictoryLabel  style={[{fontSize:10, fill: darkMode ? Colors.white : Colors.black, }]} />}           
                            tickValues={this.props.consumption.map( x =>  x.x)}
                            tickFormat={(x) =>  chart == 'custom' ? moment(x).format('DD/MM') : x }

                        />
                        <VictoryAxis 
                            tickLabelComponent={<VictoryLabel style={[{fontSize:10, fill: darkMode ? Colors.white : Colors.black, }]}   />}
                            dependentAxis   
                            // tickValues={this.props.consumption.map( x =>  x.y == 0 ? 0 : x.y)}
                            tickFormat={(t) => `${(t).toFixed(2)}`}

                            // tickFormat={(x) =>  x == 0 ? 0 : x }

       
                            // tickCount={10}
                        />
                        <VictoryBar

                            labels={["", "", "", "","","",""]}
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
                                                return dataProps.text != '' ? null : { text: dataProps.datum._y.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0], textAnchor: "middle" , dy: RFPercentage(0.8) , dx: -(RFPercentage(2.5)) ,  style: {fill: '#fff',fontSize: RFPercentage(1.8)}}
                                            }
                                        }]
                                    }
                                }
                            }]}
                            data={this.props.consumption}
                            style={{data: { fill: "#64AE64"}}}
                            cornerRadius={{ top: RFPercentage(0.8),  }}
                            barWidth={RFPercentage(2)}
                            animate={{
                                onLoad: { duration: 100, }
                            }}
                        />
                    </VictoryChart> : <View></View>}
                </View>)
                :
                //Android
                    (this.props.table?
                        //android table
                        <View style={[styles.flexOne, styles.marginTop48,styles.marginHorizontal20,styles.padding10]}>
                        <View style={[styles.row]}>
                            {/* <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize11,styles.marginRight32]}>Time</Text> */}
                            <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize13,styles.textLeft,{flex:0.3}]}>Sl. No.</Text>
                            <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize13,styles.flexOne,styles.textCenter]}>{this.props.current === "today"? "Hours":this.props.current=== 'week'? "Days": this.props.current === 'month'? "Month": null}</Text>
                            <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize13,styles.flexOne,styles.textCenter]}>Consumption</Text>
                        </View>
                        <View style={[{borderBottomWidth: 0.7}, styles.opacity25perc, styles.paddingTop, this.props.darkMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                        <View style={[styles.row]}>
                        <FlatList data={this.props.consumption} renderItem={(item)=><View style={[styles.opacity65perc]}>
                            <View style={[styles.row ]}>
                            <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize11,styles.opacity80perc, styles.paddingTop4,styles.textLeft,{flex:0.3}]}>{item.index+1} </Text>
                            <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize11,styles.opacity80perc, styles.paddingTop4,styles.flexOne,styles.textCenter]}>{item.item.x}</Text>
                            <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize11,styles.opacity80perc, styles.paddingTop4,styles.flexOne,styles.textCenter]}>{item.item.y}</Text>
                            </View>
                        <View style={[{borderBottomWidth: 0.7}, styles.opacity25perc, styles.paddingTop4, this.props.darkMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                        </View>}/>
                        </View>
                        </View>   
                    :
                    //android graph
                    <Svg style={[{height:height/1.9}]}>
                        {this.props?.consumption.length ? 
                        <VictoryChart
                            domainPadding={{x: RFPercentage(5), y: RFPercentage(4)}}
                            height={Dimensions.get("window").height/1.8}
                        >
                            <VictoryAxis 
                                crossAxis
                                tickLabelComponent={<VictoryLabel  style={[{fontSize:10, fill: darkMode ? Colors.white : Colors.black, }]} />}           
                                tickValues={this.props.consumption.map( x =>  x.x)}
                                tickFormat={(x) =>  chart == 'custom' ? moment(x).format('DD/MM') : x }
                            />
                            <VictoryAxis 
                                tickLabelComponent={<VictoryLabel style={[{fontSize:10, fill: darkMode ? Colors.white : Colors.green, }]}   />}
                                dependentAxis   
                                // tickValues={this.props.consumption.map( x =>  x.y)}
                                tickFormat={(t) => `${(t).toFixed(2)}`}
                                tickCount={10}
                            />
                            <VictoryBar
                                labels={["", "", "", "","","",""]}
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
                                                    return dataProps.text != '' ? null : 
                                                    {
                                                         text: dataProps.datum._y.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                                                         textAnchor: "middle" , 
                                                         dy: RFPercentage(0.8) , 
                                                         dx: (RFPercentage(chartLabelPosition(dataProps))) ,  
                                                         style: {fill: "#fff",fontSize: RFPercentage(1.8)}
                                                    }
                                                }
                                            }]
                                        }
                                    }
                                }]}
                                data={this.props.consumption}
                                style={{data: { fill: "#64AE64"}}}
                                cornerRadius={{ top: RFPercentage(0.8),  }}
                                barWidth={RFPercentage(2)}
                                animate={{
                                    onLoad: { duration: 100, }
                                }}
                            />
                            

                        </VictoryChart> : <View></View>}
                    </Svg>)
                }
                {
                !this.props.table && 
                <View style={{position:"absolute",zIndex:-1}}> 
                    <Svg style={[{}]}>
                        {
                        this.props?.consumption.length ? 
                        <VictoryBar
                            domainPadding={{x: RFPercentage(5), y: RFPercentage(1)}}
                            // labels={this.props.consumption.map((item)=> item.y ===0 ? 0 : "")}
                            // width={Dimensions.get("window").width/1.05} 
                            height={Dimensions.get("window").height/1.8}
                            // labelComponent={<VictoryLabel angle={270} textAnchor="middle"/>}
                            labelComponent={<VictoryTooltip/>}
                            data={this.props.fixed}
                            style={{data: { fill: darkMode ?  "#3C3C43" : Colors.lightGrey }  }}
                            cornerRadius={{ top: RFPercentage(0.8), }}
                            barWidth={RFPercentage(2)}
                        /> 
                        : 
                        <View></View>
                        }
                    </Svg>
                </View>
                }
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default VictoryHistoryBarComponent;
