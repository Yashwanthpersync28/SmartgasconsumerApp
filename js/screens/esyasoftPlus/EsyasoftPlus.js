import React from 'react';
import { connect } from "react-redux";

import {Text, View} from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import * as commonSelectors from "../../selectors/common";
import {apiDispatcher, userDetailActions} from "../../actions";
import {chartDataWithoutDate} from "../../helpers/common/chartDataHelper";
import * as dashboard from "../../api/dashboard";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

class HPSEBPlus extends React.Component{
    constructor(props) {
        super(props);
        this.done = false;
        this.state={
            index: 0,
            info: 1
        };
    }

    async componentDidMount(): void {
        this.syncData()

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'Dashboard') {
                    this.props.setCurrentRoute('Dashboard');
                }
            }
        );
        this.props.setCurrentRoute('Dashboard');

        // this.backHandler = BackHandler.addEventListener(
        //     "hardwareBackPress",
        //     this.backAction
        // );
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.overview !== prevProps.overview) {
            let data = this.props.overview ? JSON.parse(JSON.stringify(this.props.overview)) : [];
            console.log(data, this.props.overview)
            if (this.props.overview.consumedToday) {
                this.setState({
                    consumedToday: data.consumedToday.consumed,
                    forecast: data.forecast,
                    consumedPercentToday: data.consumedToday.percentConsumed,
                    month: chartDataWithoutDate(data.barGraph.month),
                    today: chartDataWithoutDate(data.barGraph.today),
                    week: chartDataWithoutDate(data.barGraph.week),
                    refreshing: false
                }, () => console.log(this.state))
            }
        }

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    syncData = async () => {
        try {
            let data = await this.props.apiDispatcher(dashboard.overviewApi())
            console.log("Dashb",data.data);
            this.props.setOverview(data.data);
        } catch (e) {
            this.setState({refreshing: false})
        }
    }
    onRefresh = () => {
        this.setState({refreshing: true});
        this.syncData()

    };

    render(){
        const { language, darkMode } = this.props;

        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTop72]} >
                <Text style={styles.green}>
                    More
                </Text>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps (state) {
    return {
        activeCount: commonSelectors.activeCount(state),
        language: commonSelectors.language(state),
        darkMode: commonSelectors.darkMode(state),
        userDetails: commonSelectors.userDetails(state),
        overview: commonSelectors.overview(state),
        currentRoute: commonSelectors.currentRoute(state),
        infoShown: commonSelectors.infoShown(state),


    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        setOverview: (data={}) => dispatch(userDetailActions.setOverview(data)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
        setInfoShown: (data={}) => dispatch(userDetailActions.setInfoShown(data)),
    }
}
const HPSEBPlusScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(HPSEBPlus);
export {HPSEBPlusScreen}

