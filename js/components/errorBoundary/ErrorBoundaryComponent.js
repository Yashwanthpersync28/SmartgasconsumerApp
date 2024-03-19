import React, {useState} from "react";
import  { View, Text, TouchableOpacity } from  "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { useSelector } from "react-redux";
import { errorBoundaryFunction } from "./ErrorBoundaryHandling";

import { SubmitButtonComponent } from "../buttons";

import { ErrorBoundaryScreen } from "./ErrorBoundaryScreen";

export const ErrorBoundaryComponent = ({data, resetError,navigation, onPress}) => {
    const darkMode = useSelector((state) => state.darkMode)


    return(
        <ErrorBoundaryScreen errorMessage={data} navigation={navigation} onPress={()=> { onPress() ; resetError()}} />
  )
}

export const ErrorBoundaryMainComponent = ({children,screenName, onPress}) => {

    const [update, setUpdate] = useState([])

    return(
        <ErrorBoundary onError={errorBoundaryFunction(update, setUpdate,screenName).errorHandler} FallbackComponent={errorBoundaryFunction(update, setUpdate,screenName, onPress).CustomFallback} >
            {children}
        </ErrorBoundary>
    )

}
