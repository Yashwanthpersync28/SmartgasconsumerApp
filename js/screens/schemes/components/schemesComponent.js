import React from 'react';
import { FlatList, Dimensions, Text, View, ScrollView, Pressable, TextInput } from 'react-native';
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';
import { styles } from '../../../styles';

const { height, width } = Dimensions.get('window');

export default class SchemesComponent extends React.Component{
    render(){
        const {language, darkMode} = this.props;

        return(
            <ErrorBoundaryMainComponent>
            <View style={[styles.flexOne, styles.padding20, styles.radius10, darkMode ? styles.bgLightGray : styles.bgWhite]}>
                <Text style={[darkMode ? styles.white : styles.black, styles.regular]}>
                    {this.props.title}
                </Text>
                <Text style={[styles.green, styles.normal]}>
                    {this.props.type}
                </Text>
                <Text style={[darkMode ? styles.white : styles.black, styles.extraSmall, styles.lineHeight16, styles.paddingTop, styles.opacity65perc]}>
                    {this.props.description}
                </Text>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}
 