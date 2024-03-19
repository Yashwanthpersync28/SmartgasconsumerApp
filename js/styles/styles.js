import React from 'react';
import {StyleSheet, Dimensions, Platform, PixelRatio} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


import Colors from './Colors';

const {height, width} = Dimensions.get('window');

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');

  // based on iphone 5s's scale
  const scale = SCREEN_WIDTH  / 360;

  export function normalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) -2
    }
  }

  export function heightValue(size){
    return height/size 
}

export function widthValue(size){
    return width/size 
}

export function screenHeight(size){
    return { height: height/size }
}

export function screenWidth(size){
    return { width: width/size }
}

export const textColor = (type) => {
    return type ? [styles.white] : [styles.black]
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    hidden: {
        display: 'none',
    },
    transparent: {
        opacity: 0
    },
    // ALIGNMENT
    row: {
        flexDirection: 'row',
    },
    rowWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    left: {
        alignItems: "flex-start"
    },
    spaceBetween: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    allCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    selfCenter: {
        alignSelf: 'center'
    },
    centerVertical: {
        justifyContent: 'center',
    },
    centerHorizontal: {
        alignItems: 'center'
    },
    textCenter: {
        textAlign: 'center'
    },
    textAlignVertical: {
        textAlignVertical: 'center'
    },
    textRight: {
        textAlign: 'right'
    },
    textLeft: {
        textAlign: 'left'
    },
    bottomHorizontal: {
        alignItems: 'flex-end'
    },
    // WIDTH
    width: {
        width: '100%',
    },
    width99: {
        width: '99%',
    },
    width20: {
        width: '20%'
    },
    width40: {
        width: '40%'
    },
    width45: {
        width: '45%'
    },
    width70: {
        width: '70%'
    },
    width90: {
        width: '90%'
    },
    width75: {
        width: '75%'
    },
    width80: {
        width: '80%'
    },
    width85: {
        width: '85%'
    },
    width89: {
        width: '89%'
    },
    widthFixed: {
        width
    },
    width95: {
        width: '95%'
    },
    minWidth140: {
        minWidth: 140
    },
    maxWidth160: {
        maxWidth: 160
    },
    // HEIGHT
    height: {
        height: '100%',
    },
    // heightMinus70: {
    //     height: notch ? height - 120 : height - 70,
    // },
    heightFixed: {
        height
    },
    height20: {
        height: '20%'
    },
    height5: {
        height: height/20,
    },
    height10: {
        height: height/10,
    },
    height60: {
        height: height/1.6666,
    },
    height70: {
        height: '70%'
    },
    height80: {
        height: '80%'
    },
    height50: {
        height: '50%'
    },
    height95: {
        height: '95%'
    },
    height60Points: {
        height: height /1.5
    },

    height40Points: {
        height: height /2.2
    },

    height50Points: {
        height: height /1.75
    },

    height30Points: {
        height: height /2.5
    },
    height57: {
        height: '57%'
    },
    // FONTSIZE
    fontSize8: {
        fontSize: normalize(8)
    },

    extraSmallAdvance: {
        fontSize: normalize(9)
    },

    extraSmall: {
        fontSize: normalize(10)
    },
    fontSize11:{
        fontSize: normalize(11)
    },
    small: {
        fontSize: normalize(12)
    },
    fontSize13: {
        fontSize: normalize(13)
    },
    normal: {
        fontSize: normalize(14)
    },
    fontSize15: {
        fontSize: normalize(15)
    },
    regular: {
        fontSize: normalize(16)
    },
    fontSize17: {
        fontSize: normalize(17)
    },

    regularPlus: {
        fontSize: normalize(18)
    },
    fontSize19: {
        fontSize: normalize(19)

    },
    medium: {
        fontSize: normalize(20)
    },
    medium22: {
        fontSize: normalize(22)
    },
    medium24: {
        fontSize: normalize(24)
    },
    fontSize23: {
        fontSize: normalize(23)
    },
    fontSize25: {
        fontSize: normalize(25)
    },
    mediumPlus: {
        fontSize: normalize(27)
    },
    fontSize28: {
        fontSize: normalize(28)
    },
    mediumLarge: {
        fontSize: normalize(30)
    },
    fontSize32: {
        fontSize: normalize(32)
    },
    large: {
        fontSize: normalize(33)
    },
    fontSize36: {
        fontSize: normalize(36)
    },
    extraLarge: {
        fontSize: normalize(40)
    },
    fontSize80: {
        fontSize: normalize(80)

    },
    // LINE HEIGHT
    lineHeight12: {
        lineHeight: PixelRatio.get() < 2.5 ? 8 : 12,
    },
    lineHeight18: {
        lineHeight: 18,
    },
    lineHeight18p: {
        lineHeight: 18,
    },
    lineHeight16: {
        lineHeight: 16,
    },
    lineHeight20: {
        lineHeight: normalize(20),
    },
    lineHeight22: {
        lineHeight: 22,
    },
    lineHeight24: {
        lineHeight: normalize(24),
    },
    lineHeight26: {

        lineHeight: 26,
    },
    lineHeight28: {
        lineHeight: 28,
    },
    lineHeight30: {
        lineHeight: 30,
    },
    // FONT FAMILY
    // COLOR
    white: {
        color: 'white',
    },
    black: {
        color: Colors.black,
    },
    blue: {
        color: Colors.blue,
    },
    green: {
        color: Colors.green,
    },
    darkGreen: {
        color: Colors.darkGreen,
    },
    paleRed: {
        color: Colors.paleRed,
    },
    darkGray: {
        color: Colors.darkGray,
    },
    lightGray: {
        color: Colors.lightGray,
    },
    extraLightGray: {
        color: Colors.extraLightGray,
    },
    orange: {
        color: Colors.orange
    },
    yellow50: {
        color: Colors.yellow50
    },
    // BACKGROUND COLOR
    bgWhite: {
        backgroundColor: Colors.white,
    },
    bgDarkWhite: {
        backgroundColor: Colors.darkWhite,
    },
    bgOffWhite: {
        backgroundColor: Colors.offWhite,
    },
    bgBlack: {
        backgroundColor: Colors.black,
    },
    bgLightBlack: {
        backgroundColor: Colors.lightBlack,
    },
    bgLightGreen: {
        backgroundColor: Colors.lightGreen,
    },
    bgGreen: {
        backgroundColor: Colors.green,
    },
    bgDarkGreen: {
        backgroundColor: Colors.darkGreen,
    },
    bgDarkGray: {
        backgroundColor: Colors.darkGray,
    },
    bgMediumGray: {
        backgroundColor: Colors.mediumGray,
    },
    bgMediumDarkGray: {
        backgroundColor: Colors.mediumDarkGray,
    },
    bgLightGray: {
        backgroundColor: Colors.lightGray,
    },
    bgLightGrey: {
        backgroundColor: Colors.lightGrey,
    },
    bgGrey: {
        backgroundColor: Colors.grey,
    },
    bgExtraMediumLightGray: {
        backgroundColor: Colors.extraMediumLightGray,
    },
    bgIdk: {
        backgroundColor: Colors.idk,
    },
    // padding
    padding2: {
        padding: 2,
    },
    paddingTop2: {
        paddingTop: 2,
    },
    padding1: {
        padding: 1,
    },
    paddingHorizontalZero: {
        paddingHorizontal: 0
    },
    paddingRegularHorizontal: {
        paddingHorizontal: 4
    },
    paddingRegular: {
        padding: 4
    },
    padding6: {
        padding: 6
    },
    padding: {
        padding: 8
    },
    padding10: {
        padding: RFPercentage(1.4)
        // padding:10,
    },
    padding12: {
        padding: 12,
    },
    padding14: {
        padding: 14,
    },
    padding16: {
        padding: 16,
    },
    padding18: {
        padding: 18,
    },
    padding20: {
        padding: 20,
    },
    paddingHorizontal: {
        paddingHorizontal: 8
    },
    paddingHorizontal2: {
        paddingHorizontal: 2
    },
    paddingHorizontal4: {
        paddingHorizontal: 4
    },
    paddingHorizontal6: {
        paddingHorizontal: 6
    },
    paddingHorizontal24: {
        paddingHorizontal: 24
    },
    paddingHorizontal30: {
        paddingHorizontal: 30
    },
    paddingHorizontal32: {
        paddingHorizontal: 32
    },
    paddingHorizontal36: {
        paddingHorizontal: 36
    },
    paddingHorizontal48: {
        paddingHorizontal: 48
    },
    padding24: {
        padding: 24,
    },
    padding28: {
        padding: 28,
    },
    padding32: {
        padding: 32,
    },
    padding40: {
        padding: 40,
    },
    padding46: {
        padding: 46,
    },
    extraPadding: {
        padding: 16
    },

    paddingVertical2: {
        paddingVertical: 2
    },
    paddingVertical4: {
        paddingVertical: 4
    },
    paddingVertical6: {
        paddingVertical: 6,
    },
    paddingVertical: {
        paddingVertical: 8
    },
    paddingVertical10: {
        paddingVertical: 10,
    },
    paddingVertical12: {
        paddingVertical: 12
    },
    extraPaddingVertical: {
        paddingVertical: 16
    },
    paddingVertical16: {
        paddingVertical: 16 ,
    },
    paddingVertical20: {
        paddingVertical: 20
    },
    paddingVertical24: {
        paddingVertical: 24
    },
    paddingVerticalNormal: {
        paddingVertical: 40,
    },
    paddingBottom2: {
        paddingBottom: 2
    },
    paddingBottom4: {
        paddingBottom: 4
    },
    paddingBottom6: {
        paddingBottom: 6
    },
    paddingBottom: {
        paddingBottom: 8
    },
    paddingBottom56: {
        paddingBottom: 56
    },
    paddingBottom10: {
        paddingBottom: 10
    },
    paddingBottom12: {
        paddingBottom: 12
    },
    paddingBottom16Percent: {
        paddingBottom: '18%',
        paddingTop: '8%'
    },
    paddingBottom72: {
        paddingBottom: 72
    },

    paddingBottom12Percent: {
        paddingBottom: height / 8,
    },
    paddingBottom16: {
        paddingBottom: 16
    },
    paddingBottom20: {
        paddingBottom: 20
    },
    paddingBottom24: {
        paddingBottom: 24
    },
    paddingBottom32: {
        paddingBottom: 32
    },
    paddingTop4: {
        paddingTop: 4
    },
    paddingTop6: {
        paddingTop: 6
    },
    paddingTop: {
        paddingTop: 8
    },
    paddingTop10: {
        paddingTop: 10
    },
    paddingTop12: {
        paddingTop: 12,
    },
    paddingTop16: {
        paddingTop: 16,
    },
    paddingTop20: {
        paddingTop: 20,
    },
    paddingTop24: {
        paddingTop: 24,
    },
    paddingTop32: {
        paddingTop: 32,
    },
    paddingTop42: {
        paddingTop: 42,
    },
    paddingTop48: {
        paddingTop: 48
    },
    paddingTop58: {
        paddingTop: RFPercentage(7)
        // paddingTop: 58
    },
    paddingTop72: {
        paddingTop: 72
    },
    paddingTop80: {
        paddingTop: 80
    },
    paddingTopHeader: {
        paddingTop: Platform.OS == "ios" ? height/10 : height/15
    },
    paddingTopHeaderHalf: {
        paddingTop: Platform.OS == "ios" ? height/20 : height/30
    },
    paddingTop6Percent: {
        paddingTop: height/14
    },
    paddingTop12Percent: {
        paddingTop: height/9
    },
    paddingRight4: {
        paddingRight: 4,
    },
    paddingRight10: {
        paddingRight: 10
    },
    paddingRight16: {
        paddingRight: 16
    },
    paddingRight14: {
        paddingRight: 14
    },
    paddingRight24: {
        paddingRight: 24
    },
    paddingLeft4: {
        paddingLeft: 4
    },
    paddingLeft8: {
        paddingLeft: 8
    },
    paddingLeft10: {
        paddingLeft: 10
    },
    paddingLeft12: {
        paddingLeft: 12
    },
    paddingLeft16: {
        paddingLeft: 16
    },
    paddingLeft18: {
        paddingLeft: 18
    },
    paddingLeft20: {
        paddingLeft: 20
    },
    paddingLeft21: {
        paddingLeft: 21
    },
    paddingLeft24: {
        paddingLeft: 24
    },
    paddingLeft40: {
        paddingLeft: 40
    },
    paddingLeft44: {
        paddingLeft: 44
    },
    paddingNormal: {
        padding: 40
    },
    paddingHorizontal10: {
        paddingHorizontal: 10,
    },
    extraPaddingHorizontal: {
        paddingHorizontal: 16
    },
    paddingHorizontal16: {
        paddingHorizontal: 16,
    },
    paddingHorizontal20: {
        paddingHorizontal: 20,
        // paddingHorizontal: RFPercentage(2)
    },
    paddingHorizontalNormal: {
        paddingHorizontal: 24,
    },
    paddingHorizontal40: {
        paddingHorizontal: 40,
    },
    // MARGIN
    Margin10: {
        margin: 10
    },
    Margin20: {
        margin: 20
    },
    margin: {
        margin: 8
    },
    margin6: {
        margin: 6
    },
    negMargin4: {
        margin: 4
    },
    negMarginTop3: {
        marginTop: -3
    },

    extraMargin: {
        margin: 16
    },
    extraMarginHorizontal: {
        marginHorizontal: 16
    },
    marginHorizontal24: {
        marginHorizontal: 24
    },
    marginHorizontal36: {
        marginHorizontal: 36
    },
    marginHorizontal36: {
        marginHorizontal: 36
    },
    marginHorizontal42: {
        marginHorizontal: 42
    },
    marginHorizontal48: {
        marginHorizontal: 48
    },
    marginHorizontal52: {
        marginHorizontal: 52
    },
    marginHorizontal64: {
        marginHorizontal: 64
    },
    marginVertical2: {
        marginVertical: 2
    },
    marginVertical4: {
        marginVertical: 4
    },
    marginVertical: {
        marginVertical: 8
    },
    marginVertical10: {
        marginVertical: 10
    },
    marginVertical12: {
        marginVertical: 12
    },
    marginVertical14: {
        marginVertical: 14
    },
    extraMarginVertical: {
        marginVertical: 16
    },
    marginVerticalNormal: {
        marginVertical: 40,
    },
    marginTop4: {
        marginTop: 4
    },
    marginTop8: {
        marginTop: 8
    },
    marginTop: {
        margin: 16
    },
    marginTop48: {
        marginTop: 48
    },
    marginLeft4: {
        marginLeft: 4,
    },
    marginLeft8: {
        marginLeft: 8,
    },
    marginLeft10: {
        marginLeft: 10,
    },
    marginLeft16: {
        marginLeft: 16,
    },

    marginLeft32: {
        marginLeft: 32
    },
    marginLeft34: {
        marginLeft: 34
    },
    marginRight: {
        marginRight: 4
    },
    marginRight8: {
        marginRight: 8
    },
    marginRight10: {
        marginRight: 10
    },
    marginRight12: {
        marginRight: 12
    },
    marginRight16: {
        marginRight: 16
    },
    marginRight32: {
        marginRight: 32
    },
    marginRight42: {
        marginRight: 42
    },
    marginRight64: {
        marginRight: 64
    },
    marginHorizontal4: {
        marginHorizontal: 4
    },
    marginHorizontal: {
        marginHorizontal: 8
    },
    marginHorizontal10: {
        marginHorizontal: 10
    },
    marginHorizontal16: {
        marginHorizontal: 16
    },
    marginHorizontalNormal: {
        marginHorizontal: 24
    },
    marginHorizontal20: {
        marginHorizontal: 20
    },
    marginTop6Percent: {
        marginTop: height/ 18,
    },
    marginTop8Percent: {
        marginTop: height/ 12,
    },
    marginTop20Percent: {
        marginTop: height/ 5,
    },
    marginBottom5Percent: {
        marginBottom: height/ 19,
    },
    marginBottom30Percent: {
        marginBottom: height/ 7,
    },
    marginTop10: {
        marginTop: 10,
    },
    marginTop18: {
        marginTop: 18,
    },
    marginTop24: {
        marginTop: 24,
    },
    marginTop32: {
        marginTop: 32,
    },

    marginBottom10: {
        marginBottom: 10,
    },
    marginBottom8: {
        marginBottom: 8,
    },
    marginBottom4: {
        marginBottom: 4,
    },
    marginBottom2: {
        marginBottom: 2,
    },
    marginBottom14: {
        marginBottom: 14,
    },
    marginBottomNeg: {
        marginBottom: -2,
    },
    marginBottom16: {
        marginBottom: 16,
    },
    marginBottom24: {
        marginBottom: 24,
    },
    marginBottom32: {
        marginBottom: 32,
    },
    marginBottom42: {
        marginBottom: 42,
    },
    marginBottom64: {
        marginBottom: 64,
    },

    // NO PADDING NO MARGIN
    noPadding: {
        padding: 0
    },
    noPaddingTop: {
        paddingTop: 0,
    },
    noMargin : {
        margin: 0
    },
    noMarginTop : {
        marginTop: 0
    },
    // FLEX AND POSITION
    right: {
        alignSelf: 'flex-end'
    },
    alignLeft: {
        alignSelf: 'flex-start'
    },
    bottom: {
        justifyContent: 'flex-end'
    },
    right0: {
        position: "absolute",
        right: 10,
    },
    justifyContentFlexStart: {
        justifyContent: 'flex-start'
    },
    flexHalf: {
        flex: 0.5
    },
    flexOne: {
        flex: 1
    },
    flexQuarterToOne: {
        flex: .75
    },
    flexOneAndQuarter: {
        flex: 1.3
    },
    flexOneAndHalf: {
        flex: 1.5
    },
    flexTwo: {
        flex: 2
    },
    flexTwoAndHalf: {
        flex: 2.5
    },
    flexTwoAndQuater: {
        flex: 2.75
    },
    flexThree: {
        flex: 3
    },
    flexFour: {
        flex: 4,
    },
    flexFive: {
        flex: 5,
    },
    flexPoint33: {
        flex: 0.33,
    },
    spaceAroundVertical: {
        justifyContent: 'space-around'
    },
    spaceEvenly: {
        justifyContent: "space-evenly"
    },
    flexEndVertical: {
        justifyContent: 'flex-end'
    },
    spaceBetweenVertical: {
        justifyContent: 'space-between',
    },
    flexEndHorizontal: {
        alignItems: 'flex-end'
    },

    flexStartHorizontal: {
        alignItems: 'flex-start'
    },
    absolute: {
        position: 'absolute'
    },
    absoluteZero:{
        top: 0, left: 0, right: 0, bottom: 0,
    },
    relative: {
        position: 'relative'
    },
    // FLEX BASIS
    flexBasis25: {
        flexBasis: RFValue(25)
    },
    flexBasis20: {
        flexBasis: 20
    },
    flexBasis40: {
        flexBasis: 40
    },
    flexBasis80: {
        flexBasis: 80
    },
    flexBasis100: {
        flexBasis: 100
    },
    // RADIUS
    radius2: {
        borderRadius: 2
    },
    radius: {
        borderRadius: 4
    },
    radius6: {
        borderRadius: 6
    },
    radius8: {
        borderRadius: 8
    },
    radius10: {
        borderRadius: 10,
    },
    radiusRight: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
    xRadius: {
        borderRadius: 12
    },
    radius16: {
        borderRadius: 16
        // borderRadius: RFPercentage(2)
    },
    radius18: {
        borderRadius: 18
    },
    radius20: {
        borderRadius: 20
    },
    radius22: {
        borderRadius: 22
    },
    extraRadius: {
        borderRadius: 24
    },
    radius28: {
        borderRadius: 28
    },
    radius32: {
        borderRadius: 32
    },

    radius36: {
        borderRadius: 36
    },

    radiusAll: {
        borderRadius: 8
    },
    radiusTop: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    radiusBottom: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    borderTopRadius40: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    // ELEVATE
    elevate: {
        elevation: 4
    },
    elevate6: {
        elevation: 6
    },
    elevateMild: {
        elevation: 1
    },
    elevateOneAndHalf: {
        elevation: 1.5
    },
    elevate2: {
        elevation: 2
    },
    elevate3: {
        elevation: 3
    },
    elevatePlus: {
        elevation: 8
    },
    // OPACITY
    opacity25perc: {
        opacity: 0.25
    },
    opacity50perc: {
        opacity: 0.5
    },
    opacity80perc: {
        opacity: 0.8
    },
    opacity65perc: {
        opacity: 0.65
    },
    // BORDER
    border: {
        borderWidth: 1
    },
    border2: {
        borderWidth: 2
    },
    border4: {
        borderWidth: 4
    },
    borderTopBold: {
        borderTopWidth: 3,
    },
    borderTransparent2: {
        borderWidth: 2,
        borderColor: "#00000000",
    },
    // IMAGE
    image: {
        height: 30,
        width: 30,
    },
    imageSmall: {
        height: 30,
        width: 30,
    },
    icon: {
        height: 16,
        width: 16,
        borderRadius: 13,
    },
    icon24: {
        height: 24,
        width: 24,
        borderRadius: 12,
    },
    icon28: {
        height: 28,
        width: 28,
        borderRadius: 14,
    },
    icon30: {
        height: 30,
        width: 30,
        borderRadius: 15,
    },
    icon32: {
        height: 32,
        width: 32,
        borderRadius: 16,
    },
    icon40: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    icon50: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    iconSmall: {
        height: 12,
        width: 12,
    },
    iconMedium: {
        height: 20,
        width: 20,
        borderRadius: 10,
    },
    iconNormal: {
        height: 14,
        width: 14,
        borderRadius: 12,
    },
    iconLarge: {
        height: 20,
        width: 20,
    },
    smallCircle1: {
        height: 40,
        width: 40,
        borderRadius: 20,
        // marginRight: 3

    },
    mediumCircle1: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginRight: 3

    },
    mediumImage: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
    largeImage: {
        height: 90,
        width: 90,
        borderRadius: 45
    },
    extraLargeImage: {
        height: PixelRatio.get() < 2.5 ? 120 :140,
        width: PixelRatio.get() < 2.5 ? 120 :140,
        borderRadius: PixelRatio.get() < 2.5 ? 60 :70
    },
    // PROFILE IMAGE
    profilePic: {
        height: height/6, width: height/6, borderRadius: height/2,
        borderWidth:1.5,
        borderColor:'#fff',
        alignSelf:"center",
    },

    profileImage: {
        height:100,
        width: 100,
        borderRadius: 50,
        borderWidth:1.5,
        borderColor:'#fff',
        alignSelf:"center",
      },
    // CIRCLE
    smallCircle: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
    mediumCircle: {
        height: 160,
        width: 160,
        borderRadius: 80
    },
    largeCircle: {
        height: 200,
        width: 200,
        borderRadius: 100
    },
    // Z-INDEX AND OVERFLOW
    zIndex: {
        zIndex: 2
    },
    zIndexMax: {
        zIndex: 999
    },
    zIndexMaxAndShow: {
        zIndex: 999,
        opacity: 1
    },
    zIndexMaximum: {
        zIndex: 40000
    },
    overflow: {
        overflow: 'hidden'
    },
    paleGrey5Overlay: {
        backgroundColor: 'rgba(7, 25, 48, 0.8)',
    },
    bgMidBlueDisabled: {
        backgroundColor: Colors.midBlueDisabled
    },
    bgWhite1: {
        backgroundColor: Colors.white
    },
    // Custom Styles
    buttonWrapperStyle: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        position: 'absolute',
        top: -14,
        // left: 20,
        // right: 20,
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "flex-end",
        // marginHorizontal: 40,
        // backgroundColor:'red',
        // marginHorizontal: 20,
        // paddingHorizontal:20,
        borderColor:'#ffff',
        // paddingHorizontal: 30
    },
    onboardingButton: {
        color: Colors.green,
        fontSize: 14,
        // flex:1,
        justifyContent: "center",
        alignSelf: "center",
        // paddingBottom: 24
    },
    shadow: {
        // borderRadius: 30,
        backgroundColor: '#e4ebe6',

        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.00,
    elevation: 10,
    },
    stack: {
        flex: 1,
    },
    drawerStyles: { flex: 1, width: '60%', paddingLeft: 10, backgroundColor: Colors.darkGray },
    drawerItem: { borderTopWidth: 1,  borderTopColor: '#e4e4e440', opacity: 0.85 },
    drawerSubItem: { borderTopWidth: 1,  borderTopColor: '#e4e4e440', opacity: 0.85, marginLeft: 32 },
    drawerLabel: { color: 'white', marginLeft: -16 , fontSize: normalize(14)},
    shadowBlack: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }


})
