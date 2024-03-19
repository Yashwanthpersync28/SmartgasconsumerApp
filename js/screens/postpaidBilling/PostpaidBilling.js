import React from 'react';
import { connect } from "react-redux";
import {Text, View, ScrollView, RefreshControl, StatusBar, Pressable, Dimensions, Linking} from 'react-native';
import { styles } from '../../styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Component
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'
// Icons
// Libraries
// Backend
import * as authKey  from "../../api/authKeyApi";
import {strings} from "SmartgasConsumerApp/js/strings";
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import {apiDispatcher, userDetailActions} from "../../actions";
import { fetchPayhistoryApi, getOutStandingApi } from '../../api/billing';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';



const { height, width } = Dimensions.get('window');

class PostpaidBilling extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           
        }
    }

    openURL(url){
        Linking.openURL(url)
    }

    async componentDidMount(): void {
        this.syncData()
        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'postpaidBilling') {
                    this.props.setCurrentRoute('postpaidBilling');
                    this.syncData()
                }
            }
        );
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.postpaidBilling !== prevProps.postpaidBilling){
            this.setState({loading: false})

            let data =this.props.postpaidBilling ? JSON.parse(JSON.stringify(this.props.postpaidBilling)) : [];

            this.setState({
                refreshing: false,
                billDate: data.bill_DATE,
                dueDate: data.due_DATE,
                billAmount: data.net_BILL,
                billNo: data.bill_NO,
                consumption: data.unib,
                loading: true
                }, ()=> console.log("Postpaid Balance State",this.state)
            )
        }

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    syncData = async () => {
        try{
            const resp = await this.props.apiDispatcher(getOutStandingApi())
            console.log("Postpaid Billing Fetch Pay History Screen Response", resp);
            if(resp.status == 400) {
                alert(resp.data)
            } else {
                this.props.setPostpaidBilling(resp.data);
            }
        } 
        catch(e){
            console.log("Postpaid Billing Fetch Pay History Screen Error",e);
        }
    
        console.log("Fetch BIlling API Screen", );
        // try {
        //     let data = await this.props.apiDispatcher(authKey.smartMeterPostpaidBillingApi(this.props.userDetails.HashCode));
        //     console.log("Postpaid Billing API Response",data);
        //     if(data.data.length == 0){
        //         this.setState({error: "Postpaid Billing unavailable to the User. Please login with different ID"})
        //         console.log("Prepaid User Only");
        //     }
        //     else{
        //         this.props.setPostpaidBilling(data.data);
        //         this.setState({ error: "" })
        //     }
        // } catch (e) {
        //     this.setState({refreshing: false})
        // }
    }
    onRefresh = () => {
        this.setState({refreshing: true});
        this.syncData()
    };

    render(){
        const {language, darkMode} = this.props;
        const {billAmount, billDate, billNo, dueDate, consumption} = this.state;
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
                            {`${strings[language].postpaidBalance.postpaid}  `} 
                        </Text>
                        <Text style={[styles.darkGreen, styles.medium]}>
                            {strings[language].postpaidBalance.balance}
                        </Text>
                    </View>
                    <View style={[]} >
                        <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                            {strings[language].postpaidBalance.headerContext}
                        </Text>
                    </View>
                </View>

                {this.state.loading ?
                    <>
                        {this.state.error ?  
                            <View style={[styles.paddingTop6Percent, styles.paddingHorizontal20]}>
                                <Text style={[styles.paleRed, styles.textCenter, styles.regular, styles.lineHeight24]}>
                                    {this.state.error}
                                </Text> 
                            </View> :
                            <> 
                                <View style={[ darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius18, styles.padding14, styles.marginHorizontal20, styles.marginVertical10]}>
                                    <View style={[styles.padding10]}>
                                        <View style={[styles.row, styles.spaceBetween]}>
                                            <View style={[styles.flexOne]}>
                                                <View>
                                                    <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                                                        {strings[language].postpaidBalance.amount}
                                                    </Text>
                                                </View>
                                                <View style={[styles.row, styles.flexEndHorizontal]}>
                                                    <Text style={[styles.green, styles.medium, styles.paddingRight10]}>
                                                        {billAmount}
                                                    </Text>
                                                    <Text style={[darkMode ? styles.white : styles.black, styles.opacity25perc, styles.normal]}>
                                                        INR
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={[ styles.flexOne,{borderLeftWidth:2,}, darkMode ? { borderColor: "#ffffff26" }  : {borderColor: "#00000026"}]}>
                                                <View>
                                                    <View style={[styles.paddingLeft20]}>
                                                        <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                                                            {strings[language].postpaidBalance.consumption}
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.row, styles.flexEndHorizontal, styles.right]}>
                                                        <Text style={[styles.green, styles.medium]}>
                                                            {consumption}
                                                        </Text>
                                                        <Text style={[darkMode ? styles.white : styles.black, styles.opacity25perc, styles.small, styles.marginLeft10]}>
                                                            {strings[language].postpaidBalance.units}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[ darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius20, styles.padding24, styles.Margin20]}>
                                    <View>
                                        <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                                            {strings[language].postpaidBalance.billNumber}
                                        </Text>
                                        <Text style={[styles.green, styles.paddingTop2, styles.regularPlus]}>
                                            {billNo}
                                        </Text>
                                        <View style={[{borderBottomWidth: 1}, darkMode ? {borderColor: '#ffffff26'} : {borderColor: "#00000026"}, styles.marginVertical10]}/>
                                    </View>
                                    <View>
                                        <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                                            {strings[language].postpaidBalance.ca} {strings[language].postpaidBalance.number}
                                        </Text>
                                        <Text style={[styles.green, styles.paddingTop2, styles.regularPlus]}>
                                            {this.props.profile.loginID}
                                        </Text>
                                        <View style={[{borderBottomWidth: 1}, darkMode ? {borderColor: '#ffffff26'} : {borderColor: "#00000026"}, styles.marginVertical10]}/>
                                    </View>
                                    <View>
                                        <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                                            {strings[language].postpaidBalance.billGenerationDate}
                                        </Text>
                                        <Text style={[styles.green, styles.paddingTop2, styles.regularPlus]}>
                                            {billDate}
                                        </Text>
                                        <View style={[{borderBottomWidth: 1}, darkMode ? {borderColor: '#ffffff26'} : {borderColor: "#00000026"}, styles.marginVertical10]}/>
                                    </View>
                                    <View>
                                        <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                                            {strings[language].postpaidBalance.billPaybyDate}
                                        </Text>
                                        <Text style={[styles.green, styles.paddingTop2, styles.regularPlus]}>
                                            {dueDate}
                                        </Text>
                                    </View>
                                
                                </View>
                                <Pressable onPress={()=> this.openURL('https://www.apdcl.org/website/PayBill')} style={[styles.paddingHorizontal20, styles.paddingVertical12, styles.radius20, styles.selfCenter, styles.bgDarkGreen, styles.marginVertical10]}>
                                    <Text style={[styles.regular, styles.white]}>
                                        {strings[language].postpaidBalance.clickHereToPay}
                                    </Text>
                                </Pressable>
                            </> 
                        }
                    </>
                    : 
                    <View style={[{marginTop: height/3}]}>
                        <LoaderComponent />
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
        language: commonSelectors.language(state),
        activeCount: commonSelectors.activeCount(state),
        darkMode: commonSelectors.darkMode(state),
        postpaidBilling: commonSelectors.postpaidBilling(state),
        currentRoute: commonSelectors.currentRoute(state),
        profile: commonSelectors.profile(state),
        userDetails: commonSelectors.userDetails(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        setPostpaidBilling: (data={}) => dispatch(userDetailActions.setPostpaidBilling(data)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const PostpaidBillingScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostpaidBilling);
export {PostpaidBillingScreen}
