import React from 'react';
import { connect } from "react-redux";
import { Text, View, StatusBar, ScrollView, Dimensions, RefreshControl, FlatList } from 'react-native';
// Styles and Colors
import { styles } from '../../styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Component
import EnergyTipsComponent from 'SmartgasConsumerApp/js/components/common/energyTips/EnergyTips';
// Libraries
import { AnimatedCircularProgress,  } from 'react-native-circular-progress';

// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import {strings} from "SmartgasConsumerApp/js/strings";
import * as dashboard from "../../api/dashboard";
import {apiDispatcher, userDetailActions} from "../../actions";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

class PrepaidBilling extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            balance: {},
        }
    }

    async componentDidMount(): void {
        this.syncData()

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'PrepaidBilling') {
                    this.props.setCurrentRoute('PrepaidBilling');
                }
            }
        );
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.prepaidBilling !== prevProps.prepaidBilling){
            let data =this.props.prepaidBilling ? JSON.parse(JSON.stringify(this.props.prepaidBilling)) : [];
            console.log('DID update',data, this.props.prepaidBilling)

            this.setState({
                balance: data.balance,
                energyTips: data.energyTips,
                refreshing: false
            }, ()=>console.log('Prepaid Billing States', this.state.energyTips))
        }

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    syncData = async () => {
        try {
            let data = await this.props.apiDispatcher(dashboard.prepaidBillingApi())
            console.log("Pay My Bill Api",data.data);
            this.props.setPrepaidBilling(data.data);
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
                    <View style={[styles.flexQuarterToOne, styles.marginVertical, styles.paddingHorizontal24]}>
                        <View style={[styles.row, styles.marginVertical2,]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                                {`${strings[language].current} `}
                            </Text>
                            <Text style={[styles.darkGreen, styles.medium]}>
                                {strings[language].billing}
                            </Text>
                        </View>
                        <View style={[]} >
                            <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                                {strings[language].payMyBillContent}
                            </Text>
                        </View>
                    </View>
                    <View style={[ darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.padding14, styles.elevate2, styles.marginHorizontal24, styles.extraMarginVertical]}>
                        <View style={[styles.row, styles.marginVertical4, styles.paddingHorizontal10, styles.spaceBetween]}>
                            <View style={[styles.row]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                                    {`${strings[language].balance}  `}
                                </Text>
                                <Text style={[styles.darkGreen, styles.medium]}>
                                    {strings[language].utilization}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.allCenter, styles.flexOne, styles.paddingVertical16]}>
                            <AnimatedCircularProgress
                                size={120}
                                width={12}
                                fill={this.state.balance.percent ? this.state.balance.percent: null}
                                tintColor={Colors.darkGreen}
                                backgroundColor={darkMode ? "#ffffff26" : "#00000026"}
                                padding={0}
                                rotation={0}
                                lineCap={'round'}
                                duration={2000}
                                childrenContainerStyle={[{borderRadius:20}]}
                            >
                                {
                                    (fill) => (
                                    <Text style={[darkMode ? styles.white : styles.black, styles.regularPlus, styles.selfCenter, styles.marginLeft8]}>
                                        { Math.round(fill)} {'%'}
                                    </Text>
                                    )
                                }
                            </AnimatedCircularProgress>
                        </View>
                        <View style={[styles.row, styles.paddingHorizontal24]}>
                            <View style={[styles.flexOne]}>
                                <Text style={[styles.normal, darkMode ? styles.white : styles.black]}>
                                    {strings[language].amount}
                                </Text>
                                <Text style={[styles.darkGreen, styles.medium, styles.right ]}>
                                    {this.state.balance.amount}
                                </Text>
                                <Text style={[ styles.fontSize13, styles.right, darkMode ? styles.white : styles.black, styles.opacity50perc]}>
                                   INR
                                </Text>
                            </View>
                            <View style={[styles.row, styles.paddingHorizontal16]}>
                                <View style={[{borderLeftWidth:1.5} ,darkMode ? { borderColor: Colors.white } : { borderColor: Colors.black }, styles.opacity50perc]}>

                                </View>
                            </View>
                            <View style={[styles.flexOne,  styles.justifyContentFlexStart]}>
                                <View style={[  ]}>
                                    <Text style={[styles.normal, darkMode ? styles.white : styles.black]}>
                                        {strings[language].consumption}
                                    </Text>
                                    <Text style={[styles.darkGreen, styles.right, styles.medium]}>
                                        {this.state.balance.units}
                                    </Text>
                                    <Text style={[ styles.fontSize13, styles.right, darkMode ? styles.white : styles.black, styles.opacity50perc]}>
                                        Units
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.marginHorizontal20, styles.marginVertical14, styles.paddingHorizontal30, styles.paddingVertical10, styles.bgDarkGreen, styles.radius32, styles.selfCenter]}>
                        <Text style={[styles.white, styles.regularPlus]}>
                            {strings[language].clickHereToTopUp}
                        </Text>
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
        prepaidBilling: commonSelectors.prepaidBilling(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        setPrepaidBilling: (data={}) => dispatch(userDetailActions.setPrepaidBilling(data)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const PrepaidBillingScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(PrepaidBilling);
export {PrepaidBillingScreen}
