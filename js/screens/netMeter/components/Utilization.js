import React from 'react';
import { Text, View, Dimensions, Pressable } from 'react-native';
import { styles } from '../../../styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Component
import UtilizationHistoryComponent from './UtilizationHistory'
// Libraries
import { AnimatedCircularProgress } from 'react-native-circular-progress';
// Backend
import {strings} from "SmartgasConsumerApp/js/strings";
import moment from "moment";
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';

class UtilizationComponent extends React.Component{
    render(){
        const {language, darkMode, percent, data} = this.props;

        return(
            <ErrorBoundaryMainComponent>
            <View>
                <View style={[styles.allCenter, styles.flexOne, styles.paddingVertical16]}>
                    <AnimatedCircularProgress
                        size={120}
                        width={12}
                        fill={data.net.percent == -1 ? 0 : data.net.percent}
                        tintColor={Colors.darkGreen}
                        backgroundColor={darkMode ? "#ffffff26" : "#00000026"}
                        padding={0}
                        rotation={0}
                        lineCap={'round'}
                        duration={2000}
                        childrenContainerStyle={[{borderRadius:20}]}
                    >
                        {
                            (fill) => (
                            <Text style={[darkMode ? styles.white : styles.black, styles.regularPlus, styles.selfCenter, styles.marginLeft8]}>
                                { Math.round(fill)} {'%'}
                            </Text>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>
                <View style={[styles.paddingHorizontal10]}>
                    <View style={[styles.row, darkMode ? { borderColor: '#ffffff26' } : { borderColor:'#00000026' } , { borderBottomWidth: 1 }]}>
                        <View style={[styles.flexOne, styles.padding10, styles.paddingHorizontal16, darkMode ? { borderColor: '#ffffff26' } : { borderColor:'#00000026' } ,{ borderRightWidth: 1, paddingLeft: 0}]}>
                            <UtilizationHistoryComponent title={strings[language].netMetering.month} value={moment(data.timestamp).format('MMMM')} unit={moment(data.timestamp).format('YYYY')} darkMode={darkMode}/>
                        </View>                  
                        <View style={[styles.flexOne, styles.padding10, styles.paddingHorizontal16, {paddingRight:0}]}>
                            <UtilizationHistoryComponent title={strings[language].netMetering.savings} value={data.net.value} unit={'Units'} darkMode={darkMode}/>
                        </View>
                    </View>
                    <View style={[styles.row]}>
                        <View style={[styles.flexOne, styles.padding10, styles.paddingHorizontal16,  darkMode ? { borderColor: '#ffffff26' } : { borderColor:'#00000026' } , { borderRightWidth: 1, paddingLeft: 0}]}>
                            <UtilizationHistoryComponent title={strings[language].netMetering.HPSEBInput} value={data.import} unit={'Units'} darkMode={darkMode}/>
                        </View>  
                        <View style={[styles.flexOne, styles.padding10, styles.paddingHorizontal16, {paddingRight:0}]}>
                            <UtilizationHistoryComponent title={strings[language].netMetering.mySolarOutput} value={data.export} unit={'Units'} darkMode={darkMode}/>
                        </View>
                    </View>
                </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default UtilizationComponent;
