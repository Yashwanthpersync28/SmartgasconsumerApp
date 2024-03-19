import React from 'react';
import { connect } from "react-redux";
import { Text, View, TextInput, Pressable, FlatList, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
// STYLES
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Components
import EventsComponent from 'SmartgasConsumerApp/js/screens/myPrograms/components/Events'
// ICONS
import MIcons from 'react-native-vector-icons/MaterialIcons';
import IIcons from 'react-native-vector-icons/Ionicons';
// BACKEND
import {strings} from "SmartgasConsumerApp/js/strings";
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import * as dashboard from "../../../api/dashboard";
import {apiDispatcher, userDetailActions} from "../../../actions";
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';



class ProgramsList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // programsList: this.props.checkPrograms
        };
    }

    async componentDidMount(): void {
        this.syncData()
        this.props.navigation.setOptions({ headerRight : ()=> null });
        this.props.navigation.setOptions({ headerLeft : () => (
            <TouchableOpacity style={[styles.row,styles.allCenter,styles.paddingHorizontal16]} onPress={() => this.props.navigation.goBack()}>
               <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25}/>
                <Text style={[this.props.darkMode ? styles.white : styles.black ,styles.selfCenter,styles.fontSize15,styles.paddingHorizontal6]}>
                    {strings[this.props.language].back}
                </Text>
            </TouchableOpacity>
        ), });

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'ProgramList') {
                    this.props.setCurrentRoute('ProgramList');
                }
            }
        );
    }

    // componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    //     if(this.props.checkPrograms !== prevProps.checkPrograms) {
    //         let data = this.props.checkPrograms ? JSON.parse(JSON.stringify(this.props.checkPrograms)) : [];
    //         console.log(data, this.props.checkPrograms)
    //     }
    //     this.syncData();
    // }

    syncData = async () => {
        try {
            let checkPrograms = await this.props.checkPrograms;
            this.setState({ programsList: checkPrograms.programs })
            console.log('Check Programs22', this.state.programsList);

        } catch (e) {
            this.setState({refreshing: false})
        }
    }

    search = () => {
        let program = this.props.checkPrograms.programs.filter( data => (data.eventName).toLowerCase().includes(this.state.search.toLowerCase()));
        let programFiltered = this.props.checkPrograms.programs.filter( data => (data.eventName).startsWith(this.state.search, 0));
        program = program.filter(x => !programFiltered.some(y => y.eventName === x.eventName));
        console.log('General Filter',program);
        let programtotal = [...programFiltered,...program];
        this.setState({programsList: programtotal});
    }

    renderItem = ({item, index}) => {
        console.log('Item',item);
        const {language, darkMode} = this.props;
        return (
            <Pressable onPress={()=>  this.props.navigation.navigate(`/DRProgram/MyProgram/UpcomingEvents`,{id: item.id, eventName: item.eventName, description: item.description, type: 'showInterest'})} style={[]}>
                <EventsComponent eventName={item.eventName}  savings= {item.savings} date={item.date} darkMode={this.props.darkMode} language={this.props.language}/>
            </Pressable>
        );
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
                    <View style={[styles.marginBottom, styles.paddingHorizontal20]}>
                        <View style={[ styles.row, styles.marginVertical]}>
                            <Text style={[darkMode ? styles.white : styles.black,  styles.medium]}>
                                {`${strings[language].checkPrograms.program}  `}
                            </Text>
                            <Text style={[styles.green,  styles.medium]}>
                                {strings[language].checkPrograms.list}
                            </Text>
                        </View>
                        <View style={[]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                                {strings[language].checkPrograms.secondScreenHeaderContext}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.row, styles.centerHorizontal, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius10, styles.marginVertical10, styles.marginTop18, styles.elevate2, styles.marginHorizontal20]}>
                        <View style={[styles.paddingLeft16, styles.paddingHorizontal4]}>
                            <IIcons name="ios-search-outline" color={this.props.darkMode ? Colors.white : Colors.black} size={20}/>
                        </View>
                        <View style={[styles.flexOne]}>
                            <TextInput
                                placeholder={strings[this.props.language].search}
                                placeholderTextColor = {darkMode ? Colors.white : Colors.black}
                                style={[styles.normal, darkMode ? styles.white : styles.black, styles.paddingVertical16]}
                                onChangeText={search=>{
                                    this.setState({search: search}, ()=> this.search())
                                }}
                            />
                        </View>
                    </View>
                    <View style={[styles.paddingHorizontal10]}>
                        <FlatList 
                            showsVerticalScrollIndicator={false}
                            data={this.state.programsList}
                            renderItem={this.renderItem}
                            numColumns={1}
                            initialNumToRender={10}
                            ref={ref => this.listView = ref}
                            keyExtractor={(item, index) => item.date + index}
                        />
                        {   
                            this.state.programsList == '' ?
                            <Text style={[styles.paleRed, styles.selfCenter, {top:10}, styles.regular, styles.paddingBottom]}>
                                {strings[this.props.language].noDataFound}
                            </Text>
                            : null
                        }
                    </View>
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
        checkPrograms: commonSelectors.checkPrograms(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
    }
}

const ProgramsListScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgramsList);
export {ProgramsListScreen};