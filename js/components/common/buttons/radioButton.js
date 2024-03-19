import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';

export default class RadioButton extends Component {
    constructor() {
        super();
    }

    render() {
        const { size, color, onClick, activeColor } = this.props;
        return (
            <TouchableOpacity onPress={onClick} activeOpacity={0.8} style={[styles.row, styles.allCenter]}>
                <View style={[styles.allCenter, styles.border, { height: size, width: size, borderRadius: size/2,borderColor: activeColor }]}>
                    { this.props.button.selected ? <View style={[styles.allCenter, { height: size / 2, width: size / 2 ,borderRadius: size/4, backgroundColor: color }]}/> : null }
                </View>
                {/* <Text style={[styles.label, { color: color }]}>{this.props.button.label}</Text> */}
            </TouchableOpacity>
        );
    }
}
