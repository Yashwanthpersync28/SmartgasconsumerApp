import React from 'react';
import { FlatList, Dimensions, Text, View, ScrollView, Pressable, TextInput } from 'react-native';
import { connect } from "react-redux";
import { styles } from '../../styles';
// Libraries
import MIcons from 'react-native-vector-icons/MaterialIcons';
import IIcons from 'react-native-vector-icons/Ionicons';
// Components
import SupportInfoComponent from './components/SupportInfo'
// Constants
import { SUPPORT } from '../../constants/lottie';
import { SupportInfo } from 'SmartgasConsumerApp/js/constants/dashboard/Support';
  // Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import {strings} from "SmartgasConsumerApp/js/strings";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

class Support extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            info1: strings[this.props.language].support.info1,
            info2: strings[this.props.language].support.info2,
            info3: strings[this.props.language].support.info3,

        };
    }

    renderItem = ({item, index}) => {
        return (
            <View style={[(index%2) == 0 ? styles.paddingRight10 : null, styles.flexOne]}>
                <SupportInfoComponent name={item.name} url={item.url} darkMode={this.props.darkMode} image={strings[this.props.language].support.image}/>
            </View>
        );
    }

    componentDidMount(){
        this.props.navigation.setOptions({ headerShown: true, title : 'Support', });
    }

    search = () => {
        // Info 1 Filter
        let info1 = strings[this.props.language].support.info1.filter( desc => (desc.name).toLowerCase().includes(this.state.search.toLowerCase()));
        let info1Filtered = strings[this.props.language].support.info1.filter( desc => (desc.name).startsWith(this.state.search, 0));
        info1 = info1.filter(x => !info1Filtered.some(y => y.name === x.name));
        let info1total = [...info1Filtered,...info1];
        this.setState({info1: info1total});
        // Info 2 Filter
        let info2 = strings[this.props.language].support.info2.filter( desc => (desc.name).toLowerCase().includes(this.state.search.toLowerCase()));
        let info2Filtered = strings[this.props.language].support.info2.filter( desc => (desc.name).startsWith(this.state.search, 0));
        info2 = info2.filter(x => !info2Filtered.some(y => y.name === x.name));
        let info2total = [...info2Filtered,...info2];
        this.setState({info2: info2total});
        // Info 3 Filter
        let info3 = strings[this.props.language].support.info3.filter( desc => (desc.name).toLowerCase().includes(this.state.search.toLowerCase()));
        let info3Filtered = strings[this.props.language].support.info3.filter( desc => (desc.name).startsWith(this.state.search, 0));
        info3 = info3.filter(x => !info3Filtered.some(y => y.name === x.name));
        let info3total = [...info3Filtered,...info3];
        this.setState({info3: info3total});
    }

    render(){
        const {language, darkMode} = this.props;

        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal20]}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
                    <View style={[styles.paddingVertical4, styles.allCenter]}>
                        <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                            {`${strings[language].support.header1}  `}
                        </Text>
                        <Text style={[styles.darkGreen, styles.medium]}>
                            {strings[language].support.header2}
                        </Text>
                    </View>
                    <View style={[styles.row, styles.centerHorizontal, styles.paddingVertical4, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius32, styles.marginVertical10, styles.marginTop18, styles.elevate2, styles.marginHorizontal4]}>
                        <View style={[styles.paddingLeft16, styles.paddingHorizontal4]}>
                            <IIcons name="ios-search-outline" color={this.props.darkMode ? Colors.white : Colors.black} size={20}/>
                        </View>
                        <View style={[styles.flexOne]}>
                            <TextInput
                                placeholder={strings[language].support.search}
                                placeholderTextColor = {darkMode ? Colors.white : Colors.black}
                                style={[styles.normal, darkMode ? styles.white : styles.black, styles.paddingVertical]}
                                onChangeText={search=>{
                                    this.setState({search: search}, ()=> this.search())
                                }}
                            />
                        </View>
                    </View>
                    <View style={[, styles.paddingBottom20]}>
                        <View style={[styles.row, styles.paddingVertical10, styles.marginHorizontal4]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.regularPlus]}>
                                {`${strings[language].support.general}  `}
                            </Text>
                            <Text style={[styles.green, styles.regularPlus]}>
                                {strings[language].support.category}
                            </Text>
                        </View>
                       <View>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled = {false}
                                    // style={{height: this.state.general.length*32}}
                                    data={this.state.info1}
                                    renderItem={this.renderItem}
                                    numColumns={2}
                                    initialNumToRender={10}
                                    ref={ref => this.listView = ref}
                                    keyExtractor={(item, index) => item.name + index}
                                />
                                <View style={[styles.radius10, styles.allCenter, styles.marginBottom10, darkMode ? styles.bgLightGray : styles.bgWhite, {height: 100} ]}>
                                    <Text style={[darkMode ? styles.white : styles.black]}>
                                        {strings[language].support.image}
                                    </Text>
                                </View>

                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled = {false}
                                    data={this.state.info2}
                                    renderItem={this.renderItem}
                                    numColumns={2}
                                    initialNumToRender={10}
                                    ref={ref => this.listView = ref}
                                    keyExtractor={(item, index) => item.name + index}
                                />

                                <View style={[styles.radius10, styles.allCenter, styles.marginBottom10, darkMode ? styles.bgLightGray : styles.bgWhite, {height: 100} ]}>
                                    <Text style={[darkMode ? styles.white : styles.black]}>
                                        {strings[language].support.image}
                                    </Text>
                                </View>

                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled = {false}
                                    data={this.state.info3}
                                    renderItem={this.renderItem}
                                    numColumns={2}
                                    initialNumToRender={10}
                                    ref={ref => this.listView = ref}
                                    keyExtractor={(item, index) => item.name + index}
                                />

                            </View>
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
const SupportScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Support);
export {SupportScreen}
