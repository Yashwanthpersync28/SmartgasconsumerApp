import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
// Libraries
import LottieView from 'lottie-react-native';
import { NODATA } from 'SmartgasConsumerApp/js/constants/lottie';

const { height, width } = Dimensions.get('window');

class DataNotFound extends React.Component{

    render(){

        const {language, darkMode} = this.props;
        return(
           <View style={[styles.flexOne, styles.allCenter]}>
                <Text style={[styles.paleRed , styles.medium22]}>
                    Data Not Found
                </Text>
                {!this.props.hideLottie && <LottieView style={[{height:width/1.1}]} source={NODATA.APIError} autoPlay loop />}
            </View>
        );
    }
}

export default DataNotFound;
