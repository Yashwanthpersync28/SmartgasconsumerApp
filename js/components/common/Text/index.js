import React from 'react';
import {Text} from 'react-native';

export function PText(props) {
    return (
        <Text style={props.style}>
            {props.children}
        </Text>
    )
}
