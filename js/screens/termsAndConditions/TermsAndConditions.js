import React from 'react';
import { connect } from "react-redux";
// Styles and Colors
import { Text, View, Pressable, FlatList, ScrollView } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
// Icons
import MIcons from 'react-native-vector-icons/MaterialIcons';
import Colors  from 'SmartgasConsumerApp/js/styles/Colors';
// Constants
import { GENERALINFORMATION, DATASOURCES } from 'SmartgasConsumerApp/js/constants/dashboard/TermsAndConditions';
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import {strings} from "SmartgasConsumerApp/js/strings";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

class TermsAndConditions extends React.Component{

    componentDidMount(){

        this.props.navigation.setOptions({ headerRight : ()=> null });
        this.props.navigation.setOptions({ headerLeft : () => (
            <Pressable style={[styles.row, styles.allCenter, styles.paddingHorizontal30]} onPress={() => this.props.navigation.navigate('/settings')}>
                <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25}/>
                {/* <Text style={[styles.palanquinMedium, this.props.darkMode ? styles.white : styles.black, styles.selfCenter, styles.paddingHorizontal6, styles.paddingBottom2, styles.normal]}> */}
                <Text style={[this.props.darkMode ? styles.white : styles.black, styles.selfCenter, styles.paddingHorizontal6, styles.normal]}>
                    {strings[this.props.language].back}
                </Text>
            </Pressable>
        ), });
    }

    renderItem =  ({item, index}) => {
        const { language, darkMode } = this.props;
        console.log("TTT",language);
        return (
            <View style={[styles.flexOne, styles.paddingVertical6]}>
                {/* <Text style={[styles.palanquinRegular, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc, styles.fontSize17, styles.lineHeight22]}> */}
                <Text style={[this.props.darkMode ? styles.white : styles.black, styles.opacity80perc, styles.fontSize17]}>
                    {language == "english" ? item.englishContext : item.assameseContext}
                </Text>
            </View>
        );
    };

    render(){

        const { language, darkMode } = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal24]} >
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.paddingVertical10, styles.row]}>
                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                        {`${strings[language].termsAndConditions.termsAnd} `}
                    </Text>
                    <Text style={[styles.darkGreen, styles.fontSize17]}>
                        {strings[language].termsAndConditions.conditions}
                    </Text>
                </View>
                <View style={[styles.row, styles.paddingVertical10]}>
                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                        {`${strings[language].termsAndConditions.general} `}
                    </Text>
                    <Text style={[styles.darkGreen, styles.fontSize17]}>
                        {strings[language].termsAndConditions.information}
                    </Text>
                </View>
                <FlatList
                    style={[styles.paddingRegular, styles.flexOne]}
                    data={GENERALINFORMATION}
                    renderItem={this.renderItem}
                    numColumns={1}
                    initialNumToRender={10}
                    ref={ref => this.listView = ref}
                    keyExtractor={(item, index) => item.content + index}
                />
                {/* <View style={[styles.row, styles.paddingVertical10]}>
                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                        {`${strings[language].termsAndConditions.data} `}
                    </Text>
                    <Text style={[styles.darkGreen, styles.fontSize17]}>
                        {strings[language].termsAndConditions.sources}
                    </Text>
                </View>
                <FlatList
                    style={[styles.flexOne]}
                    data={DATASOURCES}
                    renderItem={this.renderItem}
                    numColumns={1}
                    initialNumToRender={10}
                    ref={ref => this.listView = ref}
                    keyExtractor={(item, index) => item.content + index}
                /> */}
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
    }
}
function mapDispatchToProps (dispatch) {
    return {
    }
}
const TermsAndConditionsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(TermsAndConditions);
export {TermsAndConditionsScreen}