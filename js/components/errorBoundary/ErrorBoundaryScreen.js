import { View, Text, Dimensions, Image } from 'react-native'
import React from 'react'
import {  normalize, screenHeight, screenWidth, styles, widthValue } from '../../styles/styles'
import { useSelector } from 'react-redux'
//components

import { TextComponent } from '../TextComponent'
import { SubmitButtonComponent } from '../buttons/SubmitButtonComponent'
//Library

import { HeaderCommonComponent } from '../../components/view/HeaderCommonComponent'
import { strings } from '../'


export const ErrorBoundaryScreen = ({ navigation, errorMessage, onPress }) => {
    // const { language } = useSelector((state) => state.system)
    let animation = React.createRef();
    const { width,height } = Dimensions.get('window');
    return (
        <View style={[styles.flexOne, styles.marginTop40]}>
            <View style={[styles.flexOne, styles.allCenter]}>
                <View style={[, { width: height/1.8 - 200, height: height/1.8 - 200 }, , { borderRadius: 300 }, styles.bgViolet, styles.allCenter, styles.overFlowHidden]}>
                    <View style={[{ width: height/1.83 - 200, height: height/1.83 - 200 }, { borderRadius: 300 }, styles.allCenter, styles.bgLitePink]}>
                        <View style={[{ width: height/1.85 - 200, height: height/1.85 - 200 }, styles.absolute, styles.allCenter, styles.bgWhite]}>
                            <Image source={require("../../../assets/images/splash1.png")}
                                resizeMode="contain"
                                style={[{ width: height/1.85 - 200 }]}
                            />
                        </View>
                    </View>

                </View>
            </View>
            <View style={[styles.flexOne]}>
                <View style={[styles.paddingTop10, styles.allCenter, styles.rowWrap, styles.marginBottom6, { height: height/9 }]}>
                    <Text style={[styles.fontSize28, styles.fontWeight600, styles.pinkDark]}>Something went </Text>
                    <Text style={[styles.fontSize28, styles.fontWeight600, styles.pinkDark]}>Wrong</Text>
                </View>

                <View style={[styles.flexOne, styles.allCenter]}>
                    <Text style={[styles.fontSize14,styles.fontWeight600,styles.LightPink,styles.textCenter,{lineHeight:24, marginHorizontal: 50}]}>{errorMessage?.map((item, index) => <Text style={[{color: "#9B8787"}]}>{index+ 1}  {item}</Text>)}</Text>
                    {/* <TextComponent name={"somthing is wrong "}
                        style={[styles.fontSize14, styles.fontWeight600, styles.LightPink, styles.textCenter, { lineHeight: 24, marginHorizontal: 50 }]}></TextComponent> */}

                </View>
                <View style={[styles.flexOne, styles.allCenter]}>

                <SubmitButtonComponent
               onPress={onPress}
                style={[styles.bgLitePink,{width:300}]}>
                <Text style={[styles.fontSize17]} >Please come back and try again later.</Text>
              </SubmitButtonComponent>
                </View>
            </View>
        </View>
    )
}

