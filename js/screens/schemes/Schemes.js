import React from 'react';
import { connect } from "react-redux";
import { Text, View, TextInput, FlatList, ScrollView, Dimensions, Linking, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
// STYLES
import { styles } from '../../styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// ICONS
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcons from 'react-native-vector-icons/Ionicons';
// COMPONENTS
import DataNotFound from 'SmartgasConsumerApp/js/components/common/workInProgress/DataNotFound';
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'
import SchemesComponent from './components/schemesComponent';
// BACKEND
import * as dashboard from "../../api/dashboard";
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { strings } from "SmartgasConsumerApp/js/strings";
import {apiDispatcher, userDetailActions} from "../../actions";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';


const { height, width } = Dimensions.get('window');

class Schemes extends React.Component{
    constructor(props) {
        super(props);
         this.state = {
            schemesResponse:[],
            response:[]
         };
    }

    async componentDidMount(): void {
        this.syncData();
        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'Schemes') {
                    this.props.setCurrentRoute('Schemes');
                    this.syncData()
                }
            }
        );

    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    syncData = async () => {
        try {
            this.setState({ loading: true })
            let schemesResponse = await this.props.apiDispatcher(dashboard.SchemesApi(this.props.language == 'english' ? 1 : 2 ))
            if(schemesResponse.status == 200){
                console.log('Schemes Response',schemesResponse)
                this.setState({response: schemesResponse.data, billing: schemesResponse.data.billingSchemes, energySaving: schemesResponse.data.energySavingScheme  })
                // console.log('Scheme state', this.state.response.category[0])
                this.setState({ billingCategory: this.state.response.category[0], energySavingCategory: this.state.response.category[1], refreshing: false})    
            }else if(data.status == 212){
                this.setState({ noData: true })
            }
            else if(data.status == 204){
                this.setState({ noData: true })
            }
            this.setState({ loading: false })
        } catch (e) {
            this.setState({refreshing: false, loading: false})
        }
    }

    search = () => {
        // Billing Filter
        let billing = this.state.response.billingSchemes.filter( data => (data.title).toLowerCase().includes(this.state.search.toLowerCase()));
        let billingFiltered = this.state.response.billingSchemes.filter( data => (data.title).startsWith(this.state.search, 0));
        billing = billing.filter(x => !billingFiltered.some(y => y.title === x.title));
        // console.log('General Filter',billing);
        let billingtotal = [...billingFiltered,...billing];
        this.setState({billing: billingtotal});
        // EnergySaving Filter
        let energySaving = this.state.response.energySavingScheme.filter( data => (data.title).toLowerCase().includes(this.state.search.toLowerCase()));
        let energySavingFiltered = this.state.response.energySavingScheme.filter( data => (data.title).startsWith(this.state.search, 0));
        energySaving = energySaving.filter(x => !energySavingFiltered.some(y => y.title === x.title));
        // console.log('General Filter',energySaving);
        let energySavingtotal = [...energySavingFiltered,...energySaving];
        this.setState({energySaving: energySavingtotal});
       
    }

    renderItem = ({item, index}) => {
        // console.log('Item',item);
        const {language, darkMode} = this.props;
        return (
            <TouchableOpacity onPress={()=> this.openURL(item.link)} style={[styles.flexOne, { width: width/2.32, marginRight: 12, marginBottom: 12 }]}>
                <SchemesComponent title={item.title} type={item.type} description={item.description} darkMode={darkMode}/>
           </TouchableOpacity>
        );
    }

    openURL(url){
        Linking.openURL(url)
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.syncData()
    };
   
    render(){

        const {language, darkMode} = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader]}>
                <ScrollView showsVerticalScrollIndicator={false}
                     refreshControl={
                        <RefreshControl
                            tintColor={Colors.sunglowYellow}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh} />
                    }
                >
                    {this.state.loading && !this.state.billing ?
                        <View style={[{marginTop: height/3}]}>
                            <LoaderComponent />
                        </View>
                        :
                    <> 
                        {this.state.noData ?
                            <View style={[ styles.paddingTop12Percent, styles.allCenter, styles.flexOne]}>
                                <DataNotFound darkMode={darkMode}/> 
                            </View>
                        :
                        <>
                            <View style={[styles.row, styles.selfCenter, {borderColor:'white'}]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.fontSize23]}>
                                    {/* {strings[language].schemes.More} */}
                                    {strings[language].schemes.apdcl}
                                </Text>
                                <Text style={[styles.green, styles.fontSize23]}>
                                    {` ${strings[language].schemes.schemes}`}
                                </Text>
                            </View>
                            <View style={[styles.row, styles.centerHorizontal, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius32, styles.marginVertical10, styles.marginTop18, styles.elevate2, styles.marginHorizontal4, styles.marginHorizontal36]}>
                                <View style={[styles.paddingLeft16, styles.paddingHorizontal4]}>
                                    <IIcons name="ios-search-outline" color={this.props.darkMode ? Colors.white : Colors.black} size={20}/>
                                </View>
                                <View style={[styles.flexOne]}>
                                    <TextInput
                                        placeholder={strings[language].schemes.search}
                                        placeholderTextColor = {darkMode ? Colors.white : Colors.black}
                                        style={[styles.normal, darkMode ? styles.white : styles.black, styles.paddingVertical16]}
                                        onChangeText={search=>{
                                            this.setState({search: search}, ()=> this.search())
                                        }}
                                    />
                                </View>
                            
                            </View>
                            <View style={[styles.allCenter, styles.paddingHorizontal36, styles.marginHorizontal20]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.extraSmall, styles.textCenter]}>
                                    {strings[language].schemes.headerContext}
                                </Text>
                            </View>
                            <View>
                                <View style={[styles.row, styles.paddingVertical20, styles.marginHorizontal20, styles.centerHorizontal]}>
                                    <MCIcons name='lightning-bolt' size={30} color={Colors.green}/>
                                    <Text style={[styles.green, styles.regularPlus, styles.paddingHorizontal4]}>
                                        {this.state.billingCategory}
                                    </Text>
                                </View>
                                {/* {this.state.billing ? <> */}
                                    <FlatList 
                                        showsVerticalScrollIndicator={false}
                                        nestedScrollEnabled = {true}
                                        contentContainerStyle={[{ flex:1, marginLeft:20, marginRight:8}]}
                                        data={this.state.billing}
                                        renderItem={this.renderItem}
                                        numColumns={2}
                                        initialNumToRender={10}
                                        ref={ref => this.listView = ref}
                                        keyExtractor={(item, index) => item.title + index}
                                    />
                                    {   
                                        this.state.billing == '' ?
                                        <Text style={[styles.paleRed, styles.selfCenter, {top:10}, styles.regular]}>
                                            {strings[language].schemes.noDataFound}
                                        </Text>
                                        : null
                                    }
                                {/* </> :   
                                    <LoaderComponent/>
                                <ActivityIndicator size={Platform.OS == "android" ? 30 : 'large'} color={Colors.darkGreen} />
                            } */}

                            </View>

                            <View>
                                <View style={[styles.row, styles.paddingVertical20, styles.marginHorizontal20, styles.centerHorizontal]}>
                                    <MCIcons name='lightning-bolt' size={30} color={Colors.green}/>
                                    <Text style={[styles.green, styles.regularPlus, styles.paddingHorizontal4]}>
                                        {this.state.energySavingCategory}
                                    </Text>
                                </View>
                                {/* {this.state.energySaving ? <> */}
                                    <FlatList 
                                        showsVerticalScrollIndicator={false}
                                        nestedScrollEnabled = {true}
                                        contentContainerStyle={[{ flex:1, marginLeft:20, marginRight:8}]}
                                        data={this.state.energySaving}
                                        renderItem={this.renderItem}
                                        numColumns={2}
                                        initialNumToRender={10}
                                        ref={ref => this.listView = ref}
                                        keyExtractor={(item, index) => item.title + index}
                                    />
                                    {   
                                        this.state.energySaving == '' ?
                                        <Text style={[styles.paleRed, styles.selfCenter, {top:10}, styles.regular]}>
                                            {strings[language].schemes.noDataFound}
                                        </Text>
                                        : null
                                    }
                                {/* </> :    <LoaderComponent/>} */}
                            </View>
                            {/* <View style={[ styles.padding20, styles.radius10, darkMode ? styles.bgLightGray : styles.bgWhite, styles.marginHorizontal20,{ height: 100}]}>
                                
                            </View> */}
                            <View style={[styles.Margin20, styles.centerHorizontal]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.small]}>
                                    {/* Copyright @ 2020 - HPSEBL Co All Rights Reserved */}
                                    {strings[language].schemes.copyright}
                                </Text>
                            </View>
                        </>}
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
        darkMode: commonSelectors.darkMode(state),
        userDetails: commonSelectors.userDetails(state),
    }
}

function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}

const SchemesScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Schemes);
export {SchemesScreen};