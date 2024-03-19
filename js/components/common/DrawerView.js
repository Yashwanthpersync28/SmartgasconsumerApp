import {Image, ScrollView, View} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import {styles} from "../../styles";
import {BodyText1, ButtonText, HeadingText1} from "./texts";
import React from "react";
import * as commonSelectors from "../../selectors/common";
import {apiDispatcher, logout} from "../../actions";
import {connect} from "react-redux";

class CustomDrawer extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return (
                    <View style={[styles.flexTwo, styles.height,styles.width,styles.bgTint5DeepGreyBlue, styles.paddingHorizontal24, styles.allCenter]}>
                        <View style={[{width: 200, height: 200, }, styles.allCenter]}>
                            <Image style={{width: 120, height: 120, borderRadius: 60, borderColor: "white", borderWidth: 2, overflow: "hidden"}} source={{uri: this.props.userDetails.image.image}}/>
                        </View>
                        <View style={[styles.allCenter, styles.paddingHorizontal24, styles.width, styles.paddingVertical24]}>
                            <HeadingText1>
                                {this.props.userDetails.fname + " " + this.props.userDetails.mname + " " + this.props.userDetails.lname}
                            </HeadingText1>

                        </View>
                    </View>
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
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),


    }
}

const DrawerView = connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomDrawer);
export {DrawerView};

