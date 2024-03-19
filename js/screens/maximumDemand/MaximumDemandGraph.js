import React from 'react';
import {Text, View, TouchableOpacity,Dimensions} from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import {connect} from "react-redux";
import MIcons from 'react-native-vector-icons/MaterialIcons';
import OIcons from 'react-native-vector-icons/Octicons';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import moment from "moment";
import {backgroundFixedBar,handleNegative} from "../../helpers/common/chartDataHelper";
import MaximumDemandBarComponent from 'SmartgasConsumerApp/js/screens/maximumDemand/components/MaximumDemandBar';
import {MonthlyConsumption,MonthlyFixed} from 'SmartgasConsumerApp/js/constants/dashboard/VictoryChart';

  // Backend
  import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
  import {strings} from "SmartgasConsumerApp/js/strings";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
  const {width,height} =Dimensions.get("window");
class MaximumDemandGraph extends React.Component{
    constructor(props){
        super(props);
        this.state={
            table:false
            // year: moment(this.route.params.year[0]).format('YYYY')
        };
    }

    componentDidMount(){

        this.props.navigation.setOptions({ headerRight : ()=> null });
        this.props.navigation.setOptions({ headerLeft : () => (
            <TouchableOpacity style={[styles.row, styles.allCenter, styles.paddingHorizontal24]} onPress={() => this.props.navigation.navigate('/mdi')}>
               <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25}/>
                <Text style={[this.props.darkMode ? styles.white : styles.black, styles.selfCenter, styles.fontSize15, styles.paddingHorizontal6]}>{strings[this.props.language].back}</Text>
            </TouchableOpacity>
        ), });

    }

    render(){
        const {language, darkMode} = this.props;
        const {graphData, month}  = this.props.route.params;
        const year = moment(new Date).format('YYYY')
        // console.log("Route",moment(this.props.route.params.year[0].logDate).format('YYYY'), )


        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal24]} >
            {/* {justifyContent: 'flex-start', alignItems: 'center' } */}
            <View style={[styles.row,styles.marginTop,styles.centerHorizontal]}>
                <View style={[styles.row,styles.flexOne]}>
                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>Maximum Demand</Text>
                    <Text style={[styles.green, styles.fontSize17]}>
                        {" Graph"}
                    </Text>
                </View>
                <View style={[styles.margin6,{backgroundColor:darkMode ? "#3C3C43" : Colors.lightGrey,zIndex:2},styles.radius20,styles.row,styles.centerHorizontal]}>
                <TouchableOpacity onPress={()=>this.setState({table:!this.state.table})} style={[styles.padding,{backgroundColor:this.state.table?"#64AE64":null},styles.radius20]}>
                <Icon name={"table"} size={15} color={darkMode?Colors.white:Colors.black}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setState({table:!this.state.table})} style={[styles.padding,{backgroundColor:this.state.table?null:"#64AE64"},styles.radius20]}>
                <Icon name={"bar-chart"} size={15} color={darkMode?Colors.white:Colors.black}/>
                </TouchableOpacity>
                {/* styles.padding10,styles.right,styles.Margin10,styles.absolute,{top:20,right:0,zIndex:2} */}
                </View>
                </View>

                {/* styles.paddingHorizontal40 */}
                <View style={[styles.flexOne, {justifyContent: 'flex-start', alignItems: 'center' }]}>
                <View style={[{width: height/0.8, height: width/1.1, transform: [ { rotate: '90deg'}],right:-width/6, paddingLeft: Platform.OS == "ios" ? height/2.6 : height/2.6 }]}>
                {/* styles.flexOne, styles.allCenter, { transform: [{ rotate: '90deg'}], position: 'absolute', bottom:0, top:height/10,left:-width/2.5} */}
                    {/* top:height/10,right:width/85 */}
                    <View style={[styles.flexOne, styles.extraMargin, styles.radius20,]}>
                            <View style={[styles.row, styles.flexOne]}>
                                <Text style={[darkMode ? styles.green : styles.black, styles.small,{position: 'absolute', left: height/30,top:width/6}  ]}>MDI</Text>
                                <View style={[styles.flexOne]}>                                
                    <MaximumDemandBarComponent
                        consumption={handleNegative(graphData)}
                        fixed={backgroundFixedBar(graphData)}
                        colorMode={darkMode}
                        maximumDemandReached={strings[language].mdi.maximumDemandReached}
                        assignedMaximumDemand={strings[language].mdi.assignedMaximumDemand}
                        table={this.state.table}
                    />
                    <Text style={[darkMode ? styles.green : styles.black, styles.small, {position: 'absolute', bottom: -width/22, left: height/30}, styles.marginBottom]}>{"Days"}</Text>
                                </View>
                            </View>
                        </View>
                </View>
                {/* <View style={[{position:"absolute", left:width/-20, transform: [{ rotate: '90deg' }]}]}>
                    <Text style={[styles.medium, styles.palanquinRegular, darkMode ? styles.white : styles.black]}>
                        {strings[language].mdgraph}
                    </Text>
                </View> */}
                <View style={{position:"absolute", transform: [{ rotate: '90deg' }], top: height/2.2, right: - width/6}}>
                    <Text style={[styles.green, styles.medium22, styles.palanquinSemiBold]}>
                        {month} {year}
                    </Text>
                </View>
                <View style={[styles.row, styles.selfCenter,{ transform: [{ rotate: '90deg' }],left:-width/2.2}]}>
                            <Text style={[styles.paddingHorizontal10, styles.paddingBottom4, styles.opacity65perc]}>
                                <OIcons name='primitive-dot' size={14} color={Colors.green}/>
                            </Text>
                            <Text style={[styles.green, styles.palanquinRegular, styles.lineHeight18, styles.small]}>
                            {strings[language].mdi.maximumDemandReached}
                            </Text>
                            <Text style={[styles.paddingHorizontal10, styles.paddingBottom4, styles.opacity65perc]}>
                                <OIcons name='primitive-dot' size={14} color={Colors.blue}/>
                            </Text>
                            <Text style={[styles.palanquinRegular, styles.lineHeight18, styles.small, styles.blue]}>
                                {strings[language].mdi.assignedMaximumDemand}
                            </Text>
                        </View>
                {/* <View style={{position:"absolute", transform: [{ rotate: '270deg' }], bottom: width/6.9, left: width/15}}>
                    <Text style={[styles.small, styles.palanquinRegular, darkMode? styles.white: styles.black, styles.opacity65perc]}>
                        MD
                    </Text>
                </View> */}
                {/* <View style={{position:"absolute", transform: [{ rotate: '270deg' }], top: width/4.5, left: width/1.3 }}>
                    <Text style={[styles.small, styles.palanquinRegular, darkMode? styles.white: styles.black, styles.opacity65perc]}>
                        Days
                    </Text>
                </View> */}
                {/* <View style={{position:"absolute", transform: [{ rotate: '270deg' }], left:10, borderTopWidth:1, borderColor:Colors.blue, padding:Dimensions.get("window").height/2.3 - 50,left:Dimensions.get("window").width/4.5 + 55,top:Dimensions.get("window").height/22 + 80}}>

                </View> */}
                </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps (state) {
    return {
        activeCount: commonSelectors.activeCount(state),
        darkMode: commonSelectors.darkMode(state),
        language: commonSelectors.language(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
    }
}
const MaximumDemandGraphScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(MaximumDemandGraph);
export {MaximumDemandGraphScreen}
