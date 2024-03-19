import React from 'react';
import { connect } from "react-redux";
import { Text, View, ScrollView, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
// Styles and Colors
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Components
import DataNotFound from 'SmartgasConsumerApp/js/components/common/workInProgress/DataNotFound'
// Constants
import { LOADING } from 'SmartgasConsumerApp/js/constants/lottie';
// Icons
import SLIcons from 'react-native-vector-icons/SimpleLineIcons';
// Library
import LottieView from 'lottie-react-native';
import Accordion from 'react-native-collapsible/Accordion';
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { strings } from "SmartgasConsumerApp/js/strings";
import { RFValue } from 'react-native-responsive-fontsize';
import {apiDispatcher, userDetailActions} from "../../actions";
import {chartDataWithoutDate} from "../../helpers/common/chartDataHelper";
import * as dashboard from "../../api/dashboard";
import * as _ from "lodash";
import { language } from '../../selectors/common';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

class FAQs extends React.Component{

    state = {
        activeGeneralSections: [],
        activeBillingSections: [],
        categorySelected: "all"
    };

    componentDidMount(){
        this.setState({darkMode: this.props.darkMode});
        this.syncData()

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'Faq') {
                    this.props.setCurrentRoute('Faq');
                    this.syncData()
                }
            }
        );
        this.props.setCurrentRoute('Faq');
    }

    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.faq !== prevProps.faq) {
            let data = await this.props.faq ? JSON.parse(JSON.stringify(this.props.faq)) : [];
            console.log(data, this.props.faq)
            if (this.props.faq) {
                this.setState({
                    billing: data.billing,
                    general: data.general,
                    category: data.category,
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
            let data = await this.props.apiDispatcher(dashboard.faqApi(this.props.language == 'english' ? 1 : 2 ))
            console.log("Dashb",data.data);
            if(data.status == 200){
                this.props.setFaq(data.data);
                this.setState({ noData: false })
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

    _renderGeneralHeader = (section, index, isActive) => {
        let activeSections;
        return (
            <View>
                <View
                    style={[
                        styles.paddingHorizontal20,
                        styles.paddingVertical10,
                        this.props.darkMode ? styles.bgLightGray : styles.bgExtraMediumLightGray,
                        styles.marginTop10,
                        {   borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                            // borderBottomRightRadius: activeSections && activeSections.title === section.title ? 0 : 12,
                            // borderBottomLeftRadius: activeSections && activeSections.title === section.title ? 0 : 12,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }
                    ]}
                >
                    <View style={[{flex: 12},styles.paddingRight4]}>
                        {/* <Text style={[styles.palanquinMedium, styles.lineHeight22, this.props.darkMode ? styles.white : styles.black, styles.regular]}> */}
                        <Text style={[this.props.darkMode ? styles.white : styles.black, styles.fontSize15]}>
                            {section.question}
                        </Text>
                    </View>
                    <View style={[styles.flexOne, styles.flexEndHorizontal, styles.opacity50perc]}>
                        <SLIcons name={(isActive) ? "arrow-up": "arrow-down"} size={12} color={this.props.darkMode ? Colors.white : Colors.black}/>
                    </View>
                </View>
            </View>
        );
    };

    _renderBillingHeader = (section, index, isActive) => {
        let activeSections = this.state.activeBillingSections;
        return (
            <View>
                <View
                    style={[
                        styles.paddingHorizontal20,
                        styles.paddingVertical10,
                        this.props.darkMode ? styles.bgLightGray : styles.bgExtraMediumLightGray,
                        styles.marginTop10,
                        {   borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                            // borderBottomRightRadius: activeSections && activeSections.title === section.title ? 0 : 12,
                            // borderBottomLeftRadius: activeSections && activeSections.title === section.title ? 0 : 12,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }
                    ]}
                >
                    <View style={[{flex: 12},styles.paddingRight4]}>
                        {/* <Text style={[styles.palanquinMedium, styles.lineHeight22, this.props.darkMode ? styles.white : styles.black, styles.regular]}>{section.title}</Text> */}
                        <Text style={[this.props.darkMode ? styles.white : styles.black, styles.fontSize15]}>{section.question}</Text>
                    </View>
                    <View style={[styles.flexOne, styles.flexEndHorizontal, styles.opacity50perc]}>
                        <SLIcons name={(isActive) ? "arrow-up": "arrow-down"} size={12} color={this.props.darkMode ? Colors.white : Colors.black}/>
                    </View>
                </View>
            </View>
        );
    };

    _renderGeneralContent = section => {
        return (
            <View style={[this.props.darkMode ? styles.bgLightGray : styles.bgExtraMediumLightGray, styles.paddingHorizontal20, styles.paddingBottom20, { borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }]}>
                {/* <Text style={[styles.palanquinMedium, styles.lineHeight20, styles.normal, this.props.darkMode ? styles.white : styles.black, styles.opacity50perc]} >                 */}
                <Text style={[styles.normal, this.props.darkMode ? styles.white : styles.black, styles.opacity50perc]} >
                    {section.answer}
                </Text>
            </View>
        );
    };

    _renderBillingContent = section => {
        return (
            <View style={[this.props.darkMode ? styles.bgLightGray : styles.bgExtraMediumLightGray, styles.paddingHorizontal20, styles.paddingBottom20, { borderBottomLeftRadius: 12,borderBottomRightRadius: 12 }]}>
                {/* <Text style={[styles.palanquinMedium, styles.lineHeight20, styles.normal, this.props.darkMode ? styles.white : styles.black, styles.opacity50perc]} >                 */}
                <Text style={[styles.normal, this.props.darkMode ? styles.white : styles.black, styles.opacity50perc]} >
                    {section.answer}
                </Text>
            </View>
        );
    };

    _updateGeneralSections = activeGeneralSections => {
        console.log('Update',activeGeneralSections);
        this.setState({ activeGeneralSections });
    };

    _updateBillingSections = activeBillingSections => {
        this.setState({ activeBillingSections });
    };

    renderCategories = (darkMode) => {
        console.log("This cat", this.state.category);
        if (this.state.category && this.state.category.length > 0 )
            return this.state.category.map(cat=>
                <TouchableOpacity onPress={()=>this.setState({categorySelected: cat})} style={[darkMode ? styles.bgLightGray : styles.bgExtraMediumLightGray, styles.padding10, styles.paddingHorizontal24, styles.radius28, styles.marginRight16]}>
                    <Text style={[darkMode ? styles.white : styles.black]}>
                        {cat}
                    </Text>
                </TouchableOpacity>
            )
    }

    render(){

        const {language, darkMode} = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.paddingTopHeader, styles.flexOne, styles.paddingHorizontal16]} >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.paddingBottom10]}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.sunglowYellow}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh} />
                    }
                >
                    {this.state.noData ?
                        <View style={[ styles.paddingTop12Percent, styles.allCenter, styles.flexOne]}>
                            <DataNotFound darkMode={darkMode}/> 
                        </View>
                    :
                    <>
                        <View style={[styles.row, styles.paddingVertical10]}>
                            <Text style={[styles.fontSize25, darkMode ? styles.white : styles.black]}>
                                {`${strings[language].faqs.top}  `}
                            </Text>
                            <Text style={[styles.fontSize25, styles.green]}>
                                {strings[language].faqs.questions}
                            </Text>
                        </View>
                        <View style={[]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                                    {strings[language].faqs.haveQueries}
                                </Text>
                            </View>
                        <View style={[styles.row, styles.paddingVertical10]}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity onPress={()=>this.setState({categorySelected: "all"})} style={[darkMode ? styles.bgLightGray : styles.bgExtraMediumLightGray, styles.padding10, styles.paddingHorizontal24, styles.radius28, styles.marginRight16]}>
                                    <Text style={[darkMode ? styles.white : styles.black]}>
                                        {strings[language].faqs.all}
                                    </Text>
                                </TouchableOpacity>
                                {this.renderCategories(darkMode)}
                            </ScrollView>
                        </View>
                        {this.state.general  ? null :   
                            <View style={[styles.height60, styles.allCenter]}>
                                <View style={[, styles.selfCenter, {height: 50, width:50}]}>
                                    <LottieView style={[]} source={LOADING.loadingLottie} autoPlay loop />
                                </View>                     
                            </View>  
                        }

                            {this.state.general && (this.state.categorySelected === strings[language].faqs.general || this.state.categorySelected === "all") ?
                        <View style={[styles.row]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                                {`${strings[language].faqs.general}  `}
                            </Text>
                            <Text style={[styles.green, styles.fontSize17]}>
                                {strings[language].faqs.category}
                            </Text>
                        </View> : null }
                        {this.state.general && (this.state.categorySelected === strings[language].faqs.general || this.state.categorySelected === "all") ?
                        <View>
                            <Accordion
                                underlayColor ='#f2f2f'
                                sections={this.state.general}
                                activeSections={this.state.activeGeneralSections}
                                renderSectionTitle={this._renderSectionTitle}
                                renderHeader={this._renderGeneralHeader}
                                renderContent={this._renderGeneralContent}
                                onChange={this._updateGeneralSections}
                            />
                        </View> : null }
                        {this.state.general && (this.state.categorySelected === strings[language].faqs.billing || this.state.categorySelected === "all")  ?
                            <View style={[styles.row, this.state.general && (this.state.categorySelected === strings[language].faqs.billing) ? null : styles.paddingTop24]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                                {`${strings[language].faqs.billing}  `}
                            </Text>
                            <Text style={[styles.green, styles.fontSize17]}>
                                {strings[language].faqs.category}
                            </Text>
                        </View> : null }
                        {this.state.general && (this.state.categorySelected === strings[language].faqs.billing || this.state.categorySelected === "all")  ?
                        <View>
                            <Accordion
                                underlayColor ='#f2f2f'
                                sections={this.state.billing}
                                activeSections={this.state.activeBillingSections}
                                renderSectionTitle={this._renderSectionTitle}
                                renderHeader={this._renderBillingHeader}
                                renderContent={this._renderBillingContent}
                                onChange={this._updateBillingSections}
                            />
                        </View> : null}
                    </>}
                </ScrollView>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps (state) {
    return {
        activeCount: commonSelectors.activeCount(state),
        darkMode: commonSelectors.darkMode(state),
        language: commonSelectors.language(state),
        userDetails: commonSelectors.userDetails(state),
        faq: commonSelectors.faq(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        setFaq: (data={}) => dispatch(userDetailActions.setFaq(data)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const FAQsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(FAQs);
export {FAQsScreen}
