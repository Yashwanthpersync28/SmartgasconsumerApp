import React from "react";
import {View, TouchableOpacity, Image} from "react-native";
import {connect} from "react-redux";

import {styles} from "SmartgasConsumerApp/js/styles"
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import * as loginActions from "SmartgasConsumerApp/js/actions";
import {BodyText1, ButtonText, HeaderComponent, HeadingText1} from "../../components/common";
import {logout} from "../../actions";
import {VerifyMobileScreen} from "./VerifyMobile";
import {icons} from "../../constants/imageConstants";
import { ErrorBoundaryMainComponent } from "../../components/errorBoundary/ErrorBoundaryComponent";

class Account extends React.Component{
    constructor (props) {
        super (props);
    }
    componentDidMount(): void {
    }

    navigateToPasswordChange = () => {
        this.props.navigation.navigate("ResetPassword")

    }

    navigateToVerifyMobile = () => {
        this.props.navigation.navigate("VerifyMobile")

    }

    render() {
        return (
            <>
            <ErrorBoundaryMainComponent>
                    <HeaderComponent
                        title={"Account"}
                        goBack={this.props.navigation.toggleDrawer}
                        image={icons.menu}
                    />
            {/*<View style={[styles.flexTwo, styles.height,styles.width, styles.paddingHorizontal24, styles.allCenter]}>*/}

                        {/*<Image style={{width: 200, height: 200, borderRadius: 100}} source={{uri: this.props.userDetails.image.image}}/>*/}

                {/*<View style={[styles.allCenter, styles.paddingHorizontal24, styles.width, styles.paddingVertical10]}>*/}
                    {/*<HeadingText1>*/}
                        {/*{this.props.userDetails.fname + " " + this.props.userDetails.mname + " " + this.props.userDetails.lname}*/}
                    {/*</HeadingText1>*/}
                    {/*<BodyText1>*/}
                        {/*{this.props.userDetails.email }*/}
                    {/*</BodyText1>*/}

                {/*</View>*/}
            {/*</View>*/}

                <View style={[styles.flexOne]}>

                { (this.props.userDetails.mobileverified === "false" || this.props.userDetails.emailverified === "false" ) ?
                    <View
                        style={[styles.flexOne, styles.height, styles.width, styles.row, styles.paddingHorizontal24]}>
                        <TouchableOpacity
                            style={[styles.loginButton]}
                            onPress={this.navigateToVerifyMobile}
                        >
                            <ButtonText style={[styles.white]}>
                                Very {this.props.userDetails.mobileverified === "false" ? "Phone Number" : "Email"}
                            </ButtonText>
                        </TouchableOpacity>
                    </View> : null
                }
                <View style={[styles.flexOne, styles.height,styles.width, styles.row, styles.paddingHorizontal24]}>
                    <TouchableOpacity
                        style={[styles.loginButton]}
                        onPress={this.navigateToPasswordChange}
                    >
                        <ButtonText style={[styles.white]}>
                            Change Password
                        </ButtonText>
                    </TouchableOpacity>
                </View>

                {/*<View style={[styles.flexOne, styles.height,styles.width,styles.bgTint5DeepGreyBlue, styles.row, styles.paddingHorizontal24]}>*/}
                    {/*<TouchableOpacity*/}
                        {/*style={[styles.loginButton]}*/}
                        {/*onPress={this.props.logout}*/}
                    {/*>*/}
                        {/*<ButtonText style={[styles.white]}>*/}
                            {/*Logout*/}
                        {/*</ButtonText>*/}
                    {/*</TouchableOpacity>*/}
                {/*</View>*/}
                </View>
                </ErrorBoundaryMainComponent>
            </>
        );
    }
}

function mapStateToProps (state) {
    return {
        token: commonSelectors.getToken(state),
        userDetails: commonSelectors.userDetails(state)

    }
}

function mapDispatchToProps (dispatch) {
    return {
        logout: (state=false) => dispatch(logout(state)),

    }
}

const AccountScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);
export {AccountScreen};

