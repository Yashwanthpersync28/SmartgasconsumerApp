import React from 'react';
import { FlatList, Text, View, ScrollView, Pressable, TextInput } from 'react-native';
import { connect } from "react-redux";
import { styles } from '../../../styles';
// Libraries
import MIcons from 'react-native-vector-icons/MaterialIcons';
import IIcons from 'react-native-vector-icons/Ionicons';

  // Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import {strings} from "SmartgasConsumerApp/js/strings";
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';

class HouseholdAppliance extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            general: this.props.route.params.generalCategories,
            lightning: this.props.route.params.lightningCategories,
        };
    }

    renderItem = ({item, index}) => {
        console.log('Item',item);
        return (
            <View style={[styles.opacity50perc]}>
                <View style={[styles.row, styles.spaceBetween, styles.paddingVertical, ]}>
                    <Text style={[ styles.fontSize11, this.props.darkMode ? styles.white : styles.black]}>
                        { item.label }
                    </Text>
                    <Text style={[ styles.fontSize11, this.props.darkMode ? styles.white : styles.black, styles.paddingRight10]}>
                        { item.value }
                    </Text>
                </View>
                <View style={[{ borderTopWidth: 1 }, this.props.darkMode ? { borderColor: Colors.white }: { borderColor: Colors.black }, styles.opacity50perc]}/>
            </View>
        );
    }

    componentDidMount(){
        console.log("PRops",this.state.general, this.props);
        this.props.navigation.setOptions({ headerRight : ()=> null });
        this.props.navigation.setOptions({ headerLeft : () => (
            <Pressable style={[styles.row,styles.allCenter,styles.paddingHorizontal16]} onPress={() => this.props.navigation.navigate('/energyCostCalc')}>
                <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25}/>
                <Text style={[this.props.darkMode ? styles.white : styles.black ,styles.selfCenter,styles.paddingHorizontal6]}>
                    {strings[this.props.language].back}
                </Text>
            </Pressable>
        ), });
    }

    search = () => {
        // General Filter
        let general = this.props.route.params.generalCategories.filter( desc => (desc.label).toLowerCase().includes(this.state.search.toLowerCase()));
        let generalFiltered = this.props.route.params.generalCategories.filter( desc => (desc.label).startsWith(this.state.search, 0));
        general = general.filter(x => !generalFiltered.some(y => y.label === x.label));
        let generaltotal = [...generalFiltered,...general];
        this.setState({general: generaltotal});
        // Lightning Filter
        let lightning = this.props.route.params.lightningCategories.filter( desc => (desc.label).toLowerCase().includes(this.state.search.toLowerCase()));
        let lightningFiltered = this.props.route.params.lightningCategories.filter( desc => (desc.label).startsWith(this.state.search, 0));
        lightning = lightning.filter(x => !lightningFiltered.some(y => y.label === x.label));
        let lightningtotal = [...lightningFiltered,...lightning];
        this.setState({lightning: lightningtotal});
        // Kitchen Filter
        // let kitchen = HouseholdAppliances.kitchenCategory.filter( desc => (desc.productDescription).toLowerCase().includes(this.state.search.toLowerCase()));
        // let kitchenFiltered = HouseholdAppliances.kitchenCategory.filter( desc => (desc.productDescription).startsWith(this.state.search, 0));
        // kitchen = kitchen.filter(x => !kitchenFiltered.some(y => y.productDescription === x.productDescription));
        // let kitchenltotal = [...kitchenFiltered,...kitchen];
        // this.setState({kitchen: kitchenltotal});
    }

    render(){
        const {language, darkMode} = this.props;

        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal20]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[styles.row, styles.paddingVertical4]}>
                        {/* <Text style={[styles.palanquinMedium, darkMode ? styles.white : styles.black, styles.fontSize17]}> */}
                        <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                            {`${strings[this.props.language].typical}  `}
                        </Text>
                        {/* <Text style={[styles.palanquinMedium, styles.darkGreen, styles.fontSize17]}> */}
                        <Text style={[styles.darkGreen, styles.medium]}>
                            {strings[this.props.language].householdAppliances}
                        </Text>
                    </View>
                    <View>
                        {/* <Text style={[styles.palanquinMedium, darkMode ? styles.white : styles.black, styles.opacity80perc, styles.normal]}> */}
                        <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                            {strings[language].energyCostCalc.householdApplianceContent}
                        </Text>
                    </View>
                    <View style={[styles.row, styles.centerHorizontal, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius32, styles.marginVertical10, styles.marginTop18, styles.elevate2, styles.marginHorizontal4, styles.padding6]}>
                        <View style={[styles.paddingLeft16, styles.paddingHorizontal4]}>
                            <IIcons name="ios-search-outline" color={this.props.darkMode ? Colors.white : Colors.black} size={20}/>
                        </View>
                        <View style={[styles.flexOne]}>
                            <TextInput
                                placeholder={strings[this.props.language].search}
                                placeholderTextColor = {darkMode ? Colors.white : Colors.black}
                                style={[styles.normal, darkMode ? styles.white : styles.black, styles.paddingVertical]}
                                onChangeText={search=>{
                                    this.setState({search: search}, ()=> this.search())
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={[styles.row, styles.paddingVertical10, styles.marginHorizontal4]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.regularPlus]}>
                                {`${strings[this.props.language].general}  `}
                            </Text>
                            <Text style={[styles.green, styles.regularPlus]}>
                                {strings[this.props.language].category}
                            </Text>
                        </View>
                        <View style={[styles.radius16, styles.bgWhite, styles.padding24, darkMode ? styles.bgLightGray : styles.bgWhite, styles.elevate2, styles.marginHorizontal4]}>
                            <View style={[styles.row, styles.spaceBetween, styles.paddingBottom]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.small]}>
                                    {strings[this.props.language].productDescription}
                                </Text>
                                <Text style={[darkMode ? styles.white : styles.black, styles.small]}>
                                    {strings[this.props.language].consumption}
                                </Text>
                            </View>
                            <View style={[{ borderTopWidth: 1 }, this.props.darkMode ? { borderColor: Colors.white }: { borderColor: Colors.black }, styles.opacity25perc]}/>
                            <FlatList 
                                showsVerticalScrollIndicator={false}
                                nestedScrollEnabled = {true}
                                style={{height: this.state.general.length*32}}
                                data={this.state.general}
                                renderItem={this.renderItem}
                                numColumns={1}
                                initialNumToRender={10}
                                ref={ref => this.listView = ref}
                                keyExtractor={(item, index) => item.priority + index}
                            />
                            {   
                                this.state.general.length == 0 ?
                                <Text style={[styles.paleRed, styles.selfCenter, {top:10}]}>
                                    {strings[this.props.language].noDataFound}
                                </Text>
                                : null
                            }
                        </View>
                        <View style={[styles.row, styles.paddingVertical10, styles.marginHorizontal4]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.regularPlus]}>
                                {`${strings[this.props.language].lightning}  `}
                            </Text>
                            <Text style={[styles.green, styles.regularPlus]}>
                                {strings[this.props.language].category}
                            </Text>
                        </View>
                        <View style={[styles.radius16, styles.bgWhite, styles.padding24, darkMode ? styles.bgLightGray : styles.bgWhite, styles.elevate2, styles.marginHorizontal4]}>
                            <View style={[styles.row, styles.spaceBetween, styles.paddingBottom]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.small]}>
                                    {strings[this.props.language].productDescription}
                                </Text>
                                <Text style={[darkMode ? styles.white : styles.black, styles.small]}>
                                    {strings[this.props.language].consumption}
                                </Text>
                            </View>
                            <View style={[{ borderTopWidth: 1 }, this.props.darkMode ? { borderColor: Colors.white }: { borderColor: Colors.black }, styles.opacity25perc]}/>
                            <FlatList 
                                showsVerticalScrollIndicator={false}
                                nestedScrollEnabled = {true}
                                // style={{height:Dimensions.get("window").height*80/Dimensions.get("window").width}}
                                style={{height: this.state.lightning.length*32}}
                                data={this.state.lightning}
                                renderItem={this.renderItem}
                                numColumns={1}
                                initialNumToRender={10}
                                ref={ref => this.listView = ref}
                                keyExtractor={(item, index) => item.priority + index}
                            />
                            {   
                                this.state.lightning.length == 0 ?
                                <Text style={[styles.paleRed, styles.selfCenter, {top:10}]}>
                                    {strings[this.props.language].noDataFound}
                                </Text>
                                : null
                            }
                        </View>
                        {/* <View style={[styles.row, styles.paddingVertical10, styles.marginHorizontal4]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.regularPlus]}>
                                {`${strings[this.props.language].kitchen}  `}
                            </Text>
                            <Text style={[styles.green, styles.regularPlus]}>
                                {strings[this.props.language].category}
                            </Text>
                        </View>
                        <View style={[styles.radius16, styles.bgWhite, styles.padding24, darkMode ? styles.bgLightGray : styles.bgWhite, styles.marginBottom24, styles.elevate2, styles.marginHorizontal4]}>
                            <View style={[styles.row, styles.spaceBetween, styles.paddingBottom]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.small]}>
                                    {strings[this.props.language].productDescription}
                                </Text>
                                <Text style={[darkMode ? styles.white : styles.black, styles.small]}>
                                    {strings[this.props.language].consumption}
                                </Text>
                            </View>
                            <View style={[{ borderTopWidth: 1 }, this.props.darkMode ? { borderColor: Colors.white }: { borderColor: Colors.black }, styles.opacity25perc]}/>
                            <FlatList 
                                showsVerticalScrollIndicator={false}
                                nestedScrollEnabled = {true}
                                // style={{height:Dimensions.get("window").height*80/Dimensions.get("window").width}}
                                style={{height: this.state.kitchen.length*32}}
                                data={this.state.kitchen}
                                renderItem={this.renderItem}
                                numColumns={1}
                                initialNumToRender={10}
                                ref={ref => this.listView = ref}
                                keyExtractor={(item, index) => item.priority + index}
                            />
                            {   
                                this.state.kitchen == 0 ?
                                <Text style={[styles.paleRed, styles.selfCenter, {top:10}]}>
                                    {strings[this.props.language].noDataFound}
                                </Text>
                                : null
                            }
                        </View> */}
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
        activeCount: commonSelectors.activeCount(state),
        darkMode: commonSelectors.darkMode(state)
    }
}
function mapDispatchToProps (dispatch) {
    return {
    }
}
const HouseholdApplianceScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(HouseholdAppliance);
export {HouseholdApplianceScreen}