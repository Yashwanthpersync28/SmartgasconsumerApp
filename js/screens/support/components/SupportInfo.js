import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../../styles';
import Colors from '../../../styles/Colors';
import LottieView from 'lottie-react-native';
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';


class SupportInfoComponent extends React.Component{
    render(){
        const {language, darkMode, name, url, image} = this.props;
        console.log('URL', url);
 
        return(
            <ErrorBoundaryMainComponent>
           <View style={[styles.flexOne, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius, styles.marginBottom10]}>
                <View style={[styles.padding, styles.allCenter]}>
                    <View style={[styles.flexOne,styles.allCenter,{height:60}]}>
                        {/* <LottieView style={[{height:80}]} source={url} autoPlay loop /> */}
                        <Text style={[darkMode ? styles.white : styles.black]}>
                            {image}
                        </Text>
                    </View>
                </View>
                <View style={[styles.border, {borderColor: Colors.green}]}/>
                <View style={[styles.allCenter, styles.padding]}>
                    <Text style={[darkMode ? styles.white : styles.black, styles.small]}>
                        {name}
                    </Text>
                </View>
           </View>
           </ErrorBoundaryMainComponent>
        );
    }
}

export default SupportInfoComponent;
