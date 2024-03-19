import React from 'react';
import { connect } from "react-redux";
import { Text, View, Pressable } from 'react-native';
// STYLES
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Components
import ExtendedLoader from '../../components/common/loader/ExtendedLoader'
// ICONS
import MIcons from 'react-native-vector-icons/MaterialIcons';
import FIcons from 'react-native-vector-icons/Feather';
// BACKEND
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { userDetailActions} from "SmartgasConsumerApp/js/actions";
import { strings } from "SmartgasConsumerApp/js/strings";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
let timer;

class ColorMode extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            counter: 7,
            tapped: false
        };
    }
    
    componentDidMount(){
        this.setState({button:this.props.darkMode})
        this.props.navigation.setOptions({ headerRight : ()=> null });
        this.props.navigation.setOptions({ headerLeft : () => (
            <Pressable style={[styles.row,styles.allCenter,styles.paddingHorizontal20 ]} onPress={() => this.props.navigation.navigate('/settings')}>
                <MIcons name="keyboard-arrow-left" color={this.state.button? Colors.white: Colors.black} size={28}/>
                {/* <Text style={[styles.palanquinRegular,this.state.button? styles.white : styles.black ,styles.selfCenter,styles.fontSize15,styles.paddingHorizontal6,styles.paddingBottom4]}>{strings[this.props.language].back}</Text> */}
                <Text style={[this.state.button? styles.white : styles.black, styles.selfCenter, styles.fontSize15, styles.paddingHorizontal6]}>
                    {strings[this.props.language].back}
                </Text>
            </Pressable>
        ), });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    tick =() => {
        if(this.state.counter < 1) {
            clearInterval(timer);  

            this.setState({ counter: 7, tapped: false })
        }  
        else{
            this.setState({counter: this.state.counter - 1});
        }
        console.log('Counter',this.state.counter);
        if(this.state.counter == 2){
            if(this.props.darkMode==false){
                this.setState({button:true})
                this.props.toggleDarkMode(true)
            }
            else{
                this.setState({button:false})
                this.props.toggleDarkMode(false)   
            }
        }
    }

    switch(){
        this.setState({language: strings[this.props.language].language, tapped: true})
        timer = setInterval(this.tick, 1000);
        this.setState({timer});
    }
    render(){

        const {language, darkMode} = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[{backgroundColor: darkMode ? Colors.black : '#F3ECEC'}, styles.flexOne, styles.paddingTopHeader]} >
                <View style={[styles.paddingHorizontal24]}>
                    <View style={[styles.row, styles.marginVertical2,]}>
                        <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                            {`${strings[language].colorMode.change}  `} 
                        </Text>
                        <Text style={[styles.darkGreen, styles.medium]}>
                            {strings[language].colorMode.colorMode}
                        </Text>
                    </View>
                    <View style={[]} >
                        <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                            {strings[language].colorMode.headerContext}
                        </Text>
                    </View>
                </View>
                
                { this.state.counter < 7 && this.state.counter > 0 ? 
                    <View style={[styles.flexOne]}>
                        <ExtendedLoader
                            counter={this.state.counter < 7 && this.state.counter > 0 ? this.state.counter : false}
                            message1={strings[language].colorMode.message1}
                            message2={`${darkMode ? strings[language].colorMode.changeToLightMode : strings[language].colorMode.changeToDarkMode}`} 
                            message3={strings[language].colorMode.message3}
                            message4={strings[language].colorMode.message4}
                            // message1={"Initialising Color Mode...."}
                            // message2={`Changing to ${darkMode ? "Light Mode" : "Dark Mode"}`}
                            // message3={"Finalizing...."}
                            // message4={"Refreshing Application"}
                        />
                    </View>
                    :
                    <View style={[styles.flexOne]}>
                        <View style={[styles.flexHalf, styles.allCenter]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.medium22, styles.opacity50perc]}>
                                {this.state.button ? strings[language].colorMode.darkMode : strings[language].colorMode.lightMode}
                            </Text>
                        </View>
                        <Pressable disabled={this.state.tapped} onPress={()=> this.switch()} style={[styles.flexOne, styles.allCenter]}>
                            <View style={[styles.shadow, styles.largeCircle, styles.allCenter, darkMode ? { borderWidth: 1, backgroundColor:'#423e3e',borderColor: '#383535'} : {backgroundColor: '#e4ebe6'} ]}>
                                <View style={[styles.shadow, styles.mediumCircle, styles.allCenter, darkMode ? { borderWidth: 1, backgroundColor:'#635c5c',borderColor: '#544e4e'} : {backgroundColor: '#e4ebe6'}]}>
                                    <View style={[styles.smallCircle, styles.shadow, styles.allCenter,darkMode ? { borderWidth: 1, backgroundColor:'#807373',borderColor: '#827676'} : {backgroundColor: '#e4ebe6'}]}>
                                        <View style={[styles.opacity25perc]}>
                                            <FIcons name="power" color={this.state.button? Colors.white: Colors.black} size={28}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                        <View style={[styles.flexOne, styles.allCenter]}>
                            {/* <Text style={[{color:'gray'}, styles.palanquinMedium, styles.medium22, styles.opacity50perc]}>                     */}
                            <Text style={[darkMode ? styles.white : styles.black, styles.medium22, styles.opacity50perc, styles.textCenter]}>
                                {strings[language].colorMode.info}
                            </Text>
                            {/* <Text style={[styles.darkGreen, styles.palanquinMedium, styles.medium22, styles.selfCenter, styles.lineHeight28]}> */}
                            <Text style={[styles.darkGreen, styles.medium22, styles.selfCenter]}>
                                {this.state.button ? strings[language].colorMode.lightMode : strings[language].colorMode.darkMode}
                            </Text>
                        </View>
                    </View>
                }
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default ColorMode;
function mapStateToProps (state) {
    return {
        language: commonSelectors.language(state),
        darkMode: commonSelectors.darkMode(state)
    }
}

function mapDispatchToProps (dispatch) {
    return {
        toggleDarkMode: (data) => dispatch(userDetailActions.setMode(data)),

    }
}

const ColorModeScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(ColorMode);
export {ColorModeScreen};