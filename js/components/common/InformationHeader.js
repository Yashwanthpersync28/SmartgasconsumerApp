import React from 'react';
import {View,Text,StyleSheet,Image, PixelRatio} from 'react-native';
import {ProgressBar} from '@react-native-community/progress-bar-android';

export default class InformationHeader extends React.Component{
    render(){
        return(
            <View style={styles.SubContainer} >
                        <View style={styles.SubContainer2}>
                            <View style={styles.SubContainer2View1} >
                            <Text style={styles.SubContainer2Text1}>Covid-19</Text>
                            </View>
                            <View style={styles.SubContainer2View2}>
                                <Text style={styles.SubContainer2Text2}>{this.props.Title}</Text>
                            </View>
                            <View style={[styles.SubContainer2View3]} >
                                {Platform.OS==="ios" ? <View style={{height: 4, width: "100%", backgroundColor: "#00800050"}}>
                                        <View style={{height: 4, width: "50%", backgroundColor: "#008000"}}/>
                                </View>: <ProgressBar color='green'
                                style={{}}
                                    styleAttr="Horizontal"
                                    indeterminate={false}
                                    progress={0.5}
                                />}
                            </View>
                            <View style={styles.SubContainer2View4}>
                                <Text style={styles.SubContainer2Text4}>{this.props.Subject} </Text>
                            </View>
                        </View>
                        <View style={styles.SubContainer1}>
                            <Image resizeMode='contain' style={styles.Image} source={this.props.Image} />
                        </View>
                    </View>
        );
    }
}

const styles= StyleSheet.create({
    SubContainer:{
        flex:1,
       // borderWidth:1,
       // backgroundColor:'#F79E1B',

        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        marginBottom:15,
        paddingLeft:20,

      },
      SubContainer2:{
        flex:2,
        //borderWidth:1,
        justifyContent:"center",
        alignContent:"center",
        alignItems:"flex-start",
      },
      SubContainer2Text1:{
        color:'#1E1E1E',
        fontSize: PixelRatio.getFontScale() > 1.05 ? 13 : 17,
      },
      SubContainer2Text2:{
          color:'#1E1E1E',
          fontSize:  PixelRatio.getFontScale() > 1.05 ? 16 : 20,
          fontWeight:"bold",
      },
      SubContainer2Text3:{
          color:'#1E1E1E',
          fontSize:9,
        // fontWeight:"bold",
      },
    SubContainer2Text4:{
          color:'#1E1E1E',
          fontSize:  PixelRatio.getFontScale() > 1 ? 10: 12,
        // fontWeight:"bold",
      },
      SubContainer2View1:{
          flex:1,
          justifyContent:"center",
      },
      SubContainer2View2:{
          flex:1,
          justifyContent:"center",
      },
      SubContainer2View3:{
          flex:1,
          justifyContent:"center",
          width:200,
      },
      SubContainer2View4:{
          flex:1,
          justifyContent:"center",
      },
      Image:{
        height:120,
        width:120,
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",
        marginRight: 25,

      },
})


