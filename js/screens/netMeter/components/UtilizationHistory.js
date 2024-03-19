import React from 'react';
import { Text, View, Dimensions, Pressable } from 'react-native';
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';
import { styles } from '../../../styles';

class UtilizationHistoryComponent extends React.Component{
    render(){
        const {language, darkMode, title, value, unit} = this.props;

        return(
            <ErrorBoundaryMainComponent>
            <View>
                <View>
                    <Text style={[styles.fontSize13, darkMode ? styles.white : styles.black]}>
                        {title}
                    </Text>
                </View>
                <View>
                    <Text style={[styles.darkGreen, styles.medium, styles.right]}>
                        {value == -1 ? 0 : value}
                    </Text>
                </View>
                <View>
                <Text style={[styles.small, darkMode ? styles.white : styles.black, styles.opacity50perc, styles.right]}>
                        {unit}
                    </Text>
                </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

export default UtilizationHistoryComponent;
