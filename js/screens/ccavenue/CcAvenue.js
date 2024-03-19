import React from 'react';
import { Text, View, Dimensions, Platform, ScrollView, TextInput, FlatList, TouchableOpacity, RefreshControl, Pressable, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
// Styles and Colors
import { styles } from "../../styles/styles"
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Actions
import { userDetailActions, apiDispatcher } from "SmartgasConsumerApp/js/actions";
import { showLogout } from "SmartgasConsumerApp/js/actions/commonActions";

// Libraries
import DeviceInfo from "react-native-device-info";
import { RSA } from 'react-native-rsa-native';
import moment from "moment"

// Components

// Constants
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { strings } from "SmartgasConsumerApp/js/strings";
import * as dashboard from "../../api/dashboard";
import { setLiveData, setRsa } from '../../actions/userDetailsActions';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
import { BodyText1 } from '../../components/common';
import RazorpayCheckout from 'react-native-razorpay';
// import RazorpayCheckout from 'razorpay';
// import {Configure} from 'node-ccavenue'

class CcAvenue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            liveData: [],
            amount: "",
            ipAddress: '',
            paymentHistory: [],
            message: "",
            showRechargeHistory: true,
            loader: false,
            loading: true

        };
        console.log("Props-Live", this.state);

    }

    async componentDidMount(): void {

        await DeviceInfo.getIpAddress().then((ip) => {
            console.log("IP Address", ip);
            this.setState({ ipAddress: ip })
        });

        this.paymentHistory()
        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'CcAvenue') {
                    this.props.setCurrentRoute('CcAvenue');
                    // this.syncData()
                }

                if (this.props.currentRoute == 'WebView') {
                    this.setState({ amount: "" })
                    this.paymentHistory()
                    // this.props.setCurrentRoute('CcAvenue');
                    // this.syncData()
                }


            }
        );
        this.props.setCurrentRoute('CcAvenue');

    }

    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props.overview !== prevProps.overview) {
            let data = this.props.overview ? JSON.parse(JSON.stringify(this.props.overview)) : [];
        }

        if (this.props.activeCount !== prevProps.activeCount) {
            // this.syncData();
        }
    }

    encrypt = (key, text) => {
        console.log("asdfsdf", text, key);
        RSA.encrypt(text, key)
            .then(encodedMessage => {
                console.log(`RSA Encoded String ${encodedMessage}`);
                this.props.navigation.navigate('WebViewScreen', { key: encodedMessage })
            });
    }
    createOrder = async (amount) => {
        function padNumber(num) {
            return num.toString().padStart(2, "0");
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // Get the current date and time
        const currentDate = new Date();

        // Format the date and time to create a timestamp
        const timestamp =
            currentDate.getFullYear() +
            padNumber(currentDate.getMonth() + 1) +
            padNumber(currentDate.getDate()) +
            "_" +
            padNumber(currentDate.getHours()) +
            padNumber(currentDate.getMinutes()) +
            padNumber(currentDate.getSeconds());
        console.log(typeof amount, "tyepamount");
        var raw = JSON.stringify({
            "amount": parseFloat(amount) * 100,
            "currency": "INR",
            "receipt": `Receipt_${timestamp}${this.props.userDetails.consumerId.slice(-4)}`,
            "notes": {
                "notes_key_1": "Tea, Earl Grey, Hot",
                "notes_key_2": "Tea, Earl Grey… decaf."
            }
        });
        console.log(amount, raw, `${amount}`, 'rawamount')
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            const response = await fetch("https://cportalgasapi.esyasoft.com/api/Consumer/Payment/Order", requestOptions);
            const result = await response.json();
            console.log(result, 'result1');
            return result;
        } catch (error) {
            console.error('Error:', error);
            // Handle the error or throw it again if needed
            throw error;
        }

    }
    initPayment = async (amount, emailID, consumerName, orderId) => {

        var options = {
            key: 'rzp_test_kDzekKAUDtWnN6',
            amount: amount,
            currency: 'INR',
            name: 'smartgas',
            order_id: orderId,
            prefill: {
                email: `${emailID}`,
                name: `${consumerName}`
            }
        }
        console.log('test12345', options, orderId);
        RazorpayCheckout.open(options).then((data) => {
            console.log('razorpay success data', data);
            alert(`Success: ${data.razorpay_payment_id}`);
            dashboard.paymentDetailsPostApi(this.props.userDetails.consumerId, data.razorpay_payment_id, this.props.userDetails.jwtToken)
        }).catch((e) => {
            console.log('razorpay failure data', e);
            // alert(`Erooor: ${e.code} | ${e.description}`)
        });
    }
    // recharge = async () => {
    //     function padNumber(num) {
    //         return num.toString().padStart(2, "0");
    //     }
    //     // Get the current date and time
    //     const currentDate = new Date();

    //     // Format the date and time to create a timestamp
    //     const timestamp =
    //         currentDate.getFullYear() +
    //         padNumber(currentDate.getMonth() + 1) +
    //         padNumber(currentDate.getDate()) +
    //         "_" +
    //         padNumber(currentDate.getHours()) +
    //         padNumber(currentDate.getMinutes()) +
    //         padNumber(currentDate.getSeconds());
    //     // this.createOrder(this.state.amount)

    //     const data = await dashboard.createOrderIdApi(this.props.userDetails.jwtToken, this.state.amount, this.props.userDetails.consumerId, timestamp);

    //     console.log('dataawait', data)
    //     if (data.orderId) {
    //         console.log(data.orderId, 'orderId');
    //         this.initPayment(parseFloat(this.state.amount) * 100, this.props.userDetails.emailID, this.props.userDetails.name, data["orderId"]);
    //     }

    //     // .then((result)=> {
    //     //     const orderId =typeof result;
    //     //     console.log(result,'kafkdsjfalk',parseFloat(this.state.amount)*100,result["orderId"],orderId);
    //     // this.initPayment(parseFloat(this.state.amount)*100,this.props.userDetails.emailID,this.props.userDetails.name,result["orderId"]);
    //     // })
    //     // .catch(e=>console.log(e,'slkjfsa'))

    // }
    recharge = async () => {
        // Set loading state to true when initiating payment
        this.setState({ loader: true });

        function padNumber(num) {
            return num.toString().padStart(2, "0");
        }
        // Get the current date and time
        const currentDate = new Date();

        // Format the date and time to create a timestamp
        const timestamp =
            currentDate.getFullYear() +
            padNumber(currentDate.getMonth() + 1) +
            padNumber(currentDate.getDate()) +
            "_" +
            padNumber(currentDate.getHours()) +
            padNumber(currentDate.getMinutes()) +
            padNumber(currentDate.getSeconds());
        // Call createOrderIdApi to get the order ID
        try {
            const data = await dashboard.createOrderIdApi(
                this.props.userDetails.jwtToken,
                this.state.amount,
                this.props.userDetails.consumerId,
                timestamp
            );

            if (data.orderId) {
                // Initiate payment with obtained order ID
                this.initPayment(
                    parseFloat(this.state.amount) * 100,
                    this.props.userDetails.emailID,
                    this.props.userDetails.name,
                    data["orderId"]
                );
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            // Handle error here if necessary
        } finally {
            // Set loading state to false when payment process is complete
            this.setState({ loader: false });
        }
    };




    paymentHistory = async () => {
        console.log("innn")
        this.setState({ loading: true })
        try {
            let resp = await this.props.apiDispatcher(dashboard.paymentHistoryApi())
            console.log("Payment History Response", resp.data.data);
            if (resp.status == 200) {
                this.setState({ paymentHistory: resp.data.data })
                this.setState({ loading: false })
            } else {
                this.setState({ message: "Record not found" })
                this.setState({ loading: false })
            }
        } catch (e) {
            this.setState({ loading: false })
        }
    }

    onRefresh = async () => {
        this.setState({ refreshing: true });
        await this.paymentHistory()
        this.setState({ refreshing: false });
    };

    render() {




        const { language, darkMode, navigation } = this.props;
        const { height, width } = Dimensions.get('window')

        const Details = ({ header, detail }) => {
            return (
                <View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal10]}>
                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize15, styles.flexOne, styles.marginVertical]}>{header}</Text>
                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17, styles.flexOne, styles.marginVertical]}>{detail}</Text>
                </View>
            );
        }

        const paymentHistoryListHeaderComponent = () => {
            return (
                <View style={[darkMode ? styles.bgLightGray : styles.bgWhite]}>
                    <View style={[styles.row, styles.marginBottom14]}>
                        <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                            Payment
                        </Text>
                        <Text style={[styles.green, styles.fontSize17]}>
                            {" History"}
                        </Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={[styles.flexPoint33, styles.fontSize15, darkMode ? styles.white : styles.black]}>
                            SL No
                        </Text>
                        <Text style={[styles.flexOne, styles.fontSize15, darkMode ? styles.white : styles.black]}>
                            Payment Date
                        </Text>
                        <Text style={[styles.flexOne, styles.fontSize15, darkMode ? styles.white : styles.black]}>
                            Transaction ID
                        </Text>
                        <Text style={[styles.flexOne, styles.fontSize15, darkMode ? styles.white : styles.black]}>
                            Amount
                        </Text>
                        <Text style={[styles.flexOne, styles.fontSize15, darkMode ? styles.white : styles.black]}>
                            Status
                        </Text>
                        <Text style={[styles.flexQuarterToOne, styles.fontSize15, darkMode ? styles.white : styles.black]}>
                            Payment Method
                        </Text>
                    </View>
                </View>

            )
        }

        const renderItem = ({ item, index }) => {
            console.log("item------>", item);
            return (
                <View style={[styles.row]}>
                    <Text style={[styles.flexPoint33, styles.small, { left: 10 }, styles.paddingTop16, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
                        {index + 1}
                    </Text>
                    <Text style={[styles.flexOne, styles.small, styles.paddingTop16, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
                        {moment(item["Transaction Time"]).format('YYYY-MM-DD HH:mm:ss')}
                    </Text>
                    <Text style={[styles.flexOne, styles.small, styles.paddingTop16, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
                        {item["Transaction ID"]}
                    </Text>
                    <Text style={[{ paddingLeft: 20 }, styles.flexOne, styles.small, styles.paddingTop16, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
                        {item["Recharge Amount"]}
                    </Text>
                    <Text style={[styles.flexOne, styles.small, styles.paddingTop16, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
                        {item["Status"]}
                    </Text>
                    <Text style={[styles.flexQuarterToOne, styles.small, styles.paddingTop16, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
                        {item["Payment Method"]}
                    </Text>
                </View>
            )
        }


        // const balanceListHeaderComponent = () => {
        //     return (
        //         <View style={[darkMode ? styles.bgLightGray : styles.bgWhite]}>
        //             <View style={[styles.row, styles.marginBottom14]}>
        //                 <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
        //                     Balance
        //                 </Text>
        //                 <Text style={[styles.green, styles.fontSize17]}>
        //                     {" History"}
        //                 </Text>
        //             </View>
        //             <View style={[styles.row]}>
        //                 <Text style={[styles.flexPoint33, styles.fontSize15, darkMode ? styles.white : styles.black]}>
        //                     SL No
        //                 </Text>
        //                 <Text style={[styles.flexOne, styles.fontSize15, darkMode ? styles.white : styles.black]}>
        //                     Energy usage
        //                 </Text>
        //                 <Text style={[styles.flexOne, styles.fontSize15, darkMode ? styles.white : styles.black]}>
        //                     Available Balance
        //                 </Text>
        //                 <Text style={[styles.flexOne, styles.fontSize15, darkMode ? styles.white : styles.black]}>
        //                     Recharge History
        //                 </Text>
        //                 <Text style={[styles.flexOne, styles.fontSize15, darkMode ? styles.white : styles.black]}>
        //                     Cumulative consumption of billing period
        //                 </Text>


        //             </View>
        //             <Text style={[styles.flexQuarterToOne, styles.fontSize15, darkMode ? styles.white : styles.black, styles.marginTop32, styles.textCenter]}>
        //                 No Data Found
        //             </Text>
        //         </View>

        //     )
        // }
        const { loader, loading } = this.state;

        return (


            <ErrorBoundaryMainComponent>
                <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader]} >

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.sunglowYellow}
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
                        style={[styles.flexOne]}
                    >
                        <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader]}>
                            <View style={[styles.row, styles.paddingHorizontal24]}>
                                {/* <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                                CCAvenu
                            </Text> */}
                                <Text style={[styles.green, styles.fontSize17]}>
                                    {" Payment"}
                                </Text>
                            </View>
                            <View style={[styles.marginTop24, styles.paddingHorizontal24]}>
                                <Details header={"Consumer ID"} detail={this.props.userDetails.consumerId} />
                                <Details header={"Email"} detail={this.props.userDetails.emailID} />
                                {/* <Details header={"Mobile number"} detail={this.props.userDetails.mobilenumber}/> */}
                                {/* <Details header={"Order ID"} detail={this.props.rsa.order_id}/> */}
                            </View>
                            <View style={[styles.marginHorizontal24, styles.extraMargin, styles.radius20, darkMode ? styles.bgLightGray : styles.bgWhite, styles.padding32, styles.allCenter]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.fontSize15]}>Amount</Text>
                                <View style={[styles.row, { borderColor: Colors.green, borderBottomWidth: 0.7 }]}>
                                    <TextInput
                                        style={[styles.medium, styles.flexOne, darkMode ? styles.white : styles.black, styles.paddingRegular]}
                                        value={this.state.amount}
                                        keyboardType={'numeric'}
                                        onChangeText={text => {
                                            const amount = parseFloat(text);
                                            if (isNaN(amount)) {
                                                // Not a valid number, reset the state
                                                this.setState({ amount: '', error: 'Please enter a valid amount' });
                                            } else if (amount < 100 || amount > 200) {
                                                // Amount is not within the valid range
                                                this.setState({ amount: text, error: 'Recharge amount must be between 100 and 200 Rs' });
                                            } else {
                                                // Valid amount, update the state
                                                this.setState({ amount: text, error: '' });
                                            }
                                        }}
                                    />

                                </View>
                                <BodyText1 style={[styles.paddingVertical, styles.paleRed, styles.textCenter]}>
                                    {this.state.error}
                                </BodyText1>
                                <TouchableOpacity
                                    disabled={(this.state.amount < 100 || this.state.amount >200) ? true : false}
                                    onPress={() => this.recharge()}
                                    style={[styles.paddingRegular, styles.paddingHorizontal20, styles.radius20, styles.bgGreen, styles.elevatePlus, (this.state.amount < 100 || this.state.amount >200) ? styles.opacity25perc : null]}>
                                    {/* <Text style={[styles.white, styles.fontSize19, styles.centerVertical, styles.textAlignVertical]}>Pay</Text> */}
                                    {loader ? (
                                        <View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal20]}>
                                            <Text style={[styles.white, styles.regularPlus]}>Loading</Text>
                                            <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]} />
                                        </View>) : (
                                        <Text style={[styles.white, styles.fontSize19, styles.centerVertical, styles.textAlignVertical]}>Pay</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                            {this.state.message == "" ?
                                <View>
                                    <View style={[styles.row, styles.spaceBetween, styles.marginHorizontal24, styles.marginBottom14]}>
                                        {/* <Pressable onPress={() => this.setState({ showRechargeHistory: true })} style={[styles.paddingRegular, styles.paddingHorizontal20, true ? [styles.bgGreen, styles.elevatePlus] : null, styles.radius20,]}>
                                    <Text style={[true ? darkMode ? styles.black : styles.white : darkMode ? styles.white : styles.black, true ? styles.fontSize17 : styles.fontSize15]}>
                                        Recharge History
                                    </Text>
                                </Pressable> */}
                                        {/* <Pressable onPress={() => this.setState({ showRechargeHistory: false })} style={[styles.paddingRegular, styles.paddingHorizontal20, true ? [styles.bgGreen, styles.elevatePlus] : null, styles.radius20,]}>
                                    <Text style={[true ? darkMode ? styles.black : styles.white : darkMode ? styles.white : styles.black, true ? styles.fontSize17 : styles.fontSize15]}>
                                        Balance
                                    </Text>
                                </Pressable> */}
                                    </View>
                                    <ScrollView contentContainerStyle={[{ width: width * 2.2 }, styles.marginHorizontal24, styles.marginBottom5Percent,]} horizontal>
                                        {/* {console.log("mmmmmmmmmmmmmmmmmm", this.state.showRechargeHistory)} */}
                                        {/* {this.state.showRechargeHistory ? <FlatList
                                        showsVerticalScrollIndicator={false}
                                        // style={[styles.flexOne,{height:width/1.82}]}
                                        data={this.state.paymentHistory}
                                        renderItem={renderItem}
                                        style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, { marginRight: 48 }]}
                                        contentContainerStyle={[{ padding: 20 }]}
                                        ListHeaderComponent={paymentHistoryListHeaderComponent}
                                    // initialNumToRender={10}
                                    // stickyHeaderIndices={[0]}
                                    /> :
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            // style={[styles.flexOne,{height:width/1.82}]}
                                            data={[]}
                                            // renderItem={renderItem}
                                            style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, { marginRight: 48 }]}
                                            contentContainerStyle={[{ padding: 20 }]}
                                            ListHeaderComponent={balanceListHeaderComponent}
                                            initialNumToRender={10}
                                            stickyHeaderIndices={[0]}
                                        />


                                    } */}
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            // style={[styles.flexOne,{height:width/1.82}]}
                                            data={this.state.paymentHistory}
                                            renderItem={renderItem}
                                            style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, { marginRight: 48 }]}
                                            contentContainerStyle={[{ padding: 20 }]}
                                            ListHeaderComponent={paymentHistoryListHeaderComponent}
                                        // initialNumToRender={10}
                                        // stickyHeaderIndices={[0]}
                                        />
                                    </ScrollView>
                                </View>

                                : null
                                // <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.flexOne, styles.allCenter, {margin: 24}, styles.radius16]}>
                                //     {this.state.loading ? <LoaderComponent/> : <Text style={[styles.paleRed]}>{this.state.message}</Text>}
                                // </View>
                            }
                        </View>
                    </ScrollView>
                </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps(state) {
    return {
        language: commonSelectors.language(state),
        darkMode: commonSelectors.darkMode(state),
        userDetails: commonSelectors.userDetails(state),
        rsa: commonSelectors.rsa(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}
function mapDispatchToProps(dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state = false) => dispatch(logout(state)),
        showLogout: (state = true) => dispatch(showLogout(state)),
        setCurrentRoute: (data = {}) => dispatch(userDetailActions.setCurrentRoute(data)),
        setRsa: (data = {}) => dispatch(userDetailActions.setRsa(data)),
    }
}
const CcAvenueScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(CcAvenue);
export { CcAvenueScreen }