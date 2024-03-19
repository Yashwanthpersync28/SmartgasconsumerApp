import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Colors from "../../styles/Colors";

export class Box extends React.Component{
    render(){
        return(
            <View style={[styles.Container,{minWidth: 120, backgroundColor: Colors.lightyellow, marginRight: 15, marginBottom:15,}]} >
                <View style={[{flex: 1, marginTop:20, marginBottom: 20, justifyContent:"center",} ]}>
                <Text style={styles.Value} >
                    {this.props.Value}
                </Text>

                <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 6}}>
                <Text style={styles.Type}>
                    {this.props.Type}
                </Text>
                    <Text style={[styles.Type,{ textAlign: "right"}]}>
                        {this.props.Type2}
                    </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    Container:{
        // borderWidth:1,
        flex:1,
        justifyContent:"center",
        // alignItems:"center",
        borderRadius:10,
        //      width:100,
        paddingHorizontal:8,
        // marginStart:10,
        //marginBottom:10,
        backgroundColor:'#fff'
    },
    Value:{
        fontSize:26,

    },
    Type:{
        fontSize:14,
        fontWeight:"bold",
        color:"#FFA250",
        textAlignVertical: "center"
    },
})
