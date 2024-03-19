import React from 'react';
import { Text, View, Dimensions, Platform, Pressable, TextInput, ActivityIndicator, Alert, FlatList } from 'react-native';
import { connect } from "react-redux";
// Styles and Colors
import { styles } from "../../styles/styles"
import Colors from '../../styles/Colors';
import { userDetailActions, apiDispatcher } from "../../actions";
import * as commonSelectors from "../../selectors/common";
import { strings } from "../../strings";
import MIcons from 'react-native-vector-icons/MaterialIcons';
import ModalSelector from 'react-native-modal-selector';


const options = ['Connection', 'Disconnection', 'Load Extension', 'Meter check'];


class SendRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // type: [],
            text: "",
            // sendRequest: true,
            selectedOption: '',
            loader: false
        };
        console.log("Props Live", this.props);
    }

    async componentDidMount(): void {

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'SendRequest') {
                    this.props.setCurrentRoute('SendRequest');
                }
            }
        );
        this.props.setCurrentRoute('SendRequest');
        this.props.navigation.setOptions({ headerRight: () => null });
        this.props.navigation.setOptions({
            headerLeft: () => (
                <Pressable style={[styles.row, styles.allCenter, styles.paddingHorizontal24]} onPress={() => this.props.navigation.goBack()}>
                    <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25} />
                    <Text style={[this.props.darkMode ? styles.white : styles.black, styles.selfCenter, styles.fontSize15, styles.paddingHorizontal6]}>
                        {strings[this.props.language].back}
                    </Text>
                </Pressable>
            ),
        });

    }

    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {

    }



    sendRequest = async () => {
        try {

            const baseRechargeDetailsUrl = 'https://cportalgasapi.esyasoft.com/api/consumer/Request';

            const token = await this.props.token;
            const consumerNo = this.props?.userDetails?.consumerId;
            const requestData = this.state.text;
            const requestDataType = this.state.selectedOption;
            ;


            const headers = new Headers({
                Accept: 'application/json, text/plain, */*',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            });

            const requestBody = JSON.stringify({
                ConsumerNo: consumerNo,
                Request: requestData,
                RequestType: requestDataType
            });

            console.log("requestBodySendRequest", requestBody);
            console.log("NorequestBodySendRequest");

            const response = await fetch(baseRechargeDetailsUrl, {
                method: 'POST',
                headers: headers,
                body: requestBody,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text(); // If not JSON, get response as text
            }

            console.log('sendRequest:', response.status, data);

            if (response.status === 200) {
                this.setState({
                    text: "",
                    selectedOption: '',
                    loader: false
                })
                Alert.alert("SUCCESS", "Your request has been submitted successfully",
                    [
                        {
                            text: "Okay",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                    ]
                )
            } else {
                this.setState({
                    text: "",
                    selectedOption: '',
                    loader: false
                })
                Alert.alert(
                    "Error",
                    "Something went wrong. Please try again.",
                    [
                        {
                            text: "Okay",
                            onPress: () => console.log("Okay Pressed"),
                            style: "cancel"
                        },
                    ]
                );
            }


        } catch (e) {
            this.setState({
                text: "",
                selectedOption: '',
                loader: false
            })

            console.log("sendRequestErrorr ", e);
            Alert.alert(
                "Error",
                "Something went wrong. Please try again.",
                [
                    {
                        text: "Okay",
                        onPress: () => console.log("Okay Pressed"),
                        style: "cancel"
                    },
                ]
            );
        }
    }

    render() {

        const { language, darkMode } = this.props;
        const { selectedOption, loader } = this.state;

  console.log("selectedOption",selectedOption);
        return (
            <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal24]}>
                <View style={[styles.row, styles.spaceBetween]}>
                    <View style={[styles.row]}>
                        <Text style={[darkMode ? styles.white : styles.black, styles.medium22]}>
                            {"Send"}
                        </Text>
                        <Text style={[styles.green, styles.medium22]}>
                            {" Request"}
                        </Text>
                    </View>
                </View>

                <Text style={[darkMode ? styles.white : styles.black, styles.marginVertical4, styles.fontSize17]}>Request Type</Text>
                    <ModalSelector
                        data={options.map((option, index) => ({ key: index, label: option, value: option }))}
                        initValue={this.state.selectedOption} // Change here
                        onChange={(option) => this.setState({ selectedOption: option.value })}
                        cancelText="Cancel"
                        supportedOrientations={['portrait']}
                        animationType="slide"
                        backdropPressToClose={true}
                    >
                        <View style={[{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10, paddingHorizontal: 5 }]}>
                            <TextInput
                                style={[{ height: 50, width: '100%' }, darkMode ? styles.white : styles.black]} // Text color
                                editable={false}
                                placeholder="Select Type"
                                placeholderTextColor={darkMode ? styles.white.color : styles.black.color} // Placeholder color
                                value={this.state.selectedOption} // Updated here
                                />
                        </View>
                    </ModalSelector>


                <View style={[styles.marginTop10, styles.flexOne, { zIndex: 2 }]}>
                    <View style={[styles.marginVertical12, styles.flexOne]}>
                        <Text style={[darkMode ? styles.white : styles.black, styles.marginVertical4, styles.fontSize17]}>Reason</Text>
                        <TextInput
                            style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.padding16, darkMode ? styles.white : styles.black, styles.fontSize17, styles.flexPoint33, { textAlignVertical: "top", borderWidth: 1, borderColor: '#ccc', borderRadius: 5, }]}
                            multiline={true}
                            onChangeText={(info) => { this.setState({ text: info }) }}
                            value={this.state.text}
                        // maxLength={200}
                        />
                        <View style={[styles.allCenter]}>
                            <Pressable onPress={() => this.sendRequest()} style={[this.state.text != "" ? styles.bgGreen : styles.bgDarkGray, styles.allCenter, styles.radius20, styles.marginVertical10]}>
                                {loader ? (
                                    <View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal20]}>
                                        <Text style={[styles.white, styles.regularPlus]}>Loading</Text>
                                        <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]} />
                                    </View>) : <Text style={[styles.white, styles.medium, styles.paddingVertical, styles.paddingHorizontal30]}>
                                    {strings[language].history.submit}
                                </Text>}
                            </Pressable>
                        </View>

                    </View>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        language: commonSelectors.language(state),
        darkMode: commonSelectors.darkMode(state),
        userDetails: commonSelectors.userDetails(state),
        request: commonSelectors.request(state),
        requestType: commonSelectors.requestType(state),
        currentRoute: commonSelectors.currentRoute(state),
        token: commonSelectors.getToken(state),
    }
}
function mapDispatchToProps(dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        setCurrentRoute: (data = {}) => dispatch(userDetailActions.setCurrentRoute(data)),

    }
}
const SendRequestScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SendRequest);
export { SendRequestScreen }
