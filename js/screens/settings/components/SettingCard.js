import React from 'react';
import {View, Text} from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import AIcons from 'react-native-vector-icons/AntDesign';
import FIcons from 'react-native-vector-icons/Feather';
import EIIcons from 'react-native-vector-icons/EvilIcons';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';

 class settingsCard extends React.Component{
    render(){
        const { darkMode, iconType, iconName } = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[styles.flexOne,styles.paddingVertical12, styles.marginHorizontal4, styles.row, styles.elevateOneAndHalf, darkMode ? {backgroundColor: Colors.lightBlack} : styles.bgWhite,styles.padding10,styles.radius10]}>
                <View style={[styles.flexOne, styles.allCenter]}>
                    <View style={[styles.icon40, styles.bgLightGreen, styles.allCenter]}>
                        <Text style={[styles.white, styles.normal]}>
                            {iconType == 'ant' ?
                                <AIcons name={iconName} color={'#fff'} size={20}/> :
                                iconType == 'feather'?
                                <FIcons name={iconName} color={'#fff'} size={20}/> :
                                iconType == 'evilIcons'?
                                <EIIcons name={iconName} color={'#fff'} size={32}/> :
                                <FAIcons name={iconName} color={'#fff'} size={20}/> 
                            }
                        </Text>
                    </View>
                </View>
                <View style={[styles.flexFour, styles.centerVertical, styles.paddingHorizontal6]}>
                    <View style={[styles.row]}>
                        <Text style={[styles.regular, darkMode ? styles.white : styles.black]}>
                            {this.props.header1}
                        </Text>
                        <Text style={[styles.regular, styles.green]}>
                            {this.props.header2}
                        </Text>
                    </View>
                    <View style={[styles.paddingVertical2]}>
                        <Text style={[darkMode ? styles.white : styles.lightGray, styles.opacity50perc, styles.fontSize13]}>
                            {this.props.body}
                        </Text>
                    </View>
                </View>
                <View style={[styles.flexHalf, styles.allCenter]}>
                     <Text style={[styles.white, styles.opacity25perc]}>
                        <AIcons name={'right'} color={darkMode ? styles.white : Colors.lightGray} size={16}/>
                     </Text>   
                </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export const SettingsCard = settingsCard