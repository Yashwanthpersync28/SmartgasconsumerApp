import React from 'react';
import { Text, View, Dimensions, Platform, RefreshControl } from 'react-native';
import { connect } from "react-redux";
// Styles and Colors
import { styles } from "../../styles/styles"
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Actions
import {userDetailActions, apiDispatcher} from "SmartgasConsumerApp/js/actions";
import { showLogout } from "SmartgasConsumerApp/js/actions/commonActions";
// Libraries
// Components
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'

// Constants
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { strings } from "SmartgasConsumerApp/js/strings";
import * as dashboard from "../../api/dashboard";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { liveData, setLiveData } from '../../actions/userDetailsActions';
import moment from "moment"
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
class LiveData extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            liveData: []
        };
        console.log("Props Live",this.props);
    }

    async componentDidMount(): void {

        this.syncData()
        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'LiveData') {
                    this.props.setCurrentRoute('LiveData');
                    this.syncData()
                }
            }
        );
        this.props.setCurrentRoute('LiveData');

    }

    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        console.log(prevProps,prevState,'sumitDashboard1234')

        if(this.props.liveData !== prevProps.liveData) {
            let data = this.props.liveData ? JSON.parse(JSON.stringify(this.props.liveData)) : [];
            if(this.props.liveData){
                try {
                    this.setState({
                        liveData: data,
                        refreshing: false,
                    })
                } catch(e){
                    alert(`${e}\n${this.state?.liveData}\nliveDAta\n${this.props.liveData}`)
                    console.log(e);
                }
            } else {
                this.syncData();
                this.setState({refreshing: false});
            }
            this.setState({refreshing: false});
        }
        
        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
            this.setState({refreshing: false});
        }
        if(!this.props.liveData){
            this.syncData();
            this.setState({refreshing: false});
        }
    }

    syncData = async () => {
        console.log("live----->")
        try {
            // await setInterval(6000);
            let liveData = await this.props.apiDispatcher(dashboard.liveDataApi())
            this.props.setLiveData(liveData.data)
            setLiveData(liveData.data)
            this.setState({
                refreshing: false,
                liveData: liveData.data,
            });
            
            console.log("LD---->", liveData.data.data);
        } catch (e) {
            alert(`${e}\n${this.state?.liveData}\nliveDAta\n${this.props.liveData}`)
            this.setState({refreshing: false});
        }
        this.setState({refreshing: false});
    }
    onRefresh = () => {
        this.setState({refreshing: true});
        this.syncData()
    };
   
    render(){

        const { language, darkMode } = this.props;
        const { height, width } = Dimensions.get('window')
        console.log("asdffasdf", this.props);

        const TextValue = ({name, style}) => {
            return(
                <Text style={[,styles.extraSmall, styles.flexOne, styles.paddingTop16, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc, style]}>
                    {name}
                </Text>
            )
        }

        const HeaderText = ({name, style}) => {
            return(
                <Text style={[styles.flexOne, darkMode ? styles.white : styles.black, styles.fontSize13, style]}>
                    {name}
                </Text>
            )
        }

        const Header = ({headname}) => {
            return(
                <View style={[styles.row]}>
                    {/* <HeaderText name={"Mtr Sl No"}/> */}
                    {/* <HeaderText style={[styles.marginHorizontal]} name={"Reading Date Time"}/> */}
                    {/* <HeaderText name={"Voltage"}/> */}
                    {/* <HeaderText name={"Current"}/> */}
                    {/* <HeaderText name={"kW"}/> */}
                    {/* <HeaderText name={"kWh"}/> */}
                    {/* <HeaderText name={"Freq"}/>
                    <HeaderText name={"pf"}/> */}
                    {/* <HeaderText name={"kvah"}/> */}
                    {/* <HeaderText name={"mdkw"}/> */}
                    {/* <HeaderText name={"kWh Export"}/> */}
                    {/* <HeaderText name={"kvAh Export"}/> */}
                    {headname&&Object.keys(headname).map((item)=>{
                        return <HeaderText
                         style={item !== "rtc" ? "":[styles.marginHorizontal]} 
                         name={item }
                         />

                    })}
                </View>
            )
        }

        const renderItem = ({item, index}) => {
            console.log("Idfa2fasdf", item);
            // const { meterSerialNo, meterReadingTime, voltage, current, kw, kWh, frequency, pf, kvAh, mdkw, kWhExport, kvAhExport } = item
            return(
                
                <View style={[styles.row]}>
                    {/* <TextValue name={meterSerialNo}/> */}
                    {/* <TextValue style={[styles.marginHorizontal]} name={`${moment(meterReadingTime).format("DD/MM/YY")}  ${moment(meterReadingTime).format('HH:mm:ss')}`}/> */}
                    {/* <TextValue name={voltage}/> */}
                    {/* <TextValue name={current}/> */}
                    {/* <TextValue name={kw}/> */}
                    {/* <TextValue name={kWh}/> */}
                    {/* <TextValue name={frequency}/>
                    <TextValue name={pf}/> */}
                    {/* <TextValue name={kvAh}/> */}
                    {/* <TextValue name={mdkw}/> */}
                    {/* <TextValue name={kWhExport}/> */}
                    {/* <TextValue name={kvAhExport}/> */}
                    
                    {Object.keys(item)?.map((headKey)=>{
                        console.log("livedatarender",item[`${headKey}`],headKey !== "rtc"? item[`${headKey}`] :`${moment(item.headkey).format("DD/MM/YY")}  ${moment(item.headkey).format('hh:mm:ss')}`);
                        return <TextValue
                         style={headKey !== "rtc" ? null:[styles.marginHorizontal]} 
                         name={
                            // headKey !== "rtc"?
                          item[`${headKey}`]
                        //   :
                        //  `${moment(item.headkey).format("DD/MM/YY")}  ${moment(item.headkey).format('hh:MM:ss')}`
                        }
                         />

                    })}
                </View>
            )
        }

        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal24]}>
                    <View style={[styles.row]}>
                        <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                            Live 
                        </Text>
                        <Text style={[styles.green, styles.fontSize17]}>
                            {" Data"}
                        </Text>
                    </View>
                    <View style={[styles.flexOne, {justifyContent: 'flex-start', alignItems: 'center' }]}>
                        <View style={[{width: height/0.8, height: width, transform: [ { rotate: '90deg' }], paddingLeft: Platform.OS == "ios" ? height/2.5 : height/2.6 }]}>
                            <View style={[styles.flexOne, styles.extraMargin, styles.radius20, darkMode ? styles.bgLightGray : styles.bgWhite, styles.padding20]}>
                                {/* <HeaderText name={'00000000'}/> */}
                                <Header headname={this.props?.liveData[0]}/>
                                <View style={[{borderBottomWidth: 0.7}, styles.opacity25perc, styles.paddingTop, darkMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                                {console.log("sumit12341",this.props?.liveData,this.props)}
                <ScrollView showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.sunglowYellow}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh} />
                    }
                >
                                <FlatList
                                    // horizontal
                                    data={this.state?.liveData}
                                    renderItem={renderItem}
                                />
                </ScrollView>
                            </View>
                        </View>
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
        liveData: commonSelectors.liveData(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        showLogout: (state=true) => dispatch(showLogout(state)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
        setLiveData: (data={}) => dispatch(userDetailActions.setLiveData(data)),
    }
}
const LiveDataScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(LiveData);
export {LiveDataScreen}
