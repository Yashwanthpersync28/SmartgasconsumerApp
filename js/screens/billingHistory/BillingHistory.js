import React from 'react';
import { connect } from "react-redux";
import { Text, View, StatusBar, ScrollView, Dimensions, RefreshControl, ActivityIndicator, Platform } from 'react-native';
// Styles and Colors
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Component
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'
import PaymentHistoryComponent from 'SmartgasConsumerApp/js/screens/billingHistory/components/PaymentHistory'
// Constants
import { BillingLine, BillingScatter } from 'SmartgasConsumerApp/js/constants/dashboard/VictoryChart';
// Libraries
import { RFPercentage } from 'react-native-responsive-fontsize';
import { VictoryLine, VictoryChart, VictoryScatter, VictoryAxis, VictoryLabel } from "victory-native";
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import {strings} from "SmartgasConsumerApp/js/strings";
import * as dashboard from "../../api/dashboard";
import {apiDispatcher, userDetailActions} from "../../actions";
import {chartDataBillingHistory, chartDataWithoutDate} from "../../helpers/common/chartDataHelper";
import moment from 'moment';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

class BillingHistory extends React.Component{

    constructor(props){
        super(props)
        this.state = {
        }
    }

    async componentDidMount(): void {
        this.syncData()

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'billingHistory') {
                    this.props.setCurrentRoute('billingHistory');
                    this.syncData()
                }
            }
        );

        // this.backHandler = BackHandler.addEventListener(
        //     "hardwareBackPress",
        //     this.backAction
        // );
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.billingHistory !== prevProps.billingHistory){
            let data =this.props.billingHistory ? JSON.parse(JSON.stringify(this.props.billingHistory)) : [];
            console.log(data, this.props.billingHistory)
            this.setState({bills: data.bills,graphData: chartDataBillingHistory(data.graphData), refreshing: false}, ()=> console.log("asxasxasxas",data, this.state.graphData)
            )
        }

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    syncData = async () => {
        try {
            let data = await this.props.apiDispatcher(dashboard.billingHistoryApi())
            console.log("billingHistoryApi",data.data);
            if(data.status == 200)
                this.props.setBillingHistory(data.data);
            else{
                console.log("Unhandled Error",data);
                // alert(`Data -> ${data.data} Status -> ${data.status}`)
            }
        } catch (e) {
            this.setState({refreshing: false})
        }
    }
    onRefresh = () => {
        this.setState({refreshing: true});
        this.syncData()

    };

    renderPaymentHistory = (darkMode, language) => {
        return (this.state.bills && this.state.bills.length > 0) ? this.state.bills.map(bill=> {
            return  <PaymentHistoryComponent
                date = {moment(bill.month).format("Do")}
                dateSuffix = ""
                month = {moment(bill.month).format("MMMM")}
                year = {moment(bill.month).format("YYYY")}
                amount = {bill.amount}
                consumption = {bill.consumption}
                icon = {bill.status === "DUE" ? "x" : "check"}
                fontColor = {styles.white}
                headerColor = {darkMode ? styles.black : styles.white}
                iconColor = {Colors.white}
                backgroundColor = {darkMode ? styles.bgDarkGreen : styles.bgGreen}
                darkMode={darkMode}
                language={language}
            />
        }) : null

    };


    render(){
        const {language, darkMode} = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne, styles.paddingTopHeader]} >
                { this.props.darkMode ?  <StatusBar backgroundColor={Colors.black} barStyle='light-content'  /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'  />}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.sunglowYellow}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh} />
                    }
                >
                    <View style={[styles.flexOne, styles.marginTop8, styles.paddingHorizontal24]}>
                        <View style={[styles.row, styles.marginTop4, styles.marginVertical4]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                                {`${strings[language].billing}  `}
                            </Text>
                            <Text style={[styles.darkGreen, styles.medium]}>
                                {strings[language].history}
                            </Text>
                        </View>
                        <View style={[]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                                {strings[language].billingHistoryContent}
                            </Text>
                        </View>
                    </View>
                    { this.state.bills?
                    <View style={[styles.flexOne, styles.centerHorizontal, { top: -RFPercentage(4), marginBottom: -RFPercentage(3), left: RFPercentage(1) }]}>
                        <VictoryChart
                            domainPadding={{ y:[30, 0] }}
                            width={Dimensions.get("window").width/1.1}
                            height={Dimensions.get("window").height/2.8}
                        >
                            <VictoryAxis
                                crossAxis
                                tickLabelComponent={<VictoryLabel  style={[{ fontSize:12, fill: darkMode? Colors.white : Colors.black, opacity:0.7 }]} />}
                                tickValues={BillingLine.x}
                                tickFormat={(t) => t}
                                style={{axis: {stroke: "none"}}}
                            />
                            <VictoryAxis
                                tickLabelComponent={<VictoryLabel style={[{ fontSize:12, fill: darkMode? Colors.white : Colors.black, opacity:0.7 }]}   />}
                                dependentAxis
                                tickValues={BillingLine.y}
                                
                                tickFormat={(t) => `${Math.round(t)}`}
                                style={{ axis: {stroke: "none"}, grid : { stroke: "grey", opacity: 0.3}}}
                            />
                            <VictoryLine style={{ data: { stroke: Colors.darkGreen }, parent: { border: "1px solid #ccc"}}} data={this.state.graphData}/>
                            <VictoryScatter
                                style={{
                                    parent: { border: "1px solid #ccc"},
                                    data: { fill: Colors.darkGreen, fillOpacity: 1, stroke: Colors.white, strokeWidth: 2},
                                }}
                                size={6}
                                data={this.state.graphData}
                            />
                        </VictoryChart>
                    </View> : null}
                    { this.state.bills?

                    <View style={[styles.flexOne, styles.paddingHorizontal24, styles.marginBottom24]}>

                        {
                            this.renderPaymentHistory(darkMode, language)
                        }


                        {/* <PaymentHistoryComponent
                            date = "23"
                            dateSuffix = "rd"
                            month = "March"
                            year = "2020"
                            amount = "3123.7"
                            consumption = "723.7"
                            icon = "x"
                            fontColor = {styles.white}
                            headerColor = {darkMode ? styles.black : styles.white}
                            iconColor = {Colors.white}
                            backgroundColor = {darkMode ? styles.bgDarkGreen : styles.bgGreen}
                            darkMode={darkMode}
                            language={language}
                        />
                        <PaymentHistoryComponent
                            date = "23"
                            dateSuffix = "rd"
                            month = "February"
                            year = "2020"
                            amount = "3123.7"
                            consumption = "723.7"
                            icon = "check"
                            fontColor = {styles.darkGreen}
                            headerColor = {styles.darkGreen}
                            textColor = {darkMode ? styles.white : styles.black}
                            iconColor = {Colors.darkGreen}
                            backgroundColor = {darkMode ? styles.bgLightGray : styles.bgWhite}
                            darkMode={darkMode}
                            language={language}
                        />
                        <PaymentHistoryComponent
                            date = "23"
                            dateSuffix = "rd"
                            month = "January"
                            year = "2020"
                            amount = "5163.7"
                            consumption = "923.7"
                            icon = "check"
                            fontColor = {styles.darkGreen}
                            headerColor = {styles.darkGreen}
                            textColor = {darkMode ? styles.white : styles.black}
                            iconColor = {Colors.darkGreen}
                            backgroundColor = {darkMode ? styles.bgLightGray : styles.bgWhite}
                            darkMode={darkMode}
                            language={language}
                        />
                        <PaymentHistoryComponent
                            date = "23"
                            dateSuffix = "rd"
                            month = "December"
                            year = "2020"
                            amount = "4123.7"
                            consumption = "923.7"
                            icon = "check"
                            fontColor = {styles.darkGreen}
                            headerColor = {styles.darkGreen}
                            textColor = {darkMode ? styles.white : styles.black}
                            iconColor = {Colors.darkGreen}
                            backgroundColor = {darkMode ? styles.bgLightGray : styles.bgWhite}
                            darkMode={darkMode}
                            language={language}
                        /> */}
                    </View>
                        : 
                        <View style={[ styles.allCenter, styles.height50Points]}>
                           <LoaderComponent/>
                        </View>
                    }
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
        userDetails: commonSelectors.userDetails(state),
        billingHistory: commonSelectors.billingHistory(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        setBillingHistory: (data={}) => dispatch(userDetailActions.setBillingHistory(data)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const BillingHistoryScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(BillingHistory);
export {BillingHistoryScreen}
