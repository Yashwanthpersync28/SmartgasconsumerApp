import React from 'react';
import { View,Text, Dimensions } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
// Constants
// Library
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Colors from 'SmartgasConsumerApp/js/styles/Colors';

import Modal from 'react-native-modal';
const { height, width } = Dimensions.get('window');

export default class ExtendedLoader extends React.Component {
    render() {
        const { counter, message1, message2, message3, message4 } = this.props
        return (
            <View>
                {/* this.props.counter < 11 && this.props.counter > 0 */}
                <Modal isVisible={true} animationInTiming={1000} style={[styles.marginHorizontal24]}>
                    <View style={[styles.allCenter]}>
                        { counter > 5 && counter < 7 ? 
                            <Text style={[styles.white, styles.medium]}>{message1}</Text> : null
                        }
                        {counter > 4 && counter <= 5 ?
                           <Text style={[styles.white, styles.medium, styles.textCenter]}>{message2}</Text> : null
                        }
                        {counter > 2 && counter <= 4 ?
                           <Text style={[styles.white, styles.medium, styles.textCenter]}>{message3}</Text> : null
                        }
                        {counter >= 0 && counter <=2 ?
                            <Text style={[styles.white, styles.medium]}>{message4}</Text> : null
                        }
                    </View>
                    <View style={[styles.allCenter, styles.paddingTop6Percent]}>
                        <AnimatedCircularProgress
                            size={height/6}
                            width={12}
                            fill={100}
                            tintColor={Colors.darkGreen}
                            backgroundColor={"#a2a2a31A"}
                            padding={0}
                            rotation={0}
                            lineCap={'round'}
                            duration={10000}
                            childrenContainerStyle={[{borderRadius:20}]}
                        >
                            {
                                (fill) => (
                                <Text style={[styles.white , styles.regularPlus, styles.selfCenter, styles.marginLeft8]}>
                                    { Math.round(fill)} {'%'}
                                </Text>
                                )
                            }
                        </AnimatedCircularProgress>
                    </View>
                   
                        {/* <View style={[styles.allCenter]}>
                            <Text style={[styles.selfCenter, styles.medium,{position: 'absolute', zIndex:2, top:60, color:'white', borderRadius:100},styles.bgGreen, ]}>{this.props.counter}</Text>
                            <LottieView style={[{height:150},]} source={SETTINGUP.settingUp} autoPlay loop />
                        </View>  */}
                </Modal>
            </View>
        );
    }
}
