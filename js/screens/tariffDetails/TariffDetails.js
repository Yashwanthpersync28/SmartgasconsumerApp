import React from 'react';
import { Text, View, Dimensions, Platform } from 'react-native';
import { connect } from "react-redux";
import { styles } from "../../styles/styles"
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import {userDetailActions, apiDispatcher} from "SmartgasConsumerApp/js/actions";
import { showLogout } from "SmartgasConsumerApp/js/actions/commonActions";
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { strings } from "SmartgasConsumerApp/js/strings";
import * as dashboard from "../../api/dashboard";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { setTariffDetails } from '../../actions/userDetailsActions';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

class TariffDetails extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            tariffDetails: []
        };
        console.log("Props Live",this.props);
    }

    async componentDidMount(): void {

        this.syncData()
        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'TariffDetails') {
                    this.props.setCurrentRoute('TariffDetails');
                    this.syncData()
                }
            }
        );
        this.props.setCurrentRoute('TariffDetails');

    }

    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.overview !== prevProps.overview) {
            let data = this.props.overview ? JSON.parse(JSON.stringify(this.props.overview)) : [];
        }

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    syncData = async () => {
        try {
            // await setInterval(6000);
            let tariffDetails = await this.props.apiDispatcher(dashboard.tariffDetailsApi())
            this.props.setTariffDetails(tariffDetails.data)
            this.setState({tariffDetails:tariffDetails.data})
            setTariffDetails(tariffDetails.data)
            console.log("Tariff Detailsss", tariffDetails);
        } catch (e) {
            console.log("Tariff ERROR",e);
        }
    }
    onRefresh = () => {
        this.setState({refreshing: true});
        this.syncData()
    };

    
    render(){
        
        const { language, darkMode } = this.props;
        const { height, width } = Dimensions.get('window')
        console.log("Props in Tariff", this.props);
        
        
        const TextValue = ({name, style}) => {
            return(
                <Text style={[styles.flexOne, styles.paddingVertical6, this.props.darkMode ? styles.white : styles.black, style]}>
                    {name}
                </Text>
            )
        }

        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal24]}>
                <View style={[styles.row]}>
                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                        Tariff 
                    </Text>
                    <Text style={[styles.green, styles.fontSize17]}>
                        {" Details"}
                    </Text>
                </View>
                <View style={[styles.flexOne,]}>
                    <FlatList
                    data={this.props.tariffDetails}
                    renderItem={(item,index)=>
                    {
                        console.log("Render item",item);
                        return (<View style={[styles.marginVertical14, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius20,styles.padding20 ]}>
                            <TextValue name={item.item.component}/>
                                <View style={[{borderBottomWidth: 0.7}, styles.opacity25perc, styles.paddingTop,styles.marginBottom8, darkMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                            <View style={[styles.row,styles.spaceBetween]}>
                                <View style={[styles.flexOne]}>
                                    <TextValue name={"Slab 1 Rate:"}/>
                                    <TextValue name={"Slab 1 Units:"}/>
                                    <TextValue name={"Slab 2 Rate:"}/>
                                    <TextValue name={"Slab 2 Units:"}/>
                                    <TextValue name={"Slab 3 Rate:"}/>
                                    <TextValue name={"Slab 3 Units:"}/>
                                    <TextValue name={"Slab 4 Rate:"}/>
                                    <TextValue name={"Slab 4 Units:"}/>
                                    <TextValue name={"Slab 5 Rate:"}/>
                                    <TextValue name={"Slab 5 Units:"}/>
                                    <TextValue name={"Tariff Code:"}/>
                                    <TextValue name={"Tariff Name:"}/>

                                </View>
                                <View style={[styles.flexOne]}>
                                    <TextValue name={item.item.slaB_1_Rate}/>
                                    <TextValue name={item.item.slaB_1_Units}/>
                                    <TextValue name={item.item.slaB_2_Rate}/>
                                    <TextValue name={item.item.slaB_2_Units}/>
                                    <TextValue name={item.item.slaB_3_Rate}/>
                                    <TextValue name={item.item.slaB_3_Units}/>
                                    <TextValue name={item.item.slaB_4_Rate}/>
                                    <TextValue name={item.item.slaB_4_Units}/>
                                    <TextValue name={item.item.slaB_5_Rate}/>
                                    <TextValue name={item.item.slaB_5_Units}/>
                                    <TextValue name={item.item.tariffCode}/>
                                    <TextValue name={item.item.tariffName}/>
                                </View>
                            </View>
                            </View>)
                    }}
                    />
                </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps (state) {
    return {
        language: commonSelectors.language(state),
        darkMode: commonSelectors.darkMode(state),
        userDetails: commonSelectors.userDetails(state),
        tariffDetails: commonSelectors.tariffDetails(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        showLogout: (state=true) => dispatch(showLogout(state)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
        setTariffDetails: (data={}) => dispatch(userDetailActions.setTariffDetails(data)),
    }
}
const TariffDetailsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(TariffDetails);
export {TariffDetailsScreen}
