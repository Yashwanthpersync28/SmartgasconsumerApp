import React from 'react';
import { connect } from "react-redux";
import { Text, View, StatusBar, ScrollView, RefreshControl, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Component
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader';
import DataNotFound from 'SmartgasConsumerApp/js/components/common/workInProgress/DataNotFound'
import MonthlyComparison from 'SmartgasConsumerApp/js/screens/comparison/components/MonthlyComparison';
import VictoryMultipleComponent from 'SmartgasConsumerApp/js/screens/comparison/components/VictoryMultipleBar';
import ConsumptionComparison from 'SmartgasConsumerApp/js/screens/comparison/components/ConsumptionComparison';
// Icons
import OIcons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome';
// Functions
import { backgroundFixedBar, handleNegative } from "../../helpers/common/chartDataHelper";
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { strings } from "SmartgasConsumerApp/js/strings";
import * as dashboard from "../../api/dashboard";
import { userDetailActions, apiDispatcher } from "../../actions";
import { TableHeader } from '../../components/common/table/TableHeader';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

const { height, width } = Dimensions.get('window');

class Comparison extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todayValue: this.props.unitComparison?.today?.value,
            todayPercent: (this.props.unitComparison?.today?.percent / 100),
            yesterdayValue: this.props.unitComparison?.yesterday?.value,
            yesterdayPercent: (this.props.unitComparison?.yesterday?.percent / 100),
            currentWeek: handleNegative(this.props.unitComparison?.weeklycomparison?.currentweek),
            lastWeek: handleNegative(this.props.unitComparison?.weeklycomparison?.lastweek),
            currentMonth: this.props.unitComparison?.monthlycomparison?.current,
            currentMonthPercent: this.props.unitComparison?.monthlycomparison?.current?.percent / 100,
            lastMonth: this.props.unitComparison?.monthlycomparison?.last,
            lastMonthPercent: this.props.unitComparison?.monthlycomparison?.last?.percent / 100,
            table: false
        };
    }

    async componentDidMount(): void {
        this.syncData()

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'unitComparison') {
                    this.props.setCurrentRoute('unitComparison');
                    this.syncData()
                }
            }
        );
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        console.log(!!this.props.unitComparison, 'kjdf;dshfhkja', this.props.unitComparison !== prevProps.unitComparison, this.props.unitComparison, prevProps.unitComparison, this.prevState, this.state)
        console.log(!this.state.todayValue, 'lkdsfahjs')
        if (this.props.unitComparison !== prevProps.unitComparison) {
            let data = this.props.unitComparison ? JSON.parse(JSON.stringify(this.props.unitComparison)) : [];
            console.log(data, this.props.unitComparison, "sumitdata", JSON.parse(JSON.stringify(this.props.unitComparison)));
            if (this.props.unitComparison) {

                this.setState({
                    todayValue: data.today?.value,
                    todayPercent: (data.today?.percent / 100),
                    yesterdayValue: data.yesterday?.value,
                    yesterdayPercent: (data.yesterday?.percent / 100),
                    currentWeek: handleNegative(data.weeklycomparison?.currentweek),
                    lastWeek: handleNegative(data.weeklycomparison?.lastweek),
                    currentMonth: data.monthlycomparison?.current,
                    currentMonthPercent: data.monthlycomparison?.current?.percent / 100,
                    lastMonth: data.monthlycomparison?.last,
                    lastMonthPercent: data.monthlycomparison?.last?.percent / 100,
                    refreshing: false
                }, () => console.log(data, "Percentage", this.state?.todayPercent, (this.state.yesterdayPercent / 100))
                )
            } else {
                this.syncData();
                this.setState({ refreshing: false });
            }
            this.setState({ refreshing: false });
        }
        // if(!this.state.todayValue && !!this.props.unitComparison){
        //     this.setState({
        //         todayValue: this.props.unitComparison?.today?.value,
        //         todayPercent: (this.props.unitComparison?.today?.percent/100),
        //         yesterdayValue: this.props.unitComparison?.yesterday?.value,
        //         yesterdayPercent: (this.props.unitComparison?.yesterday?.percent/100),
        //         currentWeek: handleNegative(this.props.unitComparison?.weeklycomparison?.currentweek),
        //         lastWeek: handleNegative(this.props.unitComparison?.weeklycomparison?.lastweek),
        //         currentMonth: this.props.unitComparison?.monthlycomparison?.current,
        //         currentMonthPercent: this.props.unitComparison?.monthlycomparison?.current?.percent/100,
        //         lastMonth: this.props.unitComparison?.monthlycomparison?.last,
        //         lastMonthPercent: this.props.unitComparison?.monthlycomparison?.last?.percent/100,
        //         refreshing: false
        //     })
        //     console.log(this.state,'stateinside',this.props.unitComparison)
        // }

        if (this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }
    syncData = async () => {
        try {
            console.log("Sync Data")
            this.setState({ loading: true })
            let data = await this.props.apiDispatcher(dashboard.unitComparisonApi())
            if (data.data.message) {
                this.setState({ error: data.data.message })
            } else if (data.status == 200) {
                console.log("Unit Comaparison", data.data, data);
                this.props.setUnitComparison(data.data);
                this.setState({ error: '' })
                this.setState({ loading: false })
                this.setState({
                    todayValue: data.data.today?.value,
                    todayPercent: (data.data.today?.percent / 100),
                    yesterdayValue: data.data.yesterday?.value,
                    yesterdayPercent: (data.data.yesterday?.percent / 100),
                    currentWeek: handleNegative(data.data.weeklycomparison?.currentweek),
                    lastWeek: handleNegative(data.data.weeklycomparison?.lastweek),
                    currentMonth: data.data.monthlycomparison?.current,
                    currentMonthPercent: data.data.monthlycomparison?.current?.percent / 100,
                    lastMonth: data.data.monthlycomparison?.last,
                    lastMonthPercent: data.data.monthlycomparison?.last?.percent / 100,
                    refreshing: false
                })

            }
            else if (data.status == 204) {
                this.setState({ noData: true })
            }
            else {
                console.log("Unhandled Error", data);
                // alert(`Data -> ${data.data} Status -> ${data.status}`)
            }
            this.setState({ loading: false })

        } catch (e) {
            console.log(`${e}\ncomparison\n${this.state.todayValue}\n${this.props.unitComparison}`)
            alert(`${e}\ncomparison\n${this.state.todayValue}\n${this.props.unitComparison}`)
            this.setState({ refreshing: false })
        }
    }
    onRefresh = () => {
        this.setState({ refreshing: true });
        this.syncData()
    };

    render() {
        const { language, darkMode } = this.props;
        console.log('this.props', this.props, this.state);

        return (
            <ErrorBoundaryMainComponent>
                <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal20]} >
                    {this.props.darkMode ? <StatusBar backgroundColor={Colors.black} barStyle='light-content' /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content' />}
                    <ScrollView showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.sunglowYellow}
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh} />
                        }
                    >
                        {this.state.loading && !this.state.todayValue ?
                            <View style={[{ marginTop: height / 3 }]}>
                                <LoaderComponent />
                            </View>
                            :
                            <>
                                {this.state.noData ?
                                    <View style={[styles.paddingTop12Percent, styles.allCenter, styles.flexOne]}>
                                        <DataNotFound darkMode={darkMode} />
                                    </View>
                                    :
                                    <>

                                        <View style={[styles.row, styles.marginVertical]}>
                                            <Text style={[darkMode ? styles.white : styles.black, styles.medium22]}>
                                                {/* {`${strings[language].comparison.unit}  `} */}
                                                Unit
                                            </Text>
                                            <Text style={[styles.darkGreen, styles.medium22]}>
                                                {` ${strings[language].comparison.comparison}`}
                                            </Text>
                                        </View>
                                        <View style={[]} >
                                            <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                                                {strings[language].comparison.headerContext}
                                            </Text>
                                        </View>
                                        {this.state.error ?
                                            <View style={[styles.paddingTop6Percent, styles.paddingHorizontal20]}>
                                                <Text style={[styles.paleRed, styles.textCenter, styles.regular, styles.lineHeight24]}>
                                                    {this.state.error}
                                                </Text>
                                            </View>
                                            :
                                            <>
                                                <View style={[styles.flexOne, styles.paddingHorizontal, styles.marginVertical14]}>
                                                    <View style={[styles.flexOne, styles.row]}>
                                                        <View style={[{ marginRight: 12 }, styles.flexOne, darkMode ? styles.bgLightGray : styles.bgWhite, styles.padding10, styles.radius, styles.elevate]}>
                                                            <View style={[styles.row, styles.flexOne, styles.allCenter, styles.paddingVertical6]}>
                                                                <Text style={[darkMode ? styles.white : styles.black, styles.fontSize19, styles.paddingHorizontal6]}>
                                                                    {strings[language].comparison.today}
                                                                </Text>
                                                                {/* <Text style={[darkMode ? styles.white : styles.black, styles.extraSmall]}>
                                                    {`[${strings[language].comparison.inProgress}]`}
                                                </Text> */}
                                                            </View>
                                                            <View style={[styles.flexOne]}>
                                                                <ConsumptionComparison title={`${strings[language].comparison.consumption}:`} units={!!this.state.todayValue ? this.state.todayValue : null} unitName={strings[language].comparison.units} consumption={this.state.todayPercent} colorMode={darkMode} />
                                                            </View>
                                                        </View>
                                                        <View style={[styles.flexOne, darkMode ? styles.bgLightGray : styles.bgWhite, styles.padding10, styles.radius, styles.elevate]}>
                                                            <View style={[styles.flexOne, styles.allCenter, styles.paddingVertical6]}>
                                                                <Text style={[styles.fontSize19, styles.paddingHorizontal6, styles.green]}>
                                                                    {strings[language].comparison.yesterday}
                                                                </Text>
                                                            </View>
                                                            <View style={[styles.flexOne,]}>
                                                                <ConsumptionComparison title={`${strings[language].comparison.consumption}:`} units={this.state.yesterdayValue ? this.state.yesterdayValue : null} unitName={strings[language].comparison.units} consumption={this.state.yesterdayPercent} colorMode={darkMode} />
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={[styles.flexOne, , styles.marginHorizontal, styles.paddingHorizontal20, styles.paddingTop20, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.elevate]}>
                                                    <View style={[styles.row, styles.paddingBottom, styles.centerHorizontal, styles.spaceBetween]}>
                                                        <View style={[styles.row, styles.flexOne]}>
                                                            <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                                                                {`${strings[language].comparison.weekly}  `}
                                                            </Text>
                                                            <Text style={[styles.green, styles.medium]}>
                                                                {strings[language].comparison.comparison}
                                                            </Text>
                                                        </View>
                                                        {/* <TouchableOpacity onPress={()=>this.setState({table:!this.state.table})} style={[styles.padding10,{zIndex:999}]}>
                                            <Icon name={this.state.table?'bar-chart':'table'} size={15} color={darkMode?Colors.white:Colors.black} />
                                        </TouchableOpacity> */}
                                                        <View style={[{ backgroundColor: darkMode ? "#3C3C43" : Colors.lightGrey, zIndex: 2 }, styles.radius20, styles.row, styles.allCenter, styles.selfCenter]}>
                                                            <TouchableOpacity onPress={() => this.setState({ table: !this.state.table })} style={[styles.padding, { backgroundColor: this.state.table ? "#64AE64" : null }, styles.radius20]}>
                                                                <Icon name={"table"} size={15} color={darkMode ? Colors.white : Colors.black} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => this.setState({ table: !this.state.table })} style={[styles.padding, { backgroundColor: this.state.table ? null : "#64AE64" }, styles.radius20]}>
                                                                <Icon name={"bar-chart"} size={15} color={darkMode ? Colors.white : Colors.black} />
                                                            </TouchableOpacity>
                                                            {/* styles.padding10,styles.right,styles.Margin10,styles.absolute,{top:20,right:0,zIndex:2} */}
                                                        </View>
                                                    </View>
                                                    <View style={[styles.flexOne]}>
                                                        <View style={[styles.flexOne]}>
                                                            {this.state.lastWeek ?
                                                                this.state.table ?
                                                                    <View style={[styles.flexOne, styles.marginBottom14]}>
                                                                        <View style={[styles.row, styles.spaceBetween]}>
                                                                            <Text style={[darkMode ? styles.white : styles.black, styles.fontSize13, styles.marginRight16]}>Day</Text>
                                                                            <Text style={[darkMode ? styles.white : styles.black, styles.fontSize13]}>Last Week</Text>
                                                                            <Text style={[darkMode ? styles.white : styles.black, styles.fontSize13]}>Current Week</Text>
                                                                        </View>
                                                                        <View style={[{ borderBottomWidth: 0.7 }, styles.opacity25perc, styles.paddingTop, this.props.darkMode ? { borderColor: Colors.white } : { borderColor: Colors.black }]} />
                                                                        <View style={[styles.row, styles.flexOne, styles.spaceBetween]}>
                                                                            <FlatList data={this.state.lastWeek} renderItem={(item) => <View style={[styles.opacity65perc]}>
                                                                                <View style={[styles.row, styles.spaceBetween]}>
                                                                                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize11, styles.opacity80perc, styles.paddingTop4]}>{item.item.x}</Text>
                                                                                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize11, styles.opacity80perc, styles.paddingTop4]}>{item.item.y}</Text>
                                                                                </View>
                                                                                <View style={[{ borderBottomWidth: 0.7 }, styles.opacity25perc, styles.paddingTop4, darkMode ? { borderColor: Colors.white } : { borderColor: Colors.black }]} />
                                                                            </View>} />
                                                                            <FlatList data={this.state.currentWeek} renderItem={(item) => <View style={[styles.opacity65perc]}>
                                                                                <Text style={[darkMode ? styles.white : styles.black, styles.fontSize11, styles.opacity80perc, styles.paddingTop4, styles.textRight]}>{item.item.y}</Text>
                                                                                <View style={[{ borderBottomWidth: 0.7 }, styles.opacity25perc, styles.paddingTop4, darkMode ? { borderColor: Colors.white } : { borderColor: Colors.black }]} />
                                                                            </View>} />
                                                                        </View>
                                                                    </View> :
                                                                    <View style={[styles.flexOne, styles.allCenter]}>
                                                                        {this.state?.lastWeek.length && <VictoryMultipleComponent consumption={this.state.lastWeek} curr={this.state.currentWeek} currentFixed={backgroundFixedBar(this.state.currentWeek)} lastFixed={backgroundFixedBar(this.state.lastWeek)} language={language} darkMode={darkMode} />}
                                                                    </View>
                                                                : null}

                                                        </View>

                                                        {this.state.table ? null : <View style={[styles.flexOne]}>
                                                            <View>
                                                                <View style={[styles.allCenter, styles.paddingVertical2, styles.allCenter, styles.paddingVertical4]}>
                                                                    <Text style={[darkMode ? styles.white : styles.black, styles.extraSmall, styles.selfCenter]}>
                                                                        {strings[language].comparison.graphButton}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={[styles.row, styles.spaceBetween, styles.paddingBottom12, { flexWrap: 'wrap' }]}>
                                                                <View style={[styles.row]}>
                                                                    <Text style={[styles.paddingHorizontal4, styles.opacity65perc, styles.paddingTop2]}>
                                                                        <OIcons name='primitive-dot' size={15} color={'gray'} />
                                                                    </Text>
                                                                    <Text style={[darkMode ? styles.white : styles.black, styles.selfCenter, styles.extraSmall, styles.opacity65perc]}>
                                                                        {`${strings[language].comparison.lable1}`}
                                                                    </Text>
                                                                </View>
                                                                <View style={[styles.row, styles.relative]}>
                                                                    <Text style={[styles.paddingHorizontal4, styles.paddingTop2]}>
                                                                        <OIcons name='primitive-dot' size={15} color={Colors.green} />
                                                                    </Text>
                                                                    <Text style={[styles.green, styles.selfCenter, styles.extraSmall]}>
                                                                        {`${strings[language].comparison.lable2}`}
                                                                    </Text>
                                                                </View>
                                                            </View>

                                                        </View>}
                                                    </View>
                                                </View>
                                                {<View style={[styles.flexOne, styles.marginVertical14, styles.paddingHorizontal]}>
                                                    <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.xRadius, styles.padding16, styles.flexOne, styles.elevate]}>
                                                        <View style={[styles.flexOne, styles.paddingBottom]}>
                                                            <View style={[styles.row]}>
                                                                <Text style={[styles.medium, darkMode ? styles.white : styles.black]}>
                                                                    {strings[language].comparison.monthly}
                                                                </Text>
                                                                <Text style={[styles.medium, styles.green]}>
                                                                    {` ${strings[language].comparison.comparison}`}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        {(this.state?.lastMonth?.value >= 0 || this.state?.currentMonth?.value >= 0) ? <View style={styles.flexOne}>
                                                            {!!this.state?.currentMonth?.value && this.state?.currentMonth?.value >= 0 && <View style={[styles.paddingBottom]}>
                                                                <MonthlyComparison title={this.state.currentMonth.month} watts={`${this.state.currentMonth.valuestatus} ${this.state.currentMonth.value < 0 ? "" : this.state.currentMonth.value}`} unitName={strings[language].comparison.units} consumption={this.state.currentMonthPercent} colorMode={darkMode} fontColor={styles.green} />
                                                            </View>}
                                                            {!!this.state?.lastMonth?.value && this.state?.lastMonth?.value >= 0 && <MonthlyComparison title={this.state.lastMonth.month} watts={this.state.lastMonth.value < 0 ? "" : this.state.lastMonth.value} unitName={strings[language].comparison.units} consumption={this.state.lastMonthPercent} colorMode={darkMode} fontColor={darkMode ? styles.white : styles.black} />}
                                                        </View> :
                                                            <View style={[styles.paddingTop12Percent, styles.allCenter, styles.flexOne]}>
                                                                <DataNotFound darkMode={darkMode} />
                                                            </View>}
                                                    </View>
                                                </View>}
                                                {/* <View style={[styles.marginBottom5Percent]} >
                                                    <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                                                        {strings[language].comparison.EAContent}
                                                    </Text>
                                                </View> */}
                                            </>}

                                        <View style={[styles.flexOne, styles.marginBottom14]}>
                                            <View style={[styles.flexTwo, styles.allCenter, styles.paddingVertical12]}>
                                                <View style={[styles.centerVertical, { flexDirection: 'row' }]}>
                                                    <Text style={[darkMode ? styles.white : styles.black, styles.normal, { paddingRight: 5, fontWeight: '600' }]}>
                                                        {"Disclaimer :"}
                                                    </Text>
                                                    {/* <Text style={[darkMode ? styles.white : styles.black, styles.normal, { fontWeight: '500' }]}>
                                                {this.state?.date}
                                            </Text> */}
                                                </View>
                                                <View style={[styles.row, styles.flexStartHorizontal,{paddingTop:2,paddingBottom:5,paddingLeft:10,paddingRight:10,flexWrap:'nowrap'}]}>
                                                    <Text style={[styles.green, { fontSize: 13, fontFamily: 'Roboto-Regular', fontStyle: 'italic' }]}>
                                                        {"The displayed consumption is only for information purposes and might be estimated in some cases, so please do not infer this as the exact biliing for consumption"}
                                                    </Text>
                                                    <Text style={[styles.green, styles.regular, styles.paddingVertical2]}>
                                                        {``}
                                                    </Text>
                                                </View>

                                            </View>
                                        </View>


                                    </>
                                }
                            </>}
                    </ScrollView>
                </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeCount: commonSelectors.activeCount(state),
        darkMode: commonSelectors.darkMode(state),
        language: commonSelectors.language(state),
        unitComparison: commonSelectors.unitComparison(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setUnitComparison: (data = {}) => dispatch(userDetailActions.setUnitComparison(data)),
        setCurrentRoute: (data = {}) => dispatch(userDetailActions.setCurrentRoute(data)),
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
    }
}
const ComparisonScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Comparison);
export { ComparisonScreen }