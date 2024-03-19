import React from 'react';

import {PText} from './Text';
import {styles} from 'SmartgasConsumerApp/js/styles/styles';

export function HeadingText1(props) {
    return <PText  {...props}  style={[props.style, styles.h1]}  />;
}

export function HeadingText2(props){
    return <PText  {...props}  style={[props.style, styles.h2]}  />;
}

export function HeadingText3(props){
    return <PText  {...props}  style={[props.style, styles.h3]}  />;
}

export function HeadingText4(props){
    return <PText  {...props}  style={[ props.style, styles.h4]}  />;
}

export function HeadingText5(props){
    return <PText  {...props}  style={[props.style, styles.h5]}  />;
}

export function SubHeadingText5(props){
    return <PText  {...props}  style={[props.style, styles.subH5]}  />;
}

export function HeadingText6(props){
    return <PText  {...props}  style={[props.style, styles.h6]}  />;
}

export function HeadingText7(props){
    return <PText  {...props}  style={[props.style, styles.h7]}  />;
}
export function HeadingText9(props){
    return <PText  {...props}  style={[props.style, styles.h9]}  />;
}
export function HeadingText10(props){
    return <PText  {...props}  style={[props.style, styles.h10]}  />;
}
export function BodyText1(props){
    return <PText  {...props}  style={[props.style, styles.b1]}  />;
}

export function BodyText2(props){
    return <PText  {...props}  style={[props.style, styles.b2]}  />;
}

export function BodyText3(props){
    return <PText  {...props}  style={[props.style, styles.b3]}  />;
}

export function BodyText4(props){
    return <PText  {...props}  style={[props.style, styles.b4]}  />;
}

export function ButtonText(props){
    return <PText  {...props}  style={[props.style, styles.buttonText]}  />;
}

export function ElementText1(props){
    return <PText  {...props}  style={[props.style, styles.e1]}  />;
}

export function ElementText2(props){
    return <PText  {...props}  style={[props.style, styles.e2]}  />;
}

export function ElementText5(props){
    return <PText  {...props}  style={[props.style, styles.e3]}  />;
}

export function CustomText(props){
    return <PText  {...props}  style={[props.style]}  />;
}
