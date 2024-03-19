import React from 'react';
import { Text, View, Dimensions, Platform, Pressable,TouchableOpacity,FlatList } from 'react-native';
import { VictoryBar, VictoryAxis, VictoryLegend, VictoryChart, VictoryLabel, VictoryTooltip, VictoryTheme } from "victory-native";
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import Svg from 'react-native-svg';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import OIcons from 'react-native-vector-icons/Octicons';
import {strings} from "SmartgasConsumerApp/js/strings";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';

class MaximumDemandBarComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state={
        //    table:false
        };
        console.log("Proppss",this.props);
    }

    render(){
        const {language, darkMode} = this.props;
        const {width,height} =Dimensions.get("window");
        return(
            <ErrorBoundaryMainComponent>
            <View style={[styles.flexOne,{height:height/3.2,top: Platform.OS === 'ios' ? height/18 : height/18}]}>
                
                {Platform.OS === 'ios' ?
                ( this.props.table?
                    <View style={[styles.marginBottom14,styles.marginHorizontal24,styles.marginTop48,{height:width/1.4,width:height/1.4},styles.padding32]}>
                    <View style={[styles.row]}>
                    <Text style={[this.props.colorMode ? styles.white : styles.black,styles.fontSize11,styles.textLeft,{flex:0.2}]}>Sl. No.</Text>
                        <Text style={[this.props.colorMode ? styles.white : styles.black,styles.fontSize11,styles.flexOne,styles.textCenter]}>{type === 'Monthly'?"Date":type === 'Daily'?"Hours":null}</Text>
                        <Text style={[this.props.colorMode ? styles.white : styles.black,styles.fontSize11,styles.flexOne,styles.textCenter]}>Consumption</Text>
                    </View>
                    <View style={[{borderBottomWidth: 0.7}, styles.opacity25perc, styles.paddingTop, this.props.colorMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                    <View style={[styles.row,styles.spaceBetween,]}>
                    <FlatList data={this.props.consumption} renderItem={(item,index)=><View style={[styles.opacity65perc]}>
                        <View style={[styles.row]}>
                        <Text style={[this.props.colorMode ? styles.white : styles.black,styles.extraSmall,styles.opacity80perc, styles.paddingTop4,styles.textLeft,{flex:0.2}]}>{item.index+1} </Text>
                        <Text style={[this.props.colorMode ? styles.white : styles.black,styles.extraSmall,styles.opacity80perc, styles.paddingTop4,styles.flexOne,styles.textCenter]}>{item.item.x}</Text>
                        <Text style={[this.props.colorMode ? styles.white : styles.black,styles.extraSmall,styles.opacity80perc, styles.paddingTop4,styles.flexOne,styles.textCenter]}>{item.item.y}</Text>
                        </View>
                    <View style={[{borderBottomWidth: 0.7}, styles.opacity25perc, styles.paddingTop4, this.props.colorMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                    </View>}/>
                    </View>
                    </View> 
                    :
                    // <View style={[{height:width/1.25,width:height/1.15}]}>
                    <View style={[styles.row]}>
                        {/* <View style={[{position:'absolute', top:height/500+24, left: width/900+24}, styles.opacity65perc]}> 
                            <Text style={{color: 'white', fontSize:RFPercentage(1.6)}}>
                                MD 
                            </Text>
                        </View> */}
                         <VictoryChart 
                            domainPadding={{x: RFPercentage(9), y: RFPercentage(4)}}
                            height={Dimensions.get("window").width/1.2} 
                            width={Dimensions.get("window").height/1.1}
                        >
                            <VictoryAxis 
                                tickLabelComponent={<VictoryLabel  style={[{fontSize:RFPercentage(1.4),fill: this.props.colorMode? '#ffffff99' : '#00000099'},]} dx={0} dy={0} />}           
                                tickFormat={this.props.consumption.map(x => x.x)}
                                // label="Days"
                                style={{
                                    axisLabel: { fontSize: 5, scale:-1},
                                }}
                            />
                            <VictoryAxis 
                                // invertAxis={false}
                                tickLabelComponent={<VictoryLabel style={{fontSize:12,fill: this.props.colorMode? '#ffffff99' : '#00000099'}}  dy={0}  />}
                                dependentAxis
                                // label="MD"
                                style={{ 
                                    axisLabel: { fontSize: 10, padding: 10},
                                }}
                            />
                            <VictoryBar  alignment='middle' 
                                labels={["", "", "", "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]}
                                labelComponent={<VictoryLabel  angle={270} />}
                                events={[
                                    {
                                        target: "data",
                                        eventHandlers: {
                                            onPressOut: () => ({
                                                mutation: () => console.log('out')
                                            }),
                                            onPressIn: () => {
                                            return [{
                                                target: "labels",
                                                mutation: dataProps => {
                                                    let index =dataProps.index;
                                                    return dataProps.text != '' ?
                                                    null : {
                                                        text: dataProps.datum._y.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0], textAnchor: "middle" , dy: RFPercentage(0.6) , dx: -(RFPercentage(3.5)) ,  style: {fill: '#fff',fontSize: RFPercentage(1.4),}
                                                    }
                                                }
                                            }];
                                            }
                                        }
                                    }
                                ]}
                                data={this.props.consumption}
                                style={{data: { fill: "#64AE64"} }}
                                cornerRadius={{ topLeft: RFPercentage(1.3) }}
                                barWidth={RFPercentage(1.1)}
                                animate={{
                                    onLoad: { duration: 100, }
                                }}
                            />
                        </VictoryChart>
                        
                        {/* <View style={[styles.bottomHorizontal, styles.opacity65perc,{flexDirection:'column-reverse',bottom:width/21}]}> 
                            <Text style={{color: 'white', fontSize:RFPercentage(1.6)}}>
                                Days
                            </Text>
                        </View> */}
                        {/* {position:'absolute', bottom:height/500+45, right: width/18+10},{position:"absolute",right:height/18,bottom:width/11}, */}
                        {/* </View> */}
                        
                    </View>)
                :
                    (this.props.table?
                        <View style={[styles.marginBottom14,styles.marginHorizontal24,styles.marginTop,{height:width/1.4,width:height/1.4},styles.padding32]}>
                        <View style={[styles.row,]}>
                        <Text style={[this.props.colorMode ? styles.white : styles.black,styles.fontSize11,styles.textLeft,{flex:0.2}]}>Sl. No.</Text>
                            <Text style={[this.props.colorMode ? styles.white : styles.black,styles.fontSize11,styles.flexOne,styles.textCenter]}>Days</Text>
                            <Text style={[this.props.colorMode ? styles.white : styles.black,styles.fontSize11,styles.flexOne,styles.textCenter]}>Maximum Demand</Text>
                        </View>
                        <View style={[{borderBottomWidth: 0.7}, styles.opacity25perc, styles.paddingTop, this.props.colorMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                        <View style={[styles.row,styles.spaceBetween,]}>
                        <FlatList data={this.props.consumption} renderItem={(item,index)=><View style={[styles.opacity65perc]}>
                            <View style={[styles.row]}>
                            <Text style={[this.props.colorMode ? styles.white : styles.black,styles.extraSmall,styles.opacity80perc, styles.paddingTop4,styles.textLeft,{flex:0.2}]}>{item.index+1} </Text>
                            <Text style={[this.props.colorMode ? styles.white : styles.black,styles.extraSmall,styles.opacity80perc, styles.paddingTop4,styles.flexOne,styles.textCenter]}>{item.item.x}</Text>
                            <Text style={[this.props.colorMode ? styles.white : styles.black,styles.extraSmall,styles.opacity80perc, styles.paddingTop4,styles.flexOne,styles.textCenter]}>{item.item.y}</Text>
                            </View>
                        <View style={[{borderBottomWidth: 0.7}, styles.opacity25perc, styles.paddingTop4, this.props.colorMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                        </View>}/>
                        </View>
                        </View> 
                        :
                    <Svg style={[]}>
                        <View style={[styles.row]}>
                        {/* <View style={[{position:'absolute', top:height/500+24, left: width/900+24}, styles.opacity65perc]}> 
                            <Text style={{color: 'white', fontSize:RFPercentage(1.6)}}>
                                MD 
                            </Text>
                        </View> */}
                         <VictoryChart 
                            domainPadding={{x: RFPercentage(9), y: RFPercentage(4)}}
                            height={Dimensions.get("window").width/1.2} 
                            width={Dimensions.get("window").height/1.1}
                        >
                            <VictoryAxis 
                                tickLabelComponent={<VictoryLabel  style={[{fontSize:RFPercentage(1.4),fill: this.props.colorMode? '#ffffff99' : '#00000099'},]} dx={0} dy={0} />}           
                                tickFormat={this.props.consumption.map(x => x.x)}
                                // label="Days"
                                style={{
                                    axisLabel: { fontSize: 5, scale:-1},
                                }}
                            />
                            <VictoryAxis 
                                // invertAxis={false}
                                tickLabelComponent={<VictoryLabel style={{fontSize:12,fill: this.props.colorMode? '#ffffff99' : '#00000099'}}  dy={0}  />}
                                dependentAxis
                                // label="MD"
                                style={{ 
                                    axisLabel: { fontSize: 10, padding: 10},
                                }}
                            />
                            <VictoryBar  alignment='middle' 
                                labels={["", "", "", "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]}
                                labelComponent={<VictoryLabel  angle={270} />}
                                events={[
                                    {
                                        target: "data",
                                        eventHandlers: {
                                            onPressOut: () => ({
                                                mutation: () => console.log('out')
                                            }),
                                            onPressIn: () => {
                                            return [{
                                                target: "labels",
                                                mutation: dataProps => {
                                                    let index =dataProps.index;
                                                    return dataProps.text != '' ?
                                                    null : {
                                                        text: dataProps.datum._y.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0], textAnchor: "middle" , dy: RFPercentage(0.6) , dx: -(RFPercentage(3.5)) ,  style: {fill: '#fff',fontSize: RFPercentage(1.4),}
                                                    }
                                                }
                                            }];
                                            }
                                        }
                                    }
                                ]}
                                data={this.props.consumption}
                                style={{data: { fill: "#64AE64"} }}
                                cornerRadius={{ topLeft: RFPercentage(1.3) }}
                                barWidth={RFPercentage(1.1)}
                                animate={{
                                    onLoad: { duration: 100, }
                                }}
                            />
                        </VictoryChart>
                        
                        {/* <View style={[styles.bottomHorizontal, styles.opacity65perc,{top:RFPercentage(40), left:RFPercentage(-1)}]}> 
                            <Text style={{color: 'white', fontSize:RFPercentage(1.6)}}>
                                Days
                            </Text>
                        </View> */}
                        {/* {position:'absolute', bottom:height/500+45, right: width/18+10},{position:"absolute",right:height/18,bottom:width/11}, */}
                        </View>
                        
                    </Svg>)
                }

                {!this.props.table && <View style={{position:"absolute",zIndex:-1}}> 
                    <Svg style={[]}>
                        <VictoryBar 
                            domainPadding={{ x: width/8 }}
                            height={Dimensions.get("window").width/1.2} // from react-native
                            width={Dimensions.get("window").height/1.1}
                            labelComponent={<VictoryTooltip/>}
                            data={this.props.fixed}
                            style={{data: { fill: this.props.colorMode ? "#3C3C43" : Colors.lightGrey}  }}
                            cornerRadius={{ topLeft: RFPercentage(1.3) }}
                            barWidth={RFPercentage(1.1)}
                        />
                    </Svg>
                </View>}
                
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default MaximumDemandBarComponent;
