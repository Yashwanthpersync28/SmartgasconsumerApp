import React from "react";
import { View,Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "../../../styles/styles";

export const TableHeader=({data,item,text})=>
{
    const {darkMode}=useSelector((state)=>state.darkMode)

    const TextLine=({children})=>
    {
        return <Text style={[styles.fontSize11,darkMode?styles.white:styles.black]}>
            {children}
        </Text>
    }


    return(
        <View style={[styles.flexOne,styles.row,styles.spaceBetween]}>
            <TextLine>{text}</TextLine>
            {/* <FlatList data={data} renderItem={<TextLine>{item}</TextLine>}/> */}
        </View>
    );
}