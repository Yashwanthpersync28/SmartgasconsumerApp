import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { VictoryChart, VictoryAxis, VictoryPie } from "victory-native";
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';

const {height, width} = Dimensions.get('window');

class PieChartComponent extends React.Component{
    render(){
        return(
            <View>
                <View style={[styles.flexOne, styles.absolute, styles.centerVertical, styles.flexEndHorizontal, { height: height/12, right:width/4.6 }]}>
                    <Text style={[styles.textAlignVertical, styles.extraSmallAdvance, { color: Colors.pieGray }]}>
                        {this.props.currentMonth}
                    </Text>
                    <Text style={[styles.textAlignVertical, styles.extraSmallAdvance, { color: Colors.pieGreen }]}>
                        {this.props.previousMonth}
                    </Text>
                </View>
                <VictoryChart height={height/5} width={width/2.3}>
                    <VictoryAxis style={{ 
                        axis: {stroke: "transparent"}, 
                        ticks: {stroke: "transparent"},
                        tickLabels: { fill:"transparent"} 
                    }} />
                    <VictoryPie
                        data={[{x:1,y:2}]}
                        colorScale={ [Colors.pieGray] }
                        radius={() => height/25.5 }
                        innerRadius={() => height/30}
                        style={{ labels: { display: "none" } }}
                    />
                    <VictoryPie
                        data={[{x:1,y:100},{x:1,y:20}]}
                        cornerRadius={23}
                        colorScale={[Colors.pieGreen, "transparent", ]}
                        radius={() => height/21.5 }
                        innerRadius={() =>  height/19}
                        style={{ labels: { display: "none" } }}
                    />
                    <VictoryPie
                        cornerRadius={23}
                        data={[{x:1,y:10},{x:1,y:5}]}
                        colorScale={[Colors.pieGray, "transparent", ]}
                        radius={() => height/16.7 }
                        innerRadius={() => height/15}
                        style={{ labels: { display: "none" } }}
                    />
                </VictoryChart>
            </View>
        );
    }
}

export default PieChartComponent;



