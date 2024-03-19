import React from 'react';
import { View, Text, PixelRatio} from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import LottieView from 'lottie-react-native';
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';

class OnboardingScreens extends React.Component{
    render(){
        const { Image }= this.props;
        console.log('Image',Image);
        return(
            <ErrorBoundaryMainComponent>
            <View style={[styles.flexOne, styles.padding46, styles.bgBlack]}>
                <View style={[styles.flexOneAndHalf]}>
                    <View style={[styles.flexTwo, styles.centerVertical]}>
                        <Text style={[styles.fontSize80, styles.green]}>
                            {this.props.Header1}
                        </Text>
                    </View>
                    <View style={[styles.flexOne, styles.centerVertical]}>
                        <Text style={[styles.fontSize36, styles.white]}>
                        {this.props.Header2}
                        </Text>
                    </View>
                    <View style={[styles.flexOne, styles.centerVertical]}>
                        <Text style={[styles.large, styles.green]}>
                        {this.props.Header3}
                        </Text>
                    </View>
                </View>
                <View style={[styles.flexTwo, styles.allCenter, styles.padding10]}>
                    <LottieView style={[]} source={Image} autoPlay loop />
                </View>
                <View style={[styles.flexOne, styles.justifyContentFlexStart]}>
                    <Text style={[styles.white, styles.regular, styles.lineHeight24]}>
                        {this.props.Body}
                    </Text>
                </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default OnboardingScreens;