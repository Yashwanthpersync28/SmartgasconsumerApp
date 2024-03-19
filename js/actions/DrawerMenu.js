import React, { Component } from 'react';
import {StyleSheet, ScrollView, View, Image, TouchableOpacity, Share, Text, Platform} from 'react-native';
import * as _ from "lodash";
import * as commonSelectors from "../../selectors/common";
import {apiDispatcher, logout, userDetailActions} from "../../actions";
import {connect} from "react-redux";
import {BodyText2, ButtonText, HeadingText1, HeadingText3} from "./texts";
import {menuApi} from "../../api/common";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { DrawerItemList } from '@react-navigation/drawer';

import {showLogout} from "../../actions/commonActions";
import Colors from "../../styles/Colors";
import {images} from "../../constants/imageConstants";

class DrawerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList:( props.menu && props.menu.length > 0) ? props.menu : [],
            is_loaded : false,
            selected: "Dashboard",
            selectedSub: "",
            routes: _.map(props.navigation.state.routes, route=> route.routeName)
        }
    }

    UNSAFE_componentWillMount() {
    //
    //     try {
    //       this.getMenu()
    // } catch(err) {
    //         setTimeout(this.getMenu, 5000);
    //     }
    }


    shareMe = () => {
        Share.share({
            message:"Hey, \n" +
                "Bengaluru Mahiti Application, helps to find out the current hospitals treating patients with its current Availability of beds.\nAlongside, it keeps us informed with latest Bengaluru Statistics in various perspectives.\n\n" +
                (Platform.OS === "ios" ? "http://appstore.perisync.com " :" Download it at https://play.google.com/store/apps/details?id=com.perisync.bengaluru.mahiti"),
        })
            .then(result => console.log(result))
            .catch(errorMsg => console.log(errorMsg));
    };

    getMenu = async () => {
    let data = await this.props.apiDispatcher(menuApi(),false);
    this.props.setMenu(data.data);
    this.setState({ is_loaded: true, routes: _.map(this.props.navigation.state.routes, route=> route.routeName)})
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props.currentRoute !== prevProps.currentRoute) {
            this.setState({selected: this.props.currentRoute, selectedSub: this.props.currentRoute === "Dashboard" ?  "" : this.state.selectedSub })
        }

        if(this.props.menu!== prevProps.menu) {
            this.setState({menuList: this.props.menu})
        }

    }

    renderDrawerItems = (menus)=> {
        return menus?.map(m => {
            let path = m.pname.replace(" ", "");
             path = path.replace(" ", "");
             path = path.replace(",", "");
            if (m.Smenu) {
                return m.pid !== 10 ?
                    <>
                    <TouchableOpacity
                        key={m.pid}
                        onPress={() => {
                            this.props.setCurrentRoute(path);

                            this.setState({selected: this.state.selected === path ? "" : path})
                        }}>
                        <View style={{width: '100%', marginTop: 20, height: 30}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 7}}>
                                    <ButtonText style={{marginLeft: 10, color: this.state.selected === path ? Colors.paleRed : "black"}}>{m.pname}</ButtonText>
                                </View>
                                <View style={{flex: 1}}>
                                    <MaterialIcons name={this.state.selected === path ? "keyboard-arrow-down" : "keyboard-arrow-right"} size={28} color="black" />
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>
                        {this.state.selected === path ? this.renderSubmenu(m.Smenu) : null}
                        </>: null;
            } else {
                return m.pid !== 10 ?
                    <TouchableOpacity
                        key={m.pid}
                        onPress={() => {

                            if (this.state.selected === path) {
                                this.props.navigation.toggleDrawer();
                            }
                            if (m.pid === 9)  {
                                this.shareMe() }
                            else {

                                this.setState({selected: path, selectedSub: ""})
                                this.props.setCurrentRoute(path);
                                if (this.state.routes && this.state.routes.length > 0) {
                                    this.state.routes.includes(path) ? this.props.navigation.navigate(path) : this.props.navigation.navigate("ComingSoon", {title: m.pname})

                                }
                            }
                        }}>
                        <View style={{width: '100%', marginTop: 20, height: 30}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>

                                <View style={{flex: 7}}>
                                    <ButtonText style={{marginLeft: 10, color: this.state.selected === path ? Colors.paleRed : "black" }}>{m.pname}</ButtonText>
                                </View>

                            </View>
                        </View>
                    </TouchableOpacity> :  <TouchableOpacity
                        key={m.pid}
                        onPress={() => {
                            this.props.showLogout(true);
                            this.props.navigation.toggleDrawer();
                        }}>
                        <View style={{width: '100%', marginTop: 20, height: 45}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 7}}>
                                    <ButtonText style={{marginLeft: 10,  color: this.state.selected === path ? Colors.paleRed : "black"}}>{m.pname}</ButtonText>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>;
            }
        });
    }

    renderSubmenu = (menus) => {
        return menus?.map(m => {
            let path = m.sname.replace(" ", "");
            path = path.replace(" ", "");
            path = path.replace(",", "");
            path = m.sid === 3 ? path.substr(0,16) : path;

            return <TouchableOpacity
                key={m.sid}
                onPress={() => {
                    if (this.state.selected === path) {
                        this.props.navigation.toggleDrawer();
                    }

                    this.setState({selectedSub: path})
                    this.state.routes.includes(path) ? this.props.navigation.navigate(path) : this.props.navigation.navigate("ComingSoon", {title: m.pname})
                }}>
                <View style={{width: '100%', marginTop: 20, marginLeft: 20, minHeight: 25}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>

                        <View style={{flex: 7}}>
                            <ButtonText style={{marginLeft: 10, color: this.state.selectedSub === path ? Colors.paleRed : "black"}}>{m.sname}</ButtonText>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        });
    };


    render() {
        const menus = this.state.menuList ? this.state.menuList : [];
        //
        // if (( !this.props.menu || this.props.menu.length == 0)){
        //     setTimeout(this.getMenu, 5000);
        //     return(
        //         <View style={{flex: 1, paddingTop: 150}}>
        //         </View>
        //     )
        // }

        return (

            <View style={styles.msnContainer}>

                {/*<HeadingText1 style={{color: Colors.paleRed, paddingLeft:24,  marginTop: 24}}>*/}
                    {/*Bengaluru Mahiti*/}
                {/*</HeadingText1>*/}

                {/*<BodyText2 style={{color: Colors.darkGrey, paddingLeft:24, paddingTop:6}}>*/}
                   {/*{'Data Statistics App \n'}*/}
                {/*</BodyText2>*/}
                <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate("Profile")
                        this.props.setCurrentRoute("Profile");

                        this.setState({selected: "Profile"});
                    }}
                    style={[styles.p1, {marginLeft: 24, marginTop: 32}]}>

                        <View style={{justifyContent:'center'}}>
                            {this.props.userDetails.image? 
                            <Image source={{ uri: this.props.userDetails.image }} style={styles.msnProfileIcon} /> :
                                <Image style={styles.msnProfileIcon} source={images.defaultProfile}/>
                            }
                        </View>
                        <View >
                            <ButtonText style={{fontSize: 20, fontWeight: 'bold', justifyContent:'center', textAlign: "left", paddingLeft: 8, color: "white" }}>
                                Mudasir {this.props.userDetails.name}
                            </ButtonText>
                        </View>
                    <View >
                        <ButtonText style={{fontSize: 20, color: '#fff', fontWeight: 'bold', justifyContent:'center', textAlign: "left", paddingLeft: 8 }}>
                            CA No: 98326839843 {this.props.userDetails.name}
                        </ButtonText>
                    </View>

                </TouchableOpacity>
                <View style={styles.p2}>
                    {/* <HeadingText3 style={{color: Colors.darkGrey, marginLeft: -6}}>
                      {'\n Menu \n'}
                    </HeadingText3> */}
                <ScrollView style={{flex:1}}>
                    <DrawerItemList {...this.props} />
                    {/*{this.renderDrawerItems(menus)}*/}
                </ScrollView>

                    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",flex:0.2}}>
                        <View style={{alignItems:"center"}}>
                            <Text style={{fontWeight:"bold",fontSize:14, color: "white"}}>
                                SBPDCL 2022 - V 1.0.0
                            </Text>
                        </View>
                        {/*<View style={{alignItems:"center"}}>*/}
                            {/*<Image resizeMode="contain" style={{height:20,width:20}} source={require('SmartgasConsumerApp/js/screens/dashboard/Images/heart.png')}/>*/}
                        {/*</View>*/}

                        {/*<View style={{alignItems:"center"}}>*/}
                            {/*<Text  style={{fontWeight:"bold",fontSize:14}}>*/}
                                {/*for*/}
                            {/*</Text>*/}
                        {/*</View>*/}
                        {/*<View style={{alignItems:"center"}}>*/}
                            {/*<Image resizeMode="contain" style={{height:130,width:80}} source={require('SmartgasConsumerApp/js/screens/dashboard/Images/bangalore.png')}/>*/}
                        {/*</View>*/}
                    </View>

                </View>

            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        token: commonSelectors.getToken(state),
        userDetails: commonSelectors.userDetails(state),
        currentRoute: commonSelectors.currentRoute(state),
        menu: commonSelectors.menu(state),


    }
}

function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowAlert) => dispatch(apiDispatcher(apiCall, shouldShowAlert)),
        logout: (state=false) => dispatch(logout(state)),
        showLogout: (state) => dispatch(showLogout(state)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
        setMenu: (data={}) => dispatch(userDetailActions.setMenu(data)),


    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawerMenu);


const styles = StyleSheet.create({
    msnContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.darkGrey,
        paddingTop: 0,
        paddingRight: 0,
        paddingLeft: 0
    },
    p1:{
        paddingLeft:0,
        paddingTop:0,
        margin:0,
        alignItems:'center'
    },
    p2:{
        flex:3.2,
        paddingTop:10,
        paddingLeft:30,
        paddingRight:30
    },
    p3:{
        flex:0.3,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:20,

    },
    imageBG: {
        flex: 1,
        resizeMode: "stretch",
        width: '100%',
        height: '100%',
        flexDirection:'column'
    },
    msnProfileIcon:{
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth:3,
        borderColor: 'white',
    }
});
