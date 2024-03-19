import React from 'react';
import { connect } from "react-redux";
import { Text, View, StatusBar, FlatList, Switch, Pressable, Dimensions } from 'react-native';
// Styles and Colors
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Constants
import { timeSlot } from 'SmartgasConsumerApp/js/constants/dashboard/EnergySavingProgram';
// Icons
import MIcons from 'react-native-vector-icons/MaterialIcons';
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import {strings} from "SmartgasConsumerApp/js/strings";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

class EnergySavingProgram extends React.Component{

    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
        this.props.navigation.setOptions({ headerRight : ()=> null });
        this.props.navigation.setOptions({ headerLeft : () => (
            <Pressable style={[styles.row,styles.allCenter,styles.paddingHorizontal24]} onPress={() => this.props.navigation.navigate('Settings')}>
                <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25}/>
                <Text style={[styles.palanquinMedium, this.props.darkMode ? styles.white : styles.black ,styles.selfCenter, styles.fontSize15, styles.paddingHorizontal6]}>
                    {strings[this.props.language].back}
                </Text>
            </Pressable>
        ), });
    }
   
    renderItem = ({item, index}) => {
        const toggleSwitch = () => {
            if(this.state.isEnabled)
                this.setState({isEnabled: false})
            else
                this.setState({isEnabled: true})
        }
        return (
            <View style={[styles.flexOne]}>
                <View style={[styles.row, styles.spaceBetween]}>
                    <View style={[styles.flexOne]}>
                            <Text style={[styles.marginVertical10, styles.palanquinRegular, styles.small, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
                                { item.priority }
                            </Text>
                        </View>
                        <View style={[styles.flexTwo]}>
                            <Text style={[styles.marginVertical10, styles.palanquinRegular, styles.small, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
                                { item.timeFrame }
                            </Text>
                        </View>
                        <View style={[styles.flexOneAndHalf, styles.allCenter, styles.row]}>
                            <Text style={[styles.marginVertical10, styles.palanquinRegular, styles.small, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
                                { item.notification }
                            </Text>
                            <MIcons style={[styles.opacity80perc]} name="keyboard-arrow-right" color={this.props.darkMode ? Colors.white : Colors.black} size={22}/>
                        </View>
                        <View style={[styles.allCenter, styles.flexQuarterToOne]}>
                            <Switch
                                style={{ transform: [{ scaleX: .5 }, { scaleY: .5 }] }}
                                trackColor={{ false: "#767577", true: Colors.offWhite }}
                                thumbColor={item.action ? "#2BAE66FF" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={item.action}
                            />
                        </View>
                    </View>
              <View style={[{ borderBottomWidth:0.7 }, styles.opacity25perc, styles.paddingTop2, this.props.darkMode ?{ borderColor:Colors.white } : { borderColor:Colors.black }]}/>
            </View>
        );
    }

    render(){

        const {language, darkMode} = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne, styles.paddingTop58, styles.paddingHorizontal20]} >
                { this.props.darkMode ?  <StatusBar backgroundColor={Colors.black} barStyle='light-content'  /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'/>}
                <View style={[styles.marginVertical]}>
                    <Text style={[styles.darkGreen, styles.medium]}>
                        {strings[language].energySavingProgram}
                    </Text>
                </View>
                <View style={[styles.paddingBottom20]} >
                    <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                        {strings[language].EnergySavingProgramContent}
                    </Text>
                </View>
                <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.marginVertical10, styles.paddingHorizontal24, styles.paddingTop20, styles.elevate3]}>
                <View style={[styles.row, styles.paddingVertical12, styles.paddingTop16]}>
                        <Text style={[darkMode ? styles.white : styles.black, styles.regular]}>
                            {`${strings[language].time}  `}
                        </Text>
                        <Text style={[styles.regular, styles.darkGreen]}>
                            {strings[language].slot}
                        </Text>
                    </View>
                    <View style={[]}>
                        <View style={[styles.row, styles.spaceBetween, styles.paddingVertical4]}>
                            <View style={[styles.flexOne]}>
                                <Text style={[this.props.darkMode ? styles.white : styles.black, styles.small]}>
                                    {strings[language].priority}
                                </Text>
                            </View>
                            <View style={[styles.flexTwo]}>
                                <Text style={[this.props.darkMode ? styles.white : styles.black, styles.small]}>
                                    {strings[language].timeFrame}
                                </Text>
                            </View>
                            <View style={[styles.flexOneAndHalf]}>
                                <Text style={[this.props.darkMode ? styles.white : styles.black, styles.small]}>
                                    {strings[language].notification}
                                </Text>
                            </View>
                            <View style={[styles.flexOneToQuarter]}>
                                <Text style={[this.props.darkMode ? styles.white : styles.black, styles.small]}>
                                    {strings[language].action}
                                </Text>
                            </View>
                        </View>
                        <View style={[{ borderBottomWidth:0.7 }, styles.opacity25perc, styles.paddingTop2, this.props.darkMode ? { borderColor: Colors.white } : { borderColor:Colors.black }]}/>
                        <FlatList 
                            showsVerticalScrollIndicator={false}
                            style={{height:Dimensions.get("window").height*60/Dimensions.get("window").width}}
                            data={timeSlot}
                            renderItem={this.renderItem}
                            numColumns={1}
                            initialNumToRender={10}
                            ref={ref => this.listView = ref}
                            keyExtractor={(item, index) => item.priority + index}
                        />
                        <View style={[styles.allCenter, styles.paddingVertical16]}>
                            <Text style={[styles.green, styles.extraSmall]}>
                                {strings[language].EnergySavingProgramFooter}
                            </Text>
                        </View>
                    </View>
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
const EnergySavingProgramScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EnergySavingProgram);
export {EnergySavingProgramScreen}