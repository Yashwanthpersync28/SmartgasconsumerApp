import React from 'react';
import { connect } from "react-redux";
import {Text, View, StatusBar, Pressable, ScrollView, Dimensions, FlatList, RefreshControl} from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Components
import DataNotFound from 'SmartgasConsumerApp/js/components/common/workInProgress/DataNotFound';
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'
import EventsComponent from 'SmartgasConsumerApp/js/screens/myPrograms/components/Events'
// Language
import {strings} from "SmartgasConsumerApp/js/strings";
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import * as dashboard from "../../api/dashboard";
import {apiDispatcher, userDetailActions} from "../../actions";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

const {height, width} = Dimensions.get('window');

class MyPrograms extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            index: 1,
       
        }
    }
    
    async componentDidMount(): void {
        this.syncData()

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'MyPrograms') {
                    this.props.setCurrentRoute('MyPrograms');
                    this.syncData()
                }
            }
        );
    }

    syncData = async () => {
        try {
            console.log("SYNC")
            let data = await this.props.apiDispatcher(dashboard.myProgramsApi())
            console.log("My Programs API",data.data);
            if(data.status == 200){
                this.props.setMyPrograms(data.data);
            }
            else if(data.status == 204){
                this.setState({ noData: true })
            }
        } catch (e) {
            this.setState({refreshing: false})
        }
    }
    onRefresh = () => {
        this.setState({refreshing: true});
        this.syncData()

    };

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.myPrograms !== prevProps.myPrograms){
            let data =this.props.myPrograms ? JSON.parse(JSON.stringify(this.props.myPrograms)) : [];
            console.log('DID update',data, this.props.myPrograms)

            this.setState({
                past: data.past,
                upcoming: data.upcoming,
                refreshing: false
            }, ()=>console.log('My Program States',this.state))
        }

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    renderItem = ({item, index}) => {
        return (
           
            <Pressable onPress={()=>  this.props.navigation.navigate(`/DRProgram/MyProgram/${this.state.index == 0 ? 'PastEvents' : 'UpcomingEvents'}`,{id: item.id, eventName: item.eventName, description: item.description, type: 'noInterest'})} style={[]}>
                <EventsComponent eventName={item.eventName}  savings= {item.savings} date={item.date} darkMode={this.props.darkMode} language={this.props.language}/>
            </Pressable>
        );
    }

    render(){
        const {language, darkMode} = this.props;
     

        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal16]} >
                { this.props.darkMode ?  <StatusBar backgroundColor={Colors.black} barStyle='light-content'  /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'  />}
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.sunglowYellow}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh} />
                    }
                    showsVerticalScrollIndicator={false}
                >
                    {this.state.noData ?
                        <View style={[ styles.paddingTop12Percent, styles.allCenter, styles.flexOne]}>
                            <DataNotFound darkMode={darkMode}/> 
                        </View>
                    :
                    <>
                        <View style={[ styles.paddingHorizontal]}>
                            <View style={[ styles.row, styles.marginVertical]}>
                                <Text style={[darkMode ? styles.white : styles.black,  styles.medium]}>
                                    {`${strings[language].myPrograms.myPrograms}  `}
                                </Text>
                                <Text style={[styles.green,  styles.medium]}>
                                    {strings[language].myPrograms.plmdr}
                                </Text>
                            </View>
                            <View style={[]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                                    {strings[language].myPrograms.headerContext}
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.row, styles.marginHorizontal10, styles.marginVertical, styles.marginTop18, styles.radius8, {backgroundColor:darkMode ? "#ffffff26" : "#00000026"}]}>
                            <Pressable onPress={()=> this.setState({ index: 0 })} style={[styles.flexOne, this.state.index == 0 ? styles.bgGreen : null, styles.padding6, styles.radius8, styles.allCenter]}>
                                <Text style={[darkMode ? styles.white : this.state.index == 0 ? styles.white : styles.black, styles.fontSize15]}>
                                    {strings[language].myPrograms.pastEvents}
                                </Text>
                            </Pressable>
                            <Pressable onPress={()=> this.setState({ index: 1 })} style={[styles.flexOne, this.state.index == 1 ? styles.bgGreen : null, styles.padding6, styles.radius8, styles.allCenter]}>
                                <Text style={[darkMode ? styles.white : this.state.index == 1 ? styles.white : styles.black, styles.fontSize15]}>
                                    {strings[language].myPrograms.upcomingEvents}
                                </Text>
                            </Pressable>
                        </View>
                        {this.state.past ? 
                        <>
                            {this.state.index == 0 ? 
                                <FlatList
                                    style={[styles.flexOne]}
                                    data={this.state.past}
                                    renderItem={this.renderItem}
                                    numColumns={1}
                                    initialNumToRender={10}
                                    ref={ref => this.listView = ref}
                                    keyExtractor={(item, index) => item.id + index}
                                /> :  
                                <FlatList
                                    style={[styles.flexOne]}
                                    data={this.state.upcoming}
                                    renderItem={this.renderItem}
                                    numColumns={1}
                                    initialNumToRender={10}
                                    ref={ref => this.listView = ref}
                                    keyExtractor={(item, index) => item.id + index}
                                /> 
                            }
                        </>
                        :   <View style={[{marginTop: height/5}]}>
                                <LoaderComponent />
                            </View>
                        }
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
        myPrograms: commonSelectors.myPrograms(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        setMyPrograms: (data={}) => dispatch(userDetailActions.setMyPrograms(data)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const MyProgramsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyPrograms);
export {MyProgramsScreen}
