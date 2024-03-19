import React, {useState} from "react";
import {View, Text} from "react-native"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { apiDispatcher } from "../../../actions";
import { ErrorBoundaryComponent } from "./ErrorBoundaryComponent";
import { userPost } from "../../../api/user";
export const errorBoundaryFunction = (update, setUpdate,screenName, onPress) =>  {
    // const user = useSelector((state) => state.user.userDetails.uid);
    // console.log("user",user)
    // console.log("screenName",screenName)

    // const dispatch = useDispatch()

    const sendError = async (error, stackTrace) => {
        console.log("error,stackTrace",error,".............",stackTrace)       
    //   let resp = await dispatch(apiDispatcher(userPost.errorBoundaryApi({ error:error,pagePath:screenName,role:1,stackTrace:stackTrace,platform: "mobile" })));
            // console.log("Error Boundary Response", resp);
 
    }

    const errorHandler = async (error: string, stackTrace: string) => {
        // update.push(error.toString())
        setUpdate([...update, error.toString()])
        console.log("Error Message", error.toString());
        console.log("Error Trace", stackTrace);
        await sendError(error.message.toString(), stackTrace)


    }
    
    const CustomFallback = (props: { error: Error, resetError: Function, onPress: Function }) => {
        return(
            <ErrorBoundaryComponent data={update} resetError={props.resetError} onPress={onPress}/>
        )
    }

    return {
        errorHandler: errorHandler,
        CustomFallback
    };
}

