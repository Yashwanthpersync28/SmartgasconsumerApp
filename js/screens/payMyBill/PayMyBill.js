import React from 'react';
import { connect } from "react-redux";
import { Text, View, StatusBar, ScrollView, Dimensions, RefreshControl, FlatList } from 'react-native';
// Styles and Colors
import { styles } from '../../styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Component
import MonthlyComparison from 'SmartgasConsumerApp/js/screens/payMyBill/components/MonthlyComparison';
import EnergyTipsComponent from 'SmartgasConsumerApp/js/components/common/energyTips/EnergyTips';
// Constants
// Icons
import FIcons from 'react-native-vector-icons/Feather';
// Libraries
import { AnimatedCircularProgress,  } from 'react-native-circular-progress';

import { RFPercentage } from 'react-native-responsive-fontsize';
// Backend
import moment from "moment"
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import {strings} from "SmartgasConsumerApp/js/strings";
import {chartDataWithoutDate} from "../../helpers/common/chartDataHelper";
import * as dashboard from "../../api/dashboard";
import {apiDispatcher, userDetailActions} from "../../actions";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

const { height, width } = Dimensions.get('window');

class PayMyBill extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            billDetails: {},
            currentMonth: {},
            lastMonth: {},
        }
    }

    async componentDidMount(): void {
        this.syncData()

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'PayMyBill') {
                    this.props.setCurrentRoute('PayMyBill');
                    this.syncData()
                }
            }
        );
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.payMyBill !== prevProps.payMyBill){
            let data =this.props.payMyBill ? JSON.parse(JSON.stringify(this.props.payMyBill)) : [];
            console.log('DID update',data, this.props.payMyBill)

            this.setState({
                billDetails: data.billDetails,
                unitStatusSign: data.monthlyComparision.unitStatus.charAt(0),
                unitStatus: data.monthlyComparision.unitStatus.substring(1),
                currentMonth: data.monthlyComparision.currentMonth,
                lastMonth: data.monthlyComparision.lastMonth,
                currentMonthPercent: data.monthlyComparision.currentMonth.percent/100,
                lastMonthPercent: data.monthlyComparision.lastMonth.percent/100,
                energyTips: data.energyTips,
                refreshing: false
            }, ()=>console.log())
        }

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    syncData = async () => {
        try {
            let data = await this.props.apiDispatcher(dashboard.payMyBillApi())
            console.log("Pay My Bill Api",data.data);
            this.props.setPayMyBill(data.data);
        } catch (e) {
            this.setState({refreshing: false})
        }
    }
    onRefresh = () => {
        this.setState({refreshing: true});
        this.syncData()

    };

    _renderItem = ({item, index}) => {
        return (
            <View style={[index==0 ? {marginLeft:24} : null, styles.flexOne]}>
                <EnergyTipsComponent header={item.heading} description={item.description} darkMode={this.props.darkMode}/>
            </View>
        );
    }

    render(){
        const {language, darkMode} = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne, styles.paddingTopHeader]} >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.sunglowYellow}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh} />
                    }
                    style={[styles.flexOne]}
                >
                    { this.props.darkMode ?  <StatusBar backgroundColor={Colors.black} barStyle='light-content'  /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'  />}
                    <View style={[styles.flexQuarterToOne, styles.marginVertical, styles.marginBottom24, styles.paddingHorizontal24]}>
                        <View style={[styles.row, styles.marginVertical2,]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                                {`${strings[language].pay}  `}
                            </Text>
                            <Text style={[styles.darkGreen, styles.medium]}>
                                {strings[language].myBill}
                            </Text>
                        </View>
                        <View style={[]} >
                            <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                                {strings[language].payMyBillContent}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.flexOne, styles.allCenter, styles.marginVertical, styles.paddingHorizontal24]}>
                        <View style={[styles.row, styles.flexOne]}>
                            <View style={[styles.flexOne, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.allCenter, styles.marginRight10, styles.elevate2]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                                    {moment(this.state.billDetails.invoiceDate).format("DD")}
                                </Text>
                                <Text style={[styles.fontSize19, styles.darkGreen, styles.lineHeight22]}>
                                    {moment(this.state.billDetails.invoiceDate).format("MMM")}
                                </Text>
                            </View>
                            <View style={[styles.flexTwo, styles.row, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.padding14, styles.marginLeft10, styles.elevate2]}>
                                <View style={[styles.flexOne, styles.absolute, styles.centerVertical, { right: RFPercentage(2.5)}]}>
                                    <View style={[styles.absolute, styles.icon32, darkMode ? { backgroundColor: Colors.mediumGray } : styles.bgWhite, styles.allCenter]}>
                                        <FIcons name={'x'} size={RFPercentage(2)} color={darkMode ? Colors.white : Colors.black}/>
                                    </View>
                                </View>
                                <View style={[styles.flexOne, styles.centerVertical]}>
                                    <Text style={[styles.small, darkMode ? styles.white : styles.black]}>
                                        {strings[language].amount}
                                    </Text>
                                    <Text style={[styles.right, styles.medium22, styles.darkGreen]}>
                                        {this.state.billDetails.amount}
                                    </Text>
                                    <Text style={[styles.right, styles.small, darkMode ? styles.white : styles.black, styles.opacity65perc]}>
                                        INR
                                    </Text>
                                </View>
                                <View style={[{ borderLeftWidth: 0.8 ,borderLeftColor:  darkMode ? Colors.white : Colors.black }, styles.marginHorizontal, styles.opacity65perc]}>

                                </View>
                                <View style={[styles.flexOne, styles.centerVertical]}>
                                    <Text style={[darkMode ? styles.white : styles.black, styles.small]}>
                                        {strings[language].consumption}
                                    </Text>
                                    <Text style={[styles.right, styles.medium22, styles.darkGreen]}>
                                        {this.state.billDetails.consumption}
                                    </Text>
                                    <Text style={[styles.right, styles.small, darkMode ? styles.white : styles.blackj, styles.opacity65perc]}>
                                        Units
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[ darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.padding14, styles.elevate2, styles.marginHorizontal24, styles.extraMarginVertical]}>
                        <View style={[styles.row, styles.marginVertical4, styles.paddingHorizontal10, styles.spaceBetween]}>
                            <View style={[styles.row]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                                    {`${strings[language].monthly}  `}
                                </Text>
                                <Text style={[styles.darkGreen, styles.medium]}>
                                    {strings[language].compare}
                                </Text>
                            </View>
                            <View style={[styles.padding, styles.radius, styles.bgDarkGreen]}>
                                <FIcons name={this.state.unitStatusSign == '+' ? 'arrow-up' : 'arrow-down'} size={RFPercentage(3)} color={Colors.white}/>
                            </View>
                        </View>
                        <View style={[styles.allCenter, styles.flexOne]}>
                            <AnimatedCircularProgress
                                size={120}
                                width={10}
                                // fill={this.props.payMyBill.monthlyComparision.unitStatus.substring(1)}
                                fill={this.state.unitStatus ? this.state.unitStatus: null}
                                tintColor={Colors.green}
                                backgroundColor={darkMode ? "#ffffff26" : "#00000026"}
                                padding={0}
                                arcSweepAngle={180}
                                rotation={270}
                                lineCap={'round'}
                                style={[{top: 25}]}
                                duration={2000}
                                childrenContainerStyle={[{borderRadius:20}]}
                            >
                                {
                                    (fill) => (
                                    <Text style={[darkMode ? styles.white : styles.black, styles.regularPlus, styles.selfCenter, {top:-20}]}>
                                    {this.state.unitStatusSign} { Math.round(fill) } {'%'}
                                    </Text>
                                    )
                                }
                            </AnimatedCircularProgress>
                        </View>
                        <View style={[styles.flexOne, styles.marginBottom10, styles.marginLeft10]}>
                            <View style={[styles.paddingBottom]}>
                                <MonthlyComparison title={'Current Month'} units={this.state.currentMonth.value} unitName={strings[language].units} consumption={this.state.currentMonthPercent} colorMode={darkMode} fontColor={darkMode ? styles.white : styles.black}/>
                            </View>
                            <MonthlyComparison title={'Previous Month'} units={this.state.lastMonth.value} unitName={strings[language].units} consumption={this.state.lastMonthPercent} colorMode={darkMode} fontColor={darkMode ? styles.white : styles.black}/>
                        </View>

                    </View>
                  
                    <View style={[styles.row, styles.marginVertical4, styles.paddingHorizontal24]}>
                        <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                            {`${strings[language].energy}  `}
                        </Text>
                        <Text style={[styles.darkGreen, styles.medium]}>
                            {strings[language].tips}
                        </Text>
                    </View>
                    <View style={[styles.flexOneAndQuarter, styles.marginBottom5Percent]}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.energyTips}
                            renderItem={this._renderItem}
                            initialNumToRender={10}
                            ref={ref => this.listView = ref}
                            keyExtractor={(item, index) => item.heading + index}
                        />

                    </View>
                </ScrollView>
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
        payMyBill: commonSelectors.payMyBill(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        setPayMyBill: (data={}) => dispatch(userDetailActions.setPayMyBill(data)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const PayMyBillScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(PayMyBill);
export {PayMyBillScreen}
