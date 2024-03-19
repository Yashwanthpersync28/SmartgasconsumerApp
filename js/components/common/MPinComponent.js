import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { useSelector } from "react-redux";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"
import FIcon from "react-native-vector-icons/Feather"
import { styles } from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../styles/Colors";

export const MPinComponent = ({ title, buttonText, mPin, setMPin, onPress, backPress, loading, type, onPressReset }) => {
    const navigation = useNavigation();
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const pins = [1, 2, 3, 4, 5, 6];
    const darkMode = useSelector(state => state.darkMode);

    useEffect(() => {
        navigation.setOptions({ header: () => null, gestureEnabled: false });
    }, [])

    const renderNumbers = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => mPin.length < 6 && setMPin([...mPin, item])} style={[styles.flexOne, styles.centerHorizontal, styles.marginVertical14]}>
                <Text style={[styles.fontSize36, darkMode ? styles.white : styles.black]}>{item}</Text>
            </TouchableOpacity>
        )
    }

    const renderPins = ({ item, index }) => {
        return (
            <MIcon name={index < mPin.length ? "circle" : "circle-outline"} color={darkMode ? Colors.green : Colors.green} size={26} />
        )
    }

    return (
        <View style={[styles.flexOne, darkMode ? styles.bgBlack : styles.bgIdk, styles.padding16]}>
            <View style={[styles.row, styles.centerHorizontal]}>
                <TouchableOpacity onPress={backPress} style={[styles.padding]}>
                    <MIcon name="arrow-left" size={26} color={darkMode ? Colors.white : Colors.black} />
                </TouchableOpacity>
                <Text style={[styles.flexOne, styles.medium22, darkMode ? styles.white : styles.black, { fontWeight: "bold", top: -2 }]}>{title}</Text>
            </View>
            <View style={[styles.flexOne, , styles.spaceEvenly]}>
                <FlatList
                    horizontal
                    extraData={[mPin, pins]}
                    data={pins}
                    renderItem={renderPins}
                    style={[{
                        flexGrow: 0,
                    },styles.selfCenter,]}
                />
                <View style={[styles.row, styles.spaceEvenly, ]}>
                    <Pressable disabled={mPin.length == 6 ? false : true} onPress={onPress} style={[styles.padding6, mPin.length == 6 ? styles.bgDarkGreen : styles.bgDarkGray, styles.extraRadius, styles.selfCenter]}>
                        {loading ?
                            <View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal20]}>
                                <Text style={[styles.white, styles.regularPlus]}>Loading</Text>
                                <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]} />
                            </View> :
                            <Text style={[styles.white, styles.regular, styles.paddingVertical6, styles.paddingHorizontal30]}>{buttonText}</Text>
                        }
                    </Pressable>
                    {type == "login" && <Pressable onPress={onPressReset} style={[styles.padding6, styles.bgDarkGreen, styles.extraRadius, styles.selfCenter]}>
                        <Text style={[styles.white, styles.regular, styles.paddingVertical6, styles.paddingHorizontal30]}>{"Reset MPIN"}</Text>
                    </Pressable>}
                </View>
               
            </View>
            <View style={[styles.flexOne]}>
                <FlatList
                    data={numbers}
                    renderItem={renderNumbers}
                    numColumns={3}
                    style={[{
                        flexGrow: 0,
                    }]}
                />
                <View style={[styles.row]}>
                    <Text style={[styles.fontSize36, styles.flexOne, styles.textCenter]}></Text>
                    <TouchableOpacity style={[styles.flexOne, styles.allCenter]} onPress={() => mPin.length < 6 && setMPin([...mPin, 0])}>
                        <Text style={[styles.fontSize36, , darkMode ? styles.white : styles.black]}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity delayLongPress={1500} onLongPress={() => setMPin([])} onPress={() => setMPin([...mPin.slice(0, -1)])} style={[styles.fontSize36, styles.flexOne, styles.allCenter]}>{<FIcon name="delete" size={34} color={darkMode ? Colors.white : Colors.black} />}</TouchableOpacity>
                </View>
            </View>
            
        </View>
    )
}