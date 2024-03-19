import React from "react";
import { View,Text,Dimensions } from "react-native";
import { styles } from "../../styles";
import Colors from "../../styles/Colors";
import { connect } from "react-redux";

import MIcons from 'react-native-vector-icons/MaterialIcons';

import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import {strings} from "SmartgasConsumerApp/js/strings";
import {userDetailActions, apiDispatcher} from "../../actions";
import * as profile from "../../api/profile";
import { validateEmailHelper } from '../../helpers/common/validateEmailHelper';
import { ErrorBoundaryMainComponent } from "../../components/errorBoundary/ErrorBoundaryComponent";


const {height, width} = Dimensions.get('window');

class ContactUpdate extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            edit: false,
            loading: false,
            profileHistory: []
        }
    }

    componentDidMount(){
        console.log("Profile",this.props.profile, this.props.userDetails);
        this.props.navigation.setOptions({ headerRight : ()=> null });
        this.props.navigation.setOptions({ headerLeft : () => (
            <Pressable style={[styles.row,styles.allCenter,styles.paddingHorizontal20]} onPress={() => this.state.edit ? this.setState({edit: false}) : this.props.navigation.navigate('/settings')}>
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
    }


    getUpdateHistory = async () => {
        try {
            this.setState({ loading: true })
            let update = await this.props.apiDispatcher(profile.profileUpdateHistoryApi());
            // console.log("asdfawfzsdf", update.data[length-2].email);
            // {this.props.profileUpdateHistory.filter(e => e.tblRefId == Math.max(...this.props.profileUpdateHistory.map(o => o.tblRefId))).map(e=> e.mobileNo)[0]}

            this.setState({email: update.data.filter(e => e.tblRefId == Math.max(...update.data.map(o => o.tblRefId))).map(e=> e.email)[0], contactNumber: update.data.filter(e => e.tblRefId == Math.max(...update.data.map(o => o.tblRefId))).map(e=> e.mobileNo)[0]})
            console.log('Profile Update History',update);
            const updateSort = update.data.sort( function ( a, b ) { return b.tblRefId - a.tblRefId; } );
            this.setState({ profileHistory: updateSort })
            this.props.setProfileUpdateHistory(updateSort)

        } catch (e) {
            alert("Updating Image Failed");
            this.setState({loading: false});

        }
        this.setState({ loading: false })
    };



    render(){
        console.log("");
        return(
            <ErrorBoundaryMainComponent>
            <View>
                
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
        profile: commonSelectors.profile(state),
        profileUpdateHistory: commonSelectors.profileUpdateHistory(state),
        userDetails: commonSelectors.userDetails(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        // setProfile: (data={}) => dispatch(userDetailActions.setProfile(data)),
        setProfileUpdateHistory: (data={}) => dispatch(userDetailActions.setProfileUpdateHistory(data)),
        setUser: (data={}) => dispatch(userDetailActions.setUserDetails(data)),
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const ContactUpdateScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactUpdate);
export {ContactUpdateScreen}
