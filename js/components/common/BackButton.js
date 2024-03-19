import React from 'react';
import { TouchableOpacity, Image} from 'react-native';

import {styles} from "SmartgasConsumerApp/js/styles/styles";
import Entypo from 'react-native-vector-icons/Entypo';


export class BackButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <TouchableOpacity onPress={this.props.onPress} style={[styles.padding, styles.absolute, styles.zIndex, this.props.style,  styles.paddingBottom12, styles.paddingLeft16]}>
                {
                    this.props.image ?
                        <Image source={this.props.image} style={[styles.paddingBottom12, {maxHeight: 24, maxWidth: 24}]} />
                        :
                        <Entypo name={"menu"} color={this.props.darkMode ? "white" : "black"} size={24}/>
                }
            </TouchableOpacity>
        )
    }
}
