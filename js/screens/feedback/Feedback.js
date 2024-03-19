import React from 'react';
import { connect } from "react-redux";
import { Text, View, StatusBar, TextInput, Pressable, TouchableWithoutFeedback, Dimensions, ActivityIndicator } from 'react-native';
// Styles and Colors
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Component
import {Happy,Neutral,Sad} from 'SmartgasConsumerApp/js/screens/feedback/components/Smile';
// Icons
import MIcons from 'react-native-vector-icons/MaterialIcons';
import SLIcons from 'react-native-vector-icons/SimpleLineIcons';
// Libraries
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import {strings} from "SmartgasConsumerApp/js/strings";
import {apiDispatcher, userDetailActions} from "../../actions";
import * as dashboard from "../../api/dashboard";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

const {height, width} = Dimensions.get('window');

class Feedback extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            index: 0,
            selected: '',
            textCount: 0,
        }
    }

    componentDidMount(){
        this.props.navigation.setOptions({ headerRight : ()=> null });
        this.props.navigation.setOptions({ headerLeft : () => (
            <Pressable style={[styles.row,styles.allCenter,styles.paddingHorizontal24]} onPress={() => this.props.navigation.navigate('/settings')}>
                <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25}/>
                <Text style={[this.props.darkMode ? styles.white : styles.black ,styles.selfCenter, styles.fontSize15, styles.paddingHorizontal6]}>
                    {strings[this.props.language].back}
                </Text>
            </Pressable>
        ), });
    }

    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    focusOutAll = () => {
        this.feedbackInput ? this.feedbackInput.blur() : null;
    };

    steps = () =>{
        if(!this.state.selected=='')
            this.setState({index: this.state.index+1})
    };

    sendFeedback = async () => {
        this.setState({loading: true}, async()=> {
        try {
            let data = await this.props.apiDispatcher(dashboard.feedbackApi(
                 this.state.Experience,
                 [
                this.state.sendStatement1, this.state.sendStatement2,this.state.sendStatement3
            ],
                this.state.text
            ))
            console.log("Feedback",data.data);
            this.setState({loading: false});

        } catch (e) {
            // alert(JSON.stringify(e))
            this.setState({loading: false});

            }
        })
    };

    render(){
        const {language, darkMode} = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <TouchableWithoutFeedback onPress={this.focusOutAll}>
                <View style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal32]} >
                    { this.props.darkMode ?  <StatusBar backgroundColor={Colors.black} barStyle='light-content'  /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'/>}
                    <View style={[]}>
                        <View style={[styles.row]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.medium22]}>
                                {`${strings[language].feedback.speakYour} `}
                            </Text>
                            <Text style={[styles.darkGreen, styles.medium22]}>
                                {strings[language].feedback.mind}
                            </Text>
                        </View>
                        <View style={[]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                                {strings[language].feedback.headerContext}
                            </Text>
                        </View>
                    </View>
                    { this.state.index == 0 ?
                        <View style={[{height:width/1.5}, styles.marginVertical10]}>
                            <View style={[styles.bgGreen,styles.padding14, { borderTopLeftRadius: 20, borderTopRightRadius: 20, top: 20, zIndex:-1 }]}/>
                            <View style={[styles.flexOne, styles.bgLightBlack, styles.radius20]}>
                                <View style={[styles.flexOne, styles.allCenter]}>
                                    <Text style={[styles.white, styles.medium]}>
                                        {strings[language].feedback.howWasYour} 
                                    </Text>
                                    <Text style={[styles.green, styles.fontSize28]}>
                                        {`${strings[language].feedback.experience} ?`}
                                    </Text>
                                </View>
                                <View style={[styles.flexOneAndQuarter, styles.row,  styles.allCenter,styles.spaceEvenly]}>
                                    <Pressable onPress={()=> this.setState({selected: strings[language].feedback.sad, Experience: 0})}>
                                        <Sad size={this.state.selected== strings[language].feedback.sad ? width/9 : width/11} color={this.state.selected== strings[language].feedback.sad ? Colors.lightGreen : Colors.green}/>
                                    </Pressable>
                                    <Pressable onPress={()=> this.setState({selected: strings[language].feedback.neutral, Experience: 1})}>
                                        <Neutral size={this.state.selected== strings[language].feedback.happy ? width/9 : width/11} color={this.state.selected== strings[language].feedback.neutral ? Colors.lightGreen : Colors.green}/>
                                    </Pressable>
                                    <Pressable onPress={()=> this.setState({selected: strings[language].feedback.happy, Experience: 2})}>
                                        <Happy size={this.state.selected== strings[language].feedback.happy? width/9 : width/11} color={this.state.selected==strings[language].feedback.happy ? Colors.lightGreen : Colors.green}/>
                                    </Pressable>
                                </View>
                            </View>
                        </View> :   null
                    }
                    { this.state.index == 1 ?
                        <View style={[{ height:width/1.4 }, styles.marginVertical10,]}>
                            <View style={[styles.flexOne, styles.bgLightBlack, styles.radius20]}>
                                <View style={[styles.flexOneAndHalf, styles.allCenter, styles.spaceBetween, styles.paddingHorizontal10, styles.marginHorizontal16, styles.row]}>
                                    <View>
                                        {this.state.selected== strings[language].feedback.sad ? <Sad size={height/30} color={Colors.green}/> : null}
                                        {this.state.selected== strings[language].feedback.neutral ? <Neutral size={height/30} color={Colors.green}/> : null}
                                        {this.state.selected== strings[language].feedback.happy ? <Happy size={height/30} color={Colors.green}/> : null}
                                    </View>
                                    <View style={[styles.row]}>
                                        <Text style={[styles.white, styles.regularPlus]}>
                                            {`${strings[language].feedback.whatMadeYou} `}
                                        </Text>
                                        <Text style={[styles.green, styles.regularPlus]}>
                                            {`${this.Capitalize(this.state.selected)} ?`}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[styles.marginHorizontal16,styles.opacity65perc, { borderBottomColor:Colors.green, borderBottomWidth:1 }]}/>
                                <View style={[styles.flexThree, styles.allCenter,styles.spaceEvenly, styles.padding10]}>
                                    <View style={[styles.flexOne, styles.row, styles.paddingHorizontal16]}>
                                        <View style={[styles.flexOneAndHalf, styles.centerVertical]}>
                                            <Text style={[styles.white, styles.normal]}>
                                                {strings[language].feedback.happyoption1}
                                            </Text>
                                        </View>
                                        <View style={[styles.row, styles.flexOneAndQuarter, styles.spaceBetween]}>
                                            <Pressable onPress={()=> this.setState({statement1: strings[language].feedback.sad, sendStatement1: 0})}>
                                                <Sad size={this.state.statement1== strings[language].feedback.sad ? height/35 : height/45} color={this.state.statement1==strings[language].feedback.sad ? Colors.lightGreen : Colors.green}/>
                                            </Pressable>
                                            <Pressable onPress={()=> this.setState({statement1: strings[language].feedback.neutral, sendStatement1: 1})}>
                                                <Neutral size={this.state.statement1==strings[language].feedback.neutral ? height/35 : height/45} color={this.state.statement1==strings[language].feedback.neutral ? Colors.lightGreen : Colors.green}/>
                                            </Pressable>
                                            <Pressable onPress={()=> this.setState({statement1: strings[language].feedback.happy, sendStatement1: 2})}>
                                                <Happy size={this.state.statement1==strings[language].feedback.happy ? height/35 : height/45} color={this.state.statement1==strings[language].feedback.happy ? Colors.lightGreen : Colors.green}/>
                                            </Pressable>
                                        </View>
                                    </View>
                                    <View style={[styles.flexOne, styles.row, styles.paddingHorizontal16]}>
                                        <View style={[styles.flexOneAndHalf, styles.centerVertical]}>
                                            <Text style={[styles.white, styles.normal]}>
                                                {strings[language].feedback.happyoption2}
                                            </Text>
                                        </View>
                                        <View style={[styles.row, styles.flexOneAndQuarter, styles.spaceBetween]}>
                                            <Pressable onPress={()=> this.setState({statement2: strings[language].feedback.sad, sendStatement2: 0})}>
                                                <Sad size={this.state.statement2==strings[language].feedback.sad ? height/35 : height/45} color={this.state.statement2==strings[language].feedback.sad ? Colors.lightGreen : Colors.green}/>
                                            </Pressable>
                                            <Pressable onPress={()=> this.setState({statement2: strings[language].feedback.neutral, sendStatement2: 1})}>
                                                <Neutral size={this.state.statement2==strings[language].feedback.neutral ? height/35 : height/45} color={this.state.statement2==strings[language].feedback.neutral ? Colors.lightGreen : Colors.green}/>
                                            </Pressable>
                                            <Pressable onPress={()=> this.setState({statement2: strings[language].feedback.happy, sendStatement2: 2})}>
                                                <Happy size={this.state.statement2==strings[language].feedback.happy ? height/35 : height/45} color={this.state.statement2==strings[language].feedback.happy ? Colors.lightGreen : Colors.green}/>
                                            </Pressable>
                                        </View>
                                    </View>
                                    <View style={[styles.flexOne, styles.row, styles.paddingHorizontal16]}>
                                        <View style={[styles.flexOneAndHalf, styles.centerVertical]}>
                                            <Text style={[styles.white, styles.normal]}>
                                                {strings[language].feedback.happyoption3}
                                            </Text>
                                        </View>
                                        <View style={[styles.row, styles.flexOneAndQuarter, styles.spaceBetween]}>
                                            <Pressable onPress={()=> this.setState({statement3: strings[language].feedback.sad, sendStatement3: 0})}>
                                                <Sad size={this.state.statement3==strings[language].feedback.sad ? height/35 : height/45} color={this.state.statement3==strings[language].feedback.sad ? Colors.lightGreen : Colors.green}/>
                                            </Pressable>
                                            <Pressable onPress={()=> this.setState({statement3: strings[language].feedback.neutral, sendStatement3: 1})}>
                                                <Neutral size={this.state.statement3==strings[language].feedback.neutral ? height/35 : height/45} color={this.state.statement3==strings[language].feedback.neutral ? Colors.lightGreen : Colors.green}/>
                                            </Pressable>
                                            <Pressable onPress={()=> this.setState({statement3: strings[language].feedback.happy, sendStatement3: 2})}>
                                                <Happy size={this.state.statement3==strings[language].feedback.happy ? height/35 : height/45} color={this.state.statement3==strings[language].feedback.happy ? Colors.lightGreen : Colors.green}/>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.bgGreen,styles.padding14, { borderBottomLeftRadius: 20, borderBottomRightRadius: 20, top: -20, zIndex:-1 }]}/>
                        </View> : null
                    }
                    { this.state.index == 2 ?
                        <View style={[{height:width/1.2}, styles.marginVertical10,]}>
                            <View style={[styles.flexOne, styles.bgLightBlack, styles.radius20]}>
                                <View style={[styles.flexOneAndHalf, styles.allCenter, styles.spaceBetween, styles.paddingHorizontal10, styles.marginHorizontal16, styles.row]}>
                                    <View>
                                        {this.state.selected== strings[language].feedback.sad ? <Sad size={height/30} color={Colors.green}/> : null}
                                        {this.state.selected==strings[language].feedback.neutral ? <Neutral size={height/30} color={Colors.green}/> : null}
                                        {this.state.selected==strings[language].feedback.happy ? <Happy size={height/30} color={Colors.green}/> : null}
                                    </View>
                                    <View style={[styles.row]}>
                                        <Text style={[styles.white, styles.regularPlus]}>
                                            {`${strings[language].feedback.whatMadeYou} `}
                                        </Text>
                                        <Text style={[styles.green, styles.regularPlus]}>
                                            {`${this.Capitalize(this.state.selected)} ?`}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[styles.marginHorizontal16,styles.opacity65perc, { borderBottomColor:Colors.green, borderBottomWidth:1 }]}/>
                                <View style={[styles.flexFive,{marginHorizontal:width/10}]}>
                                    <View style={[styles.flexThree, styles.bgLightGrey, styles.marginTop10, styles.radius10, styles.padding14]}>
                                        <TextInput
                                            ref={(input) => { this.feedbackInput = input; }}
                                            style={[styles.normal, styles.flexOne, {textAlignVertical: "top"}]}
                                            underlineColorAndroid="transparent"
                                            placeholder={strings[language].feedback.feedback}
                                            placeholderTextColor={Colors.black}
                                            autoCapitalize={false}
                                            value={this.state.text}
                                            maxLength={200}
                                            multiline={true}
                                            onChangeText={(text)=>{
                                                this.setState({textCount: text.length, text})
                                            }}
                                        />
                                    </View>
                                    <View style={[styles.flexOne, styles.row]}>
                                        <View style={[styles.flexTwo, styles.centerHorizontal]}>
                                            <View style={[{
                                                borderRightWidth: RFPercentage(4.5),
                                                borderTopWidth: RFPercentage(4.5),
                                                top:-1,
                                                borderRightColor: 'transparent',
                                                borderTopColor: Colors.lightGrey, justifyContent:"flex-start"}]}
                                            />

                                        </View>
                                        <View style={[styles.flexOneAndHalf, styles.allCenter]}>
                                            <Text style={[styles.white, styles.normal]}>
                                                {this.state.textCount}/200
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.bgGreen,styles.padding14, { borderBottomLeftRadius: 20, borderBottomRightRadius: 20, top: -20, zIndex:-1 }]}/>
                        </View> : null
                    }
                    { this.state.index == 3 ?
                        <View style={[{height:width/1.5}, styles.marginVertical10,]}>
                            <View style={[styles.bgGreen,styles.padding14, { borderTopLeftRadius: 20, borderTopRightRadius: 20, top: 20, zIndex:-1 }]}/>
                            <View style={[styles.flexOne, styles.bgLightBlack, styles.radius20, styles.allCenter]}>
                                <View style={[styles.flexOneAndHalf, styles.allCenter, styles.paddingTop16,{borderColor:'white'}]}>
                                    <Happy size={30} color={Colors.green}/>
                                </View>
                                <View style={[styles.flexOne, styles.allCenter]}>
                                    <Text style={[styles.white, styles.medium22]}>
                                        {strings[language].feedback.thankYouForSharing}
                                    </Text>
                                    <View style={[styles.row, styles.paddingTop2]}>
                                        <Text style={[styles.white, styles.medium22]}>
                                            {`${strings[language].feedback.your} `}
                                        </Text>
                                        <Text style={[styles.green, styles.medium22]}>
                                            {strings[language].feedback.experience}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[styles.paddingVertical12]}>
                                    <Text style={[styles.white, styles.fontSize13]}>
                                        {strings[language].feedback.thanksFooter}
                                    </Text>
                                </View>
                            </View>
                        </View> : null
                    }
                    { this.state.index < 3 ?
                        <View style={[styles.flexQuarterToOne, styles.row, styles.centerVertical, styles.spaceBetween]}>
                            { !this.state.index == 0 ?
                                <View style={[styles.flexOne, styles.left]}>
                                    <Pressable onPress={()=> this.setState({index: this.state.index-1})} style={[styles.bgLightBlack, styles.allCenter, styles.row, styles.padding, styles.radius20, styles.paddingHorizontal24]}>
                                        <SLIcons name={'arrow-left'} size={RFPercentage(1.8)} color={Colors.white}/>
                                        <Text style={[styles.paddingHorizontal10,styles.white, styles.regularPlus]}>
                                            {strings[language].feedback.back}
                                        </Text>
                                    </Pressable>
                                </View> : null
                            }
                            { this.state.index < 2 ?
                                <View style={[styles.flexOne,styles.flexEndHorizontal]}>
                                    <Pressable
                                        onPress={()=> this.steps()}
                                        disabled={
                                            this.state.index == 0 ? this.state.selected ? false : true :
                                            this.state.index == 1 && this.state.statement1 && this.state.statement2 && this.state.statement3 ? false : true} 
                                        style={[
                                            this.state.index == 0 ? this.state.selected ? styles.bgDarkGreen : styles.bgDarkGray : null,
                                            this.state.index == 1 ? this.state.statement1 && this.state.statement2 && this.state.statement3 ? styles.bgDarkGreen : styles.bgDarkGray : null,
                                            styles.allCenter, styles.row, styles.padding, styles.radius20, styles.paddingHorizontal24
                                        ]}>
                                        <Text style={[styles.paddingHorizontal10,styles.white, styles.regularPlus]}>
                                            {strings[language].feedback.next}
                                        </Text>
                                            <SLIcons name={'arrow-right'} size={RFPercentage(1.8)} color={Colors.white}/>
                                    </Pressable>
                                </View>
                                :
                                <View style={[styles.flexOne,styles.flexEndHorizontal]}>
                                    <Pressable disabled={this.state.textCount == '' ? true : false } 
                                    // onPress={async()=> {
                                    //     await this.sendFeedback();
                                    //     this.setState({index: this.state.index+1})}}
                                         style={[ this.state.text ? styles.bgDarkGreen : styles.bgDarkGray, styles.allCenter, styles.row, styles.padding, styles.radius20, styles.paddingHorizontal16]}>
                                        {this.state.loading ? <ActivityIndicator /> :
                                        <Text style={[styles.paddingHorizontal10,styles.white, styles.regularPlus]}>
                                            {strings[language].feedback.submit}
                                        </Text> }
                                    </Pressable>
                                </View>
                            }
                        </View> : null
                    }
                    <View style={[styles.flexTwo, styles.marginBottom24, styles.flexEndVertical, styles.centerHorizontal]}>
                        <Text style={[styles.fontSize17, styles.opacity80perc, darkMode ? styles.white : styles.black]}>
                            {strings[language].footer}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
    }
}
const FeedbackScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Feedback);
export {FeedbackScreen}
