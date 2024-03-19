import React from 'react';
import { View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
// Styles and Colors
import { styles } from 'SmartgasConsumerApp/js/styles';
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';

const Sad = class SadSmile extends React.Component{
    render(){
        const {color,size} = this.props;
        return(
            <ErrorBoundaryMainComponent>
           <View>
               <View style={[{ borderWidth:size/6, borderColor: color, height: size*2, width: size*2, borderRadius: size }, styles.allCenter]}>
                    <View style={[{ borderTopWidth:size/10, borderLeftWidth:size/10, borderRightWidth:size/10, borderTopLeftRadius:size/1.5, borderTopRightRadius:size/1.5, width:size, top:size/6, height:size/2, borderColor: color}]}>
                   
                    </View>
                </View>
           </View>
           </ErrorBoundaryMainComponent>
        );
    }
}

const Neutral = class NeutralSmile extends React.Component{
    render(){
        const {color,size} = this.props;
        return(
           <View>
                <View style={[{ borderWidth:size/6, borderColor: color, height: size*2, width: size*2, borderRadius: size }, styles.allCenter]}>
                    <View style={[{ borderTopWidth:size/10, borderLeftWidth:size/10, borderRightWidth:size/10, width:size/1.2, top:size/3, borderColor: color } ]}>
                   
                    </View>
                </View>
           </View>
        );
    }
}

const Happy = class HappySmile extends React.Component{
    render(){
        const {color,size} = this.props;
        return(
           <View>
                <View style={[{ borderWidth:size/6, borderColor: color, height: size*2, width: size*2, borderRadius: size }, styles.allCenter]}>
                    <View style={[{ borderBottomWidth:size/10, borderLeftWidth:size/10, borderRightWidth:size/10, borderBottomLeftRadius:size/1.5, borderBottomRightRadius:size/1.5, width:size, height:size/2, top:size/3, borderColor: color } ]}>
                   
                    </View>
                </View>
           </View>
        );
    }
}
export {Happy, Neutral, Sad};