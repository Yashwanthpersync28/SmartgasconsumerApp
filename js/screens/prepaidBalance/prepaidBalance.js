import React from 'react';
import { connect } from "react-redux";
import {Text, View, ScrollView, RefreshControl, TouchableOpacity, StatusBar, Pressable, Dimensions, FlatList, Linking} from 'react-native';
import { styles } from '../../styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Component
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader';
import PrepaidHistoryComponent from './components/PrepaidHistoryComponent';
// Icons
import FIcons from 'react-native-vector-icons/Feather';
// Libraries
import { AnimatedCircularProgress,  } from 'react-native-circular-progress';
// Backend
import * as authKey  from "../../api/authKeyApi";
import {strings} from "SmartgasConsumerApp/js/strings";
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import {apiDispatcher, userDetailActions} from "../../actions";
import moment from "moment";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

const {height, width} = Dimensions.get('window');

class PrepaidBalance extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            balance: {},
            index:0
        }
    }

    renderItem = ({item, index}) => {
        const {language, darkMode} = this.props;

        return (
            <View>
                <PrepaidHistoryComponent amount={item.paid_amount} date={item.payment_date} language={language} darkMode={darkMode}/>
            </View>
        );
    }

    openURL(url){
        Linking.openURL(url)
    }

    async componentDidMount(): void {

        console.log('User Details',this.props.userDetails.HashCode);
        this.syncData()

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'prepaidBalance') {
                    this.props.setCurrentRoute('prepaidBalance');
                    this.syncData()
                }
            }
        );
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.prepaidBalance !== prevProps.prepaidBalance){
            let data =this.props.prepaidBalance ? JSON.parse(JSON.stringify(this.props.prepaidBalance)) : [];
            console.log("After Update",data)
            this.setState({ refreshing: false,balance: data.BillDetails.balance, amount: JSON.stringify(data.BillDetails.balance),  paymentHistory: data.PaymentHistory}, ()=> console.log("Prepaid Balance State",this.state)
            )
        }

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    syncData = async () => {
        try {
            this.setState({ loading: true })
            let data = await this.props.apiDispatcher(authKey.smartMeterBillDetailsApi(this.props.userDetails.HashCode));
            let data1 = await this.props.apiDispatcher(authKey.smartMeterPaymentHistoryApi(this.props.userDetails.HashCode));
            let newData= {
                "BillDetails": data.data,
                "PaymentHistory": data1.data
            }
            this.props.setPrepaidBalance(newData);
            this.setState({error: '', loading: false})
        } catch (e) {
            console.log('Preparid Billing', e.data == "Secret Key Doesnot matches");
            this.setState({refreshing: false, error: e.data == "Secret Key Doesnot matches" && "Prepaid Billing unavailable to the User. Please login with different ID"})
        }
    }
    onRefresh = () => {
        this.setState({refreshing: true});
        this.syncData()
    };

    render(){
        const {language, darkMode} = this.props;
        // const balance = 301;
        const { balance, amount} = this.state;
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
                {this.state.loading && !this.state.error ?
                    <View style={[{marginTop: height/3}]}>
                        <LoaderComponent />
                    </View>
                    :
                <> 
                <View style={[styles.flexQuarterToOne, styles.marginVertical, styles.paddingHorizontal24]}>
                    <View style={[styles.row, styles.marginVertical2,]}>
                        <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                            {`${strings[language].prepaidBalance.prepaid}  `} 
                        </Text>
                        <Text style={[styles.darkGreen, styles.medium]}>
                            {strings[language].prepaidBalance.balance}
                        </Text>
                    </View>
                    <View style={[]} >
                        <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                            {strings[language].prepaidBalance.headerContext}
                        </Text>
                    </View>
                </View>
                {this.state.error ?  
                  <View style={[styles.paddingTop6Percent, styles.paddingHorizontal20]}>
                    <Text style={[styles.paleRed, styles.textCenter, styles.regular, styles.lineHeight24]}>
                        {this.state.error}
                    </Text> 
                </View> :
                <> 
                    <View style={[styles.row, styles.flexOne, styles.marginHorizontal20, styles.radius8, styles.marginVertical14, darkMode ? { backgroundColor:"#ffffff16"} : {backgroundColor: "#00000016"}]}>
                        <Pressable onPress={()=> this.setState({ index: 0 })} style={[styles.flexOne, this.state.index == 0 ? styles.bgGreen : null, styles.padding6, styles.radius10, styles.allCenter]}>
                            <Text style={[(!darkMode && this.state.index == 1) ? styles.black : styles.white, styles.regular]}>
                                {strings[language].prepaidBalance.balance}
                            </Text>
                        </Pressable>
                        <Pressable onPress={()=> this.setState({ index: 1 })} style={[styles.flexOne, this.state.index == 1 ? styles.bgGreen : null, styles.padding6, styles.radius10, styles.allCenter]}>
                            <Text style={[(!darkMode && this.state.index == 0) ? styles.black : styles.white, styles.regular]}>
                                {strings[language].prepaidBalance.history}
                            </Text>
                        </Pressable>
                    </View>
                    {this.state.index == 0 ?
                        <View style={[ darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.padding14, styles.Margin20]}>
                            <View style={[styles.row, styles.spaceBetween, styles.paddingHorizontal20, styles.paddingVertical10]}>
                                <View style={[styles.row]}>
                                    <Text style={[styles.white, styles.fontSize17]}>
                                        {strings[language].prepaidBalance.current}
                                    </Text>
                                    <Text style={[styles.green, styles.fontSize17]}>
                                        {`  ${strings[language].prepaidBalance.balance}`}
                                    </Text>
                                </View>
                                <View style={[styles.flexEndHorizontal]}>
                                    <FIcons name={'zap'} size={22} color={Colors.darkGreen}/>
                                </View>
                            </View>
                            <View style={[styles.allCenter, styles.flexOne]}>
                                <AnimatedCircularProgress
                                    size={width/2.7}
                                    width={width/50}
                                    // fill={this.props.payMyBill.monthlyComparision.unitStatus.substring(1)}
                                    fill={balance < 500 ? (balance)/5 : balance >= 500 && balance <= 2500 ? balance/25 : balance > 2500 && balance/50}
                                    tintColor={balance < 500 ? Colors.paleRed : balance >= 500 && balance <= 2500 ? Colors.paleRed : balance > 2500 && Colors.green }
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
                                            <View style={[styles.allCenter]}>
                                                {balance < 500 &&
                                                    <>
                                                        <Text style={[styles.paleRed, styles.small, {top:-20}]}>
                                                            {strings[language].prepaidBalance.low}
                                                        </Text>
                                                        <Text style={[styles.paleRed, styles.small, {top:-20}]}>
                                                            {strings[language].prepaidBalance.balance}
                                                        </Text>
                                                    </>
                                                }
                                                {balance >= 500 && balance <= 2500 &&
                                                    <>
                                                        <Text style={[styles.paleRed, styles.small, {top:-20}]}>
                                                            {strings[language].prepaidBalance.medium}
                                                        </Text>
                                                        <Text style={[styles.paleRed, styles.small, {top:-20}]}>
                                                            {strings[language].prepaidBalance.balance}
                                                        </Text>
                                                    </>
                                                }
                                                {balance > 2500 &&
                                                    <>
                                                        <Text style={[styles.green, styles.small, {top:-20}]}>
                                                            {strings[language].prepaidBalance.high}
                                                        </Text>
                                                        <Text style={[styles.green, styles.small, {top:-20}]}>
                                                            {strings[language].prepaidBalance.balance}
                                                        </Text>
                                                    </>
                                                }
                                            </View>
                                        )
                                    }
                                </AnimatedCircularProgress>
                            </View>
                            <View style={[styles.padding20]}>
                                <View style={[styles.row, styles.spaceBetween]}>
                                    <View style={[styles.flexOne]}>
                                        <View>
                                            <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                                                {strings[language].prepaidBalance.amount}
                                            </Text>
                                        </View>
                                        <View style={[styles.row, styles.flexEndHorizontal]}>
                                            <Text style={[styles.darkGreen, styles.medium, styles.paddingRight10]}>
                                                {amount}
                                            </Text>
                                            <Text style={[darkMode ? styles.white : styles.black, styles.opacity25perc, styles.normal]}>
                                                INR
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[ styles.flexOne, styles.flexEndHorizontal,{borderLeftWidth:2,}, darkMode ? { borderColor: "#ffffff26" }  : {borderColor: "#00000026"}]}>
                                        <View>
                                            <View style={[]}>
                                                <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                                                    {strings[language].prepaidBalance.date}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={[styles.darkGreen, styles.medium]}>
                                                    {/* {moment(new Date()).format('DD/MM/YYYY')} */}
                                                    {moment(new Date()).format('YYYY-MM-DD')}
                                                
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            
                        </View>:
                        <View style={[]}>
                            <FlatList
                                style={[styles.flexOne,styles.paddingVertical10]}
                                data={this.state.paymentHistory}
                                renderItem={this.renderItem}
                                numColumns={1}
                                initialNumToRender={10}
                                ref={ref => this.listView = ref}
                                keyExtractor={(item, index) => item.id + index}
                            />
                        </View>
                    }
                    <Pressable onPress={()=> this.openURL('https://www.apdcl.org/website/RechargePrepaid')} style={[styles.paddingHorizontal20, styles.paddingVertical12, styles.radius20, styles.selfCenter, styles.bgDarkGreen, styles.marginVertical10]}>
                        <Text style={[styles.regular, styles.white]}>
                            {strings[language].prepaidBalance.button}
                        </Text>
                    </Pressable>
                </>}
                </>}
            </ScrollView>
        </View>
        </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps (state) {
    return {
        language: commonSelectors.language(state),
        activeCount: commonSelectors.activeCount(state),
        darkMode: commonSelectors.darkMode(state),
        prepaidBalance: commonSelectors.prepaidBalance(state),
        currentRoute: commonSelectors.currentRoute(state),
        userDetails: commonSelectors.userDetails(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        setPrepaidBalance: (data={}) => dispatch(userDetailActions.setPrepaidBalance(data)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const PrepaidBalanceScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(PrepaidBalance);
export {PrepaidBalanceScreen}
