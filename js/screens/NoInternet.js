import React from "react";
import { View,Text, Button } from "react-native";
import { ButtonText } from "../components/common";


export const NoInternetScreen =({checkInternet})=>
{
    return(<View>
        <Text>xci3ehwd**NoInternet**gcgvcy</Text>
        <Button onPress={checkInternet}></Button>
    </View>);
}