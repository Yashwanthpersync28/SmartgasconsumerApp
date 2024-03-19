import React from 'react';
import { connect } from "react-redux";
import {Text, View} from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
// Libraries
import LottieView from 'lottie-react-native';
import { WORK_IN_PROGRESS } from 'SmartgasConsumerApp/js/constants/lottie';
// Component
import WorkInProgressComponent from '../../components/common/workInProgress/WorkInProgress'
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

class PrepaidRechargeHistory extends React.Component{
    render(){
        const {language, darkMode} = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[styles.flexOne, darkMode ? styles.bgBlack : styles.bgIdk]}>
                <WorkInProgressComponent/>
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
    }
}
function mapDispatchToProps (dispatch) {
    return {
    }
}
const PrepaidRechargeHistoryScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(PrepaidRechargeHistory);
export {PrepaidRechargeHistoryScreen}
