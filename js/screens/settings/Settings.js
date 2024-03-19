import React from 'react';
import { Text, View, ScrollView, Pressable, FlatList, Linking } from 'react-native';
import { styles } from '../../styles';
import { connect } from "react-redux";
// Components
import { SettingsCard } from 'SmartgasConsumerApp/js/screens/settings/components/SettingCard'
// Icons
import FIcons from 'react-native-vector-icons/Feather';
// Library
import Modal from 'react-native-modal';
import Rate, { AndroidMarket } from 'react-native-rate';
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { strings } from "SmartgasConsumerApp/js/strings";
import Colors from '../../styles/Colors';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

const Rating = [
    { id: 1},
    { id: 2},
    { id: 3},
    { id: 4},
    { id: 5},
]

class Settings extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            rating: Rating,
            showRating: false,
            rated: false
        }
    }

    renderItem = ({item, index}) => {
        return (
            <Pressable style={[styles.padding2]} onPress={()=> this.setState({ratingIndex: index})}>
                <FIcons name={'star'} size={20} color={item.id <= this.state.ratingIndex+1 ? Colors.green : this.props.darkMode ? Colors.white : Colors.black}/>
            </Pressable>
        );
    }

    render(){
        const {language, darkMode} = this.props;
        console.log("iawhoefanwmevf",this.props.language);
        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingHorizontal20, styles.paddingTopHeader]} >
                <View style={[styles.paddingBottom10, styles.marginHorizontal4]}>
                    <Text style={[darkMode ? styles.white : styles.black, styles.large, styles.palanquinSemiBold]}>
                        {strings[language].settings.settings}
                    </Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[styles.flexOne, styles.paddingBottom10]}>
                        <View style={[styles.row, styles.paddingVertical4, styles.marginHorizontal4]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                                {`${strings[language].settings.profile}  `}
                            </Text>
                            <Text style={[styles.green, styles.fontSize17]}>
                                {strings[language].settings.settings}
                            </Text>
                        </View>
                        <Pressable onPress={()=> this.props.navigation.navigate('Profile')} style={styles.paddingVertical6}>
                            <SettingsCard iconType={'ant'} iconName={'user'} header1 = {`${strings[language].settings.profile} `} header2 = {strings[language].settings.information} body = {strings[language].settings.PIContent} darkMode = {darkMode}/>
                        </Pressable>
                        {/*<Pressable onPress={()=> this.props.navigation.navigate('MultipleAccounts')} style={styles.paddingVertical6}>
                            <SettingsCard iconType={'ant'} iconName={'adduser'}  header1 = {`${strings[language].settings.manage} `} header2 = {strings[language].settings.multipleAccount} body = {strings[language].settings.MMAContent} darkMode = {darkMode}/>
                        </Pressable>*/}
                        <Pressable onPress={()=> this.props.navigation.navigate('ChangePassword')} style={styles.paddingVertical6}>
                            <SettingsCard iconType={'ant'} iconName={'lock'}  header1 = {`${strings[language].settings.change} `} header2 = {strings[language].settings.password} body = {strings[language].settings.CPContent} darkMode = {darkMode}/>
                        </Pressable>
                        <Pressable onPress={()=> this.props.navigation.navigate('MPin', {type: "create"})} style={styles.paddingVertical6}>
                            <SettingsCard iconType={'ant'} iconName={'lock'}  header1 = {`Create `} header2 = {"MPin"} body = {"Create MPin to easy login"} darkMode = {darkMode}/>
                        </Pressable>
                        <View style={[styles.row, styles.paddingVertical6, styles.paddingTop16, styles.marginHorizontal4]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                                {`${strings[language].settings.app} `}
                            </Text>
                            <Text style={[styles.green, styles.fontSize17]}>
                                {strings[language].settings.settings}
                            </Text>
                        </View>
                        <Pressable onPress={()=> this.props.navigation.navigate('ColorMode')} style={ styles.paddingVertical6}>
                            <SettingsCard iconType={'evilIcons'} iconName={'spinner'}  header1 = {`${strings[language].settings.color} `} header2 = {strings[language].settings.mode} body = {strings[language].settings.CMContent} darkMode = {darkMode}/>
                        </Pressable>
                        {/* <Pressable onPress={()=> this.props.navigation.navigate('Language')} style={styles.paddingVertical6}>
                            <SettingsCard iconType={'fontAwesome'} iconName={'language'}  header1 = {this.props.language == "english" ? `${strings[language].settings.change} ` : ""}  header2 = {strings[language].settings.language} body = {strings[language].settings.CLContent} darkMode = {darkMode}/>
                        </Pressable> */}
                        {/* <View style={styles.paddingVertical6}>
                            <SettingsCard header1 = {`${strings[language].settings.updates} `} header2 = {''} body = {strings[language].settings.UContent} darkMode = {darkMode}/>
                        </View> */}
                        {/* <Pressable onPress = {()=> this.props.navigation.navigate('UserManagement')} style = {styles.paddingVertical6}>
                            <SettingsCard iconType={'ant'} iconName={'adduser'}  header1 = {`${strings[language].settings.user} `} header2 = {strings[language].settings.management} body = {strings[language].settings.UMContent} darkMode = {darkMode}/>
                        </Pressable> */}
                        {/* <Pressable onPress = {()=> this.props.navigation.navigate('EnergySavingProgram')} style = {styles.paddingVertical6}>
                            <SettingsCard header1 = {`${strings[language].settings.energy} `} header2 = {strings[language].settings.savingProgram} body = {strings[language].settings.ESPContent} darkMode = {darkMode}/>
                        </Pressable> */}
                        <View style={[styles.row, styles.paddingVertical6, styles.paddingTop16, styles.marginHorizontal4]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                                {`${strings[language].settings.general} `}
                            </Text>
                            <Text style={[styles.green, styles.fontSize17]}>
                                {strings[language].settings.settings}
                            </Text>
                        </View>
                        {/* <Pressable onPress = {()=> this.props.navigation.navigate('MPin')} style = {styles.paddingVertical6}>
                            <SettingsCard iconType={'feather'} iconName={'mail'}  header1 = {`MPin`} header2 = {"Test Screen"} body = {"Temporary Screen"} darkMode = {darkMode}/>
                        </Pressable> */}
                        <Pressable
                            // onPress={()=> {
                            //     // this.setState({ showRating: true })
                            //     const options = {
                            //         AppleAppID:"id1617265809",
                            //         GooglePackageName:"com.sbpdcl.consumerapp&hl=en_IN&gl=US",
                            //         preferInApp:false,
                            //         preferredAndroidMarket: AndroidMarket.Google,
                            //         openAppStoreIfInAppFails:true
                            //     }
                            //     Rate.rate(options, success=>{
                            //         // console.log('options ', options);
                            //         // console.log('option Success', success);
                            //         if (success) {
                            //             // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                            //             this.setState({rated:true, showRating: false})
                            //         }
                            //     })
                            // }}
                            style={styles.paddingVertical6}
                        >
                            <SettingsCard iconType={'ant'} iconName={'hearto'}  header1 = {`${strings[language].settings.rateOur} `} header2 = {this.props.language == "assamese" ? "" : strings[language].settings.app} body = {strings[language].settings.ROAContent} darkMode = {darkMode}/>
                        </Pressable>
                       <View style={[]}>
                            <Modal isVisible={this.state.showRating} animationInTiming={1000} style={[styles.marginHorizontal24,{marginRight:40}]}>
                                <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius20, styles.padding, styles.paddingVertical20]}>
                                    <Pressable onPress={()=> this.setState({ showRating: false })} style={[styles.absolute, {top:-20,right:-20}, styles.icon40, styles.bgMediumGray , styles.allCenter]}>
                                        <FIcons name={'x'} size={20} color={Colors.white}/>
                                    </Pressable>
                                    <View style={[styles.allCenter]}>
                                        <View style={[styles.row, styles.paddingVertical]}>
                                            <Text style={[styles.regular, darkMode ? styles.white:  styles.black]}>
                                                {strings[language].settings.enjoying}
                                            </Text>
                                            <Text style={[styles.regular, styles.green]}>
                                                {` azeriqas-Smartmeter ?`}
                                            </Text>
                                            
                                        </View>
                                        <FlatList
                                            horizontal
                                            style={[styles.paddingBottom4]}
                                            data={this.state.rating}
                                            extraData={this.state.rating}
                                            renderItem={this.renderItem}
                                            numColumns={1}
                                            initialNumToRender={10}
                                            ref={ref => this.listView = ref}
                                            keyExtractor={(item, index) => item.id + index}
                                        />
                                        <View>
                                            <Text style={[styles.opacity65perc, darkMode ? styles.white:  styles.black, styles.small, styles.paddingHorizontal48, styles.paddingBottom10, styles.marginHorizontal, styles.textCenter]}>
                                                {strings[language].settings.ROATitle}
                                            </Text>
                                            <View style={[{borderTopWidth: 1},styles.opacity50perc, styles.marginHorizontal10, darkMode ? { borderColor: Colors.white } : { borderColor: Colors.black }]}/>
                                        </View>
                                    </View>
                                    <View style={[styles.row, styles.spaceBetween, styles.paddingHorizontal16]}>
                                        <View style={[styles.flexOne, styles.row]}>
                                            <View style={[styles.allCenter]}>
                                                <Text style={[darkMode ? styles.white:  styles.black, styles.extraSmall]}>
                                                    Icon
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={[styles.opacity50perc, darkMode ? styles.white:  styles.black, styles.extraSmall]}>
                                                    {strings[language].settings.poweredBy}
                                                </Text>
                                                <Text style={[darkMode ? styles.white:  styles.black, styles.small]}>
                                                    HPSEBL
                                                </Text>
                                            </View>
                                        </View>
                                        {/* <Pressable onPress={()=>  Linking.openURL("market://details?id=com.perisync.bengaluru.mahiti&hl=en_IN&gl=US") } style={[styles.right]}> */}
                                        <Pressable
                                            // onPress={()=>{
                                            //     const options = {
                                            //         AppleAppID:"id1402616611",
                                            //         GooglePackageName:"development.wishes.electricityconsumerportal",
                                            //         preferInApp:false,
                                            //         preferredAndroidMarket: AndroidMarket.Google,
                                            //         openAppStoreIfInAppFails:true
                                            //     }
                                            //     Rate.rate(options, success=>{
                                            //         // console.log('options ', options);
                                            //         // console.log('option Success', success);
                                            //         if (success) {
                                            //             // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                                            //             this.setState({rated:true, showRating: false})
                                            //         }
                                            //     })
                                                 
                                            //             // Linking.openURL('itms-apps://itunes.apple.com/us/app/apple-store/myiosappid?mt=8')
                                            // }}
                                            style={[styles.right]}>
                                            <Text style={[darkMode ? styles.white:  styles.black, styles.normal]}>
                                                {`${strings[language].settings.appStore} >`}
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>
                       </View>
                        <Pressable 
                        onPress = {()=> this.props.navigation.navigate('Feedback')} 
                        style = {styles.paddingVertical6}>
                            <SettingsCard iconType={'feather'} iconName={'mail'}  header1 = {`${strings[language].settings.send} `} header2 = {strings[language].settings.feedback} body = {strings[language].settings.SFContent} darkMode = {darkMode}/>
                        </Pressable>
                        {/* <Pressable 
                         onPress = {()=> this.props.navigation.navigate('SendRequest')}
                         style = {styles.paddingVertical6}>
                            <SettingsCard iconType={'feather'} iconName={'send'}  header1 = {`${strings[language].settings.send} `} header2 = {"Request"} body = {strings[language].settings.SFContent} darkMode = {darkMode}/>
                        </Pressable> */}
                        {/* <Pressable onPress = {()=> this.props.navigation.navigate('CcAvenue')} style = {styles.paddingVertical6}>
                            <SettingsCard iconType={'feather'} iconName={'send'}  header1 = {"CCAvenue"} header2 = {"Test"} body = {strings[language].settings.SFContent} darkMode = {darkMode}/>
                        </Pressable> */}
                        {/* <View style={styles.paddingVertical6}>
                            <SettingsCard header1 = {`${strings[language].settings.complaints} `} header2 = {''} body = {strings[language].settings.CContent} darkMode = {darkMode}/>
                        </View> */}
                        {/* <Pressable onPress = {()=> this.props.navigation.navigate('TermsAndConditions')} style = {styles.paddingVertical6}>
                            <SettingsCard iconType={'feather'} iconName={'eye-off'}  header1 = {`${strings[language].settings.terms} `} header2 = {strings[language].settings.conditions} body = {strings[language].settings.TCContent} darkMode = {darkMode}/>
                        </Pressable> */}
                    </View>
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
const SettingsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
export {SettingsScreen}
