import React from 'react';
import { connect } from "react-redux";
import { Text, View, Pressable, Image, TextInput, RefreshControl, Dimensions, FlatList, ScrollView, TouchableOpacity,TouchableWithoutFeedback, Platform } from 'react-native';
import { styles } from '../../styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Icons
import MIcons from 'react-native-vector-icons/MaterialIcons';
import FIcons from 'react-native-vector-icons/Feather';
import EIcons from 'react-native-vector-icons/Entypo';
// Constant
import { UPLOAD_LOADER } from 'SmartgasConsumerApp/js/constants/lottie';
// Libraries
import LottieView from 'lottie-react-native';
import Modal from "react-native-modal"
import * as ImagePicker from "react-native-image-picker";
import moment from "moment"
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'

// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import {strings} from "SmartgasConsumerApp/js/strings";
import {userDetailActions, apiDispatcher} from "../../actions";
import * as profile from "../../api/profile";
import { validateEmailHelper } from '../../helpers/common/validateEmailHelper';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';


const {height, width} = Dimensions.get('window');

class Profile extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            edit: false,
            loading: false,
            profileHistory: []
        }
        this.genderInput;
        this.dobInput;
        this.contactNoInput;
        this.emailInput;
    }

    componentDidMount(){
        console.log("Profile",this.props.profile, this.props.userDetails);
        this.props.navigation.setOptions({ headerRight : ()=> null });
        this.props.navigation.setOptions({ headerLeft : () => (
            <Pressable style={[styles.row,styles.allCenter,styles.paddingHorizontal20]} onPress={() => this.state.edit ? this.setState({edit: false}) :this.props.route?.params?.comingFrom === 'drawer'?this.props.navigation.openDrawer(): this.props.navigation.navigate('/settings')}>
               <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25}/>
                <Text style={[this.props.darkMode ? styles.white : styles.black ,styles.selfCenter,styles.fontSize15,styles.paddingHorizontal6]}>
                    {strings[this.props.language].back}
                </Text>
            </Pressable>
        ), });
        this.syncData()
        console.log('THis.props',this.props);
        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'Profile') {
                    this.props.setCurrentRoute('Profile');
                    this.syncData()
                }
            }
        );
    }

    syncData = () => {
        this.getUpdateHistory()
        let image = this.props.profile.image?.img ? this.props.profile.image?.img : null;
        this.setState({image}, ()=>console.log("eee", this.state.image));
    }

    focusOutAll = () => {
        this.genderInput ? this.genderInput.blur() : null;
        this.dobInput ? this.dobInput.blur() : null;
        this.contactNoInput ? this.contactNoInput.blur() : null;
        this.emailInput ? this.emailInput.blur() : null;
    };

    updateImage = async () => {
        try {
            this.setState({loading:true}, async ()=>{
                let image = this.state.avatarSource
                let update = await this.props.apiDispatcher(profile.updateImageApi(this.props.profile.image?.imageID, image));
                console.log('Update profile',update);
                this.setState({loading: false, image: this.state.avatarSource})
                let prof = await this.props.apiDispatcher(profile.getProfileApi());
                console.log("Image UPdare",prof );

                // const resp = await dispatch(apiDispatcher(profile.getProfileApi()));
                this.props.setProfile(prof.data);
                console.log("aaa",prof, this.state.avatarSource);
                // this.props.setUser(prof.data);
                this.syncData()
            })

        } catch (e) {
            alert("Updating Image Failed");
            this.setState({loading: false});

        }
    };

    updateProfile = async () => {
        try {
            if(this.state.email == "" || this.state.contactNumber == ""){
                alert("Please enter Email and Mobile Number")
            } else if(!validateEmailHelper(this.state.email)) {
                alert("Please provide a valid Email")
            }  else if(this.state.contactNumber.length < 10) {
                alert("Contact number should be only 10 digits")
            } else {
                let update = await this.props.apiDispatcher(profile.updateProfileApi(this.state.email, this.state.contactNumber));
                console.log('Update profile',update);
                this.setState({loading: false, })
                let prof = await this.props.apiDispatcher(profile.getProfileApi());
                alert("Request Sent Successfully")
                this.props.setProfile(prof.data);
                
                // this.getUpdateHistory()
                // this.setState({ edit: !this.state.edit });
                console.log("aaa",prof, this.state.avatarSource);
            }
        } catch (e) {
            alert("Contact Update Failed");
            this.setState({loading: false});
        }
    };

    getUpdateHistory = async () => {
        try {
            this.setState({ loading: true })
            let update = await this.props.apiDispatcher(profile.profileUpdateHistoryApi());
            console.log("asdfawfzsdf", update.data[length-2].email);
            {this.props.profileUpdateHistory.filter(e => e.tblRefId == Math.max(...this.props.profileUpdateHistory.map(o => o.tblRefId))).map(e=> e.mobileNo)[0]}

            this.setState({email: update.data.filter(e => e.tblRefId == Math.max(...update.data.map(o => o.tblRefId))).map(e=> e.email)[0], contactNumber: update.data.filter(e => e.tblRefId == Math.max(...update.data.map(o => o.tblRefId))).map(e=> e.mobileNo)[0]})
            console.log('Profile Update History',update);
            const updateSort = update.data.sort( function ( a, b ) { return b.tblRefId - a.tblRefId; } );
            this.setState({ profileHistory: updateSort })
            this.props.setProfileUpdateHistory(updateSort)

        } catch (e) {
            // alert("Updating Image Failed");
            this.setState({loading: false});

        }
        this.setState({ loading: false })
    };

    pickImage = () => {
        var options = {
            title: 'Select Image',
            storageOptions: { skipBackup: true, path: 'images' },
            quality: .05
        };
        try {
            ImagePicker.default.showImagePicker(options, (response) => {
                console.log('Image picker Response',response,response.assets[0].base64);
                const source = {uri: response.assets[0].base64};
                this.setState({ avatarSource:  "data:image/png;base64," + source.uri },this.updateImage);
            });
        } catch (e) {
            console.log("image picker error",e)
        }
    }



    renderItem = ({item, index}) => {

        const { tblRefId, entryDateTime, email, mobileNo, requestStatus, transferEntryDateTime } = item

        const Info = ({title, value}) => {
            return(
            <View style={[styles.flexOne, styles.marginVertical4]}>
                <Text style={[this.props.darkMode ? styles.white : styles.black, styles.fontSize11]}>{title}</Text>
                <Text style={[styles.white, styles.normal, styles.opacity65perc]}>{value}</Text>
            </View>
            )
        }

        return (
            <View style={[styles.flexOne]}>
                <View style={[styles.flexOne, styles.row]}>
                    <Info title={"Request #"} value={tblRefId}/>
                    <Info title={"Date"} value={moment(entryDateTime).format('DD/MM/YYYY')}/>
                </View>
                <View style={[styles.flexOne, styles.row]}>
                    <Info title={"Email"} value={email}/>
                    <Info title={"Mobile Number"} value={mobileNo}/>
                </View>
                <Info title={"Response Date"} value={transferEntryDateTime == null ? "Pending" : moment(transferEntryDateTime).format('DD/MM/YYYY')}/>
                <Info title={"Remarks"} value={requestStatus}/>
            </View>
        );
    } 

    onRefresh = () => {
        this.setState({ refreshing: true })
        // this.getUpdateHistory()
        this.setState({ refreshing: false })
    }

    onRefreshProfile = async () => {
        this.setState({ refreshing: true })
        // this.getUpdateHistory()
        let prof = await this.props.apiDispatcher(profile.getProfileApi());
        // alert("Request Sent Successfully")
        this.props.setProfile(prof.data);
        this.setState({ refreshing: false })
    }

    render(){

        const ImagePickerButton = ({name, type}) => {
            return(
                <TouchableOpacity onPress={()=> type == 1 ? pickImageFrom("Camera") : type == 2 ? pickImageFrom("Gallery") : this.setState({showModal: false})} style={[styles.bgOffWhite, styles.allCenter, styles.marginVertical4, styles.marginHorizontal6, styles.padding10, styles.radius16]}>
                    <Text style={[type == 3 ? styles.black : styles.green, styles.fontSize17, {fontWeight: 'bold'}]}>{name}</Text>
                </TouchableOpacity>
            )
        }


        // PICK IMAGE
    const pickImageFrom = (type) => {
        var options = {
            includeBase64: true,
            includeExtra: true,
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
                cameraRoll: true,
                waitUntilSaved: true,
            },
            quality: 0.6,
            maxWidth: 500,
            maxHeight: 500,
        };

        try {

            if(type == "Camera"){
                ImagePicker.launchCamera(options, (response) => {
                    console.log('Image Response',response);
                    const source = {uri: response.assets[0].base64};
                    this.setState({ avatarSource:  "data:image/png;base64," + source.uri, showModal: false },this.updateImage);
                });
            } else {
                ImagePicker.launchImageLibrary(options, (response) => {
                    console.log('Image Response',response);
                    const source = {uri: response.assets[0].base64};
                    this.setState({ avatarSource:  "data:image/png;base64," + source.uri, showModal: false },this.updateImage);
                });
            }
            
        } catch (e) {
            console.log("image picker error",e)
        }
    }



        
        console.log(this.props.profile)
        const { language, darkMode, profile } = this.props;
        return(
            <ErrorBoundaryMainComponent>
            {/* // <TouchableWithoutFeedback onPress={this.focusOutAll}> */}
                <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne]}>
                    { !this.state.edit ?
                    <ScrollView  refreshControl={
                            <RefreshControl
                                tintColor={Colors.sunglowYellow}
                                refreshing={false}
                                onRefresh={this.onRefreshProfile} 
                            />
                        }
                        contentContainerStyle={[styles.flexOne, , styles.paddingTopHeaderHalf, styles.paddingHorizontal24]} style={[styles.flexOne]}
                    >
                        <View onPress={()=> this.setState({ showModal: true })} style={[styles.selfCenter, styles.elevate6, styles.centerHorizontal, {marginTop: Platform.OS == "ios" ?  height/20 : height/40}, styles.centerHorizontal, styles.absolute, styles.zIndex]}>
                            <Pressable 
                            // onPress={()=> {this.setState({ avatarSource: "" }); this.updateImage()}}
                             style={[{ zIndex:1, position: 'absolute',top:5, backgroundColor: Colors.paleRed, right: 2, borderRadius:25 }, styles.padding6, styles.allCenter]}>
                                <FIcons name="x" color={Colors.white } size={height*0.028}/>
                            </Pressable>
                            <Pressable
                            //  onPress={()=> this.setState({ showModal: true })}
                             >
                                {this.state.loading ?
                                    <LottieView style={[styles.profilePic,  ]} source={UPLOAD_LOADER.upload} autoPlay loop /> :
                                // profile?.image?.img?
                                //     <Image style={[styles.profilePic, ]} source={{uri: this.state.image}}/> :
                                    <Image style={[styles.profilePic, ]} source={require('SmartgasConsumerApp/assets/images/Nazim.jpg')}/>
                                }
                            </Pressable>
                        </View>
                        <Modal
                            onBackButtonPress={()=> this.setState({showModal: false})}
                            onBackdropPress={()=> this.setState({showModal: false})}
                            isVisible={this.state.showModal}
                            backdropOpacity={0.5}
                            // backdropColor={Colors.greyWhite}
                            style={[{backgroundColor: "transparent", marginTop: 'auto',}, styles.bottom]}
                        >
                            <View style={[ styles.radiusTriple, styles.paddingBottom16]}>
                                <ImagePickerButton name={"Open Camera"} type={1}/>
                                <ImagePickerButton name={"Upload from Gallery"} type={2}/>
                                <ImagePickerButton name={"Cancel"} type={3}/>
                            </View>
                        </Modal>
                        <View style={[{height: Platform.OS == "ios" ? height/8.5 : height/9.5}]}>
                        </View>
                        <View style={[ styles.elevate, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius20, styles.marginVertical14, styles.paddingHorizontal, styles.allCenter]}>
                            <View style={[ {marginTop: height/24}, styles.allCenter]}>
                                <Text style={[darkMode ? styles.white : styles.black, 
                                    // profile.fullName.length > 50 ? styles.fontSize13 :  
                                    styles.medium, styles.textCenter]}>
                                        
                                    {this.props.userDetails.name}
                                </Text>
                                <Text style={[styles.green, styles.normal]}>
                                    {strings[language].profile.caNo}  : {this.props.userDetails.consumerId}
                                </Text>
                            </View>
                            <View  style={[{width: width/2, marginVertical: 8, borderTopWidth:1, borderColor: 'rgba(158, 150, 150, .3)'}]}></View>
                            <View style={[ styles.allCenter, styles.marginHorizontalNormal, styles.marginBottom16]}>
                                <Text style={[ darkMode ? styles.white : styles.black, styles.opacity80perc, styles.textCenter,  styles.selfCenter, 
                                    // this.props.profile.address.length > 60 ? styles.fontSize11 :  
                                    styles.fontSize13]}>
                                    {this.props.profile.address}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.flexFour, styles.padding24, styles.elevate, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius20, styles.paddingVertical10, styles.marginVertical14]}>
                            {/* <Pressable onPress={()=> {  this.state.edit ? this.updateProfile() : this.setState({ edit: true })}}  style={[styles.absolute, styles.zIndex, {right: -10, top: -10}, styles.icon32, styles.bgGreen , styles.allCenter, styles.elevate]}>
                                <FIcons name={this.state.edit ? 'check' : 'edit'} size={14} color={Colors.white}/>
                            </Pressable> */}
                            <View style={[styles.flexOne]}>
                                {/* <View style={[styles.paddingVertical4, styles.flexOne, styles.spaceAroundVertical]}>
                                    <Text style={[darkMode ? styles.white : styles.black, this.state.lableGender ? styles.regular : styles.fontSize19]}>
                                        {strings[language].profile.sanctionedLoad}
                                    </Text>
                                    <View style={[styles.paddingBottom]}>
                                        <Text style={[styles.green, styles.paddingVertical]}>
                                            {profile.sanctionedLoad}
                                        </Text>
                                        <View style={[{ borderColor: 'rgba(158, 150, 150, .3)', borderBottomWidth: 1}]}/>
                                    </View>
                                </View> */}
                                <View style={[styles.paddingVertical4, styles.flexOne, styles.spaceAroundVertical]}>
                                    <Text style={[darkMode ? styles.white : styles.black, this.state.lableDob ? styles.regular : styles.fontSize19]}>
                                        {strings[language].profile.serviceDate}
                                    </Text>
                                    <View style={[styles.paddingBottom]}>
                                        <Text style={[styles.green, styles.paddingVertical]}>
                                            {moment(profile.serviceDate).format("DD/MM/YY")}
                                        </Text>
                                        <View style={[{ borderColor: 'rgba(158, 150, 150, .3)', borderBottomWidth: 1}]}/>
                                    </View>
                                </View>
                                <View style={[styles.paddingVertical4, styles.flexOne, styles.spaceAroundVertical]}>
                                    <Text style={[darkMode ? styles.white : styles.black, this.state.lableDob ? styles.regular : styles.fontSize19]}>
                                        {strings[language].profile.merterServiceNumber}
                                    </Text>
                                    <View style={[styles.paddingBottom]}>
                                        <Text style={[styles.green, styles.paddingVertical]}>
                                            {this.props.userDetails.msn}
                                        </Text>
                                        <View style={[{ borderColor: 'rgba(158, 150, 150, .3)', borderBottomWidth: 1}]}/>
                                    </View>
                                </View>
    
                                <View style={[styles.paddingVertical4, styles.flexOne, styles.spaceAroundVertical,]}>
                                    <Text style={[darkMode ? styles.white : styles.black, this.state.lableEmail ? styles.regular : styles.fontSize19]}>
                                        {strings[language].profile.emailId}
                                    </Text>
                                    <View>
                                        <Text style={[styles.green, styles.paddingVertical]}>
                                            {this.props.userDetails.emailID}
                                            {/* {this.props.profileUpdateHistory.filter(e => e.tblRefId == Math.max(...this.props.profileUpdateHistory.map(o => o.tblRefId))).map(e=> e.email)[0]} */}
                                            {/* {this.props.profileUpdateHistory[this.props.profileUpdateHistory?.length-1]?.email} */}
                                            {/* {this.props.profileUpdateHistory.email} */}
                                        </Text>
                                        <View style={[{ borderColor: 'rgba(158, 150, 150, .3)', borderBottomWidth: 1}]}/>
                                    </View>
                                </View>


                                <View style={[styles.paddingVertical4, styles.flexOne, styles.spaceAroundVertical]}>
                                    <Text style={[darkMode ? styles.white : styles.black, this.state.lableContactNo ? styles.regular : styles.fontSize19]}>
                                        {/* {strings[language].profile.contactNumber} */}
                                    </Text>
                                    <View style={[styles.paddingBottom]}>
                                        <Text style={[styles.green, styles.paddingVertical]}>
                                            {/* {profile.contactNumber}
                                            {this.props.profileUpdateHistory.filter(e => e.tblRefId == Math.max(...this.props.profileUpdateHistory.map(o => o.tblRefId))).map(e=> e.mobileNo)[0]}

                                            {this.props.profileUpdateHistory[this.props.profileUpdateHistory?.length-1]?.mobileNo} */}
                                        </Text>
                                        {/* <View style={[{ borderColor: 'rgba(158, 150, 150, .3)', borderBottomWidth: 1}]}/> */}
                                    </View>
                                </View>
                                <View style={[styles.paddingVertical4, styles.flexOne, styles.spaceAroundVertical]}>
                                    <Text style={[darkMode ? styles.white : styles.black, this.state.lableContactNo ? styles.regular : styles.fontSize19]}>
                                        {/* {strings[language].profile.contactNumber} */}
                                    </Text>
                                    <View style={[styles.paddingBottom]}>
                                        <Text style={[styles.green, styles.paddingVertical]}>
                                            {/* {profile.contactNumber}
                                            {this.props.profileUpdateHistory.filter(e => e.tblRefId == Math.max(...this.props.profileUpdateHistory.map(o => o.tblRefId))).map(e=> e.mobileNo)[0]}

                                            {this.props.profileUpdateHistory[this.props.profileUpdateHistory?.length-1]?.mobileNo} */}
                                        </Text>
                                        {/* <View style={[{ borderColor: 'rgba(158, 150, 150, .3)', borderBottomWidth: 1}]}/> */}
                                    </View>
                                </View>
                                <View style={[styles.paddingVertical4, styles.flexOne, styles.spaceAroundVertical]}>
                                    <Text style={[darkMode ? styles.white : styles.black, this.state.lableContactNo ? styles.regular : styles.fontSize19]}>
                                        {/* {strings[language].profile.contactNumber} */}
                                    </Text>
                                    <View style={[styles.paddingBottom]}>
                                        <Text style={[styles.green, styles.paddingVertical]}>
                                            {/* {profile.mobileNo} */}
                                            {/* {this.props.profileUpdateHistory.filter(e => e.tblRefId == Math.max(...this.props.profileUpdateHistory.map(o => o.tblRefId))).map(e=> e.mobileNo)[0]} */}

                                            {/* {this.props.profileUpdateHistory[this.props.profileUpdateHistory?.length-1]?.mobileNo} */}
                                        </Text>
                                        {/* <View style={[{ borderColor: 'rgba(158, 150, 150, .3)', borderBottomWidth: 1}]}/> */}
                                    </View>
                                </View>


                            </View>
                        
                        </View>
                    </ScrollView>
                    :  <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingHorizontal24, styles.paddingTopHeader]}>
                            <View style={[styles.flexOne, styles.padding24, styles.elevate, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius20, styles.paddingVertical10, styles.marginVertical14]}>
                                <Pressable onPress={()=> {  this.state.edit ? this.updateProfile() : this.setState({ edit: true })}}  style={[styles.absolute, styles.zIndex, {right: -10, top: -10}, styles.icon32, styles.bgGreen , styles.allCenter, styles.elevate]}>
                                    <FIcons name={this.state.edit ? 'check' : 'edit'} size={14} color={Colors.white}/>
                                </Pressable>
                                <Text style={[styles.green, styles.fontSize19, styles.marginTop10]}>Update Contact Details</Text>
                                <View style={[styles.flexOne, styles.spaceEvenly]}>
                                    <View style={[styles.row,{borderColor: Colors.green, borderBottomWidth : 0.7}]}>
                                        <TextInput
                                            value={this.state.email}
                                            placeholder={"Please enter email"}
                                            placeholderTextColor={darkMode ? Colors.grey : Colors.grey}
                                            style={[styles.fontSize17, styles.flexOne, { paddingHorizontal: 0, }, styles.white, styles.paddingRegular]}
                                            ref={(input) => { this.emailInput = input; }}
                                            // onFocus={ () => this.setState({lablePass: true})}
                                            maxLength={25}
                                            onChangeText={text=>{
                                                text.length === 25 && this.emailInput.blur();
                                                this.setState({email: text, error: ''})
                                            }}
                                        />
                                       </View>
                                    <View style={[styles.row,{borderColor: Colors.green, borderBottomWidth : 0.7}]}>
                                        <TextInput
                                            value={this.state.contactNumber}
                                            placeholder={"Please enter Contact Number"}
                                            placeholderTextColor={darkMode ? Colors.grey : Colors.grey}
                                            style={[styles.fontSize17, styles.flexOne, { paddingHorizontal: 0, }, styles.white, styles.paddingRegular]}
                                            ref={(input) => { this.passwordInput = input; }}
                                            keyboardType={'number-pad'}
                                            // onFocus={ () => this.setState({lablePass: true})}
                                            // onBlur={ () => { this.checkPassword(); this.setState({lablePass: false})}}
                                            maxLength={10}
                                            onChangeText={text=>{
                                                text.length === 10 && this.passwordInput.blur();
                                                this.setState({contactNumber: text, error: ''})
                                            }}
                                        />
                                    </View>
                                    <Text style={[darkMode ? styles.white : styles.black, styles.opacity80perc, styles.textCenter, styles.paddingTop4, styles.paleRed,styles.marginTop10, styles.normal]}>
                                       Note: Please update Contact Number through Suvidha App
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.flexThree, styles.padding24, styles.elevate, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius20, styles.marginVertical14]}>
                                <Text style={[styles.green, styles.fontSize19, styles.marginBottom10]}>Contact Update History</Text>
                                { this.state.loading && <View style={[styles.absolute, styles.flexOne, styles.allCenter, {left: 0, right: 0, bottom: 0, top: 0}]}>
                                    <LoaderComponent />
                                </View>}
                                <FlatList 
                                    extraData={this.state.profileHistory}
                                    style={[styles.flexOne]}
                                    // contentContainerStyle={[styles.flexOne]}
                                    data={this.state.profileHistory}
                                    renderItem={this.renderItem}
                                    initialNumToRender={2}
                                    ref={ref => this.listView = ref}
                                    keyExtractor={(item, index) => item.tblRefId + item.mobileNo}
                                    refreshControl={
                                        <RefreshControl
                                            tintColor={Colors.sunglowYellow}
                                            refreshing={this.state.refreshing}
                                            onRefresh={this.onRefresh} 
                                        />
                                    }
                                    ItemSeparatorComponent={() => <View style={[styles.flexOne, styles.marginVertical, {borderColor: Colors.grey, borderBottomWidth: 1}]}/> }
                                />
                                    {/* <Text>{this.props.profileUpdateHistory.}</Text> */}
                            </View>
                        </View> 
                    }
                        {/* <View style={[styles.flexOneAndQuarter, styles.allCenter, styles.elevatePlus]}>
                            <TouchableOpacity style={[styles.padding10, styles.paddingHorizontal36, styles.radius20, styles.bgDarkGreen, styles.allCenter]}>
                                <Text style={[styles.regularPlus, styles.white]}>
                                    {strings[language].update}
                                </Text>
                            </TouchableOpacity>
                        </View> */}
                </View>
        </ErrorBoundaryMainComponent> 
        );
        // </TouchableWithoutFeedback>
    }
}

function mapStateToProps (state) {
    return {
        activeCount: commonSelectors.activeCount(state),
        darkMode: commonSelectors.darkMode(state),
        language: commonSelectors.language(state),
        profile: commonSelectors.profile(state),
        profileUpdateHistory: commonSelectors.profileUpdateHistory(state),
        userDetails: commonSelectors.userDetails(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        setProfile: (data={}) => dispatch(userDetailActions.setProfile(data)),
        setProfileUpdateHistory: (data={}) => dispatch(userDetailActions.setProfileUpdateHistory(data)),
        setUser: (data={}) => dispatch(userDetailActions.setUserDetails(data)),
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const ProfileScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
export {ProfileScreen}
