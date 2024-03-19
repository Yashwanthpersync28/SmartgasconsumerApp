import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../../styles/styles"
import { MPinComponent } from "../../components/common/MPinComponent";
import { verifyMPinApi } from "../../api/login/MPinApi";
import { login } from "../../api";
import { apiDispatcher, performLoginActions } from "../../actions";


export const MPinScreen = ({ navigation, route, ...props }) => {
    const dispatch = useDispatch()

    const { type } = route.params
    // Selectors
    const userID = useSelector(state => state.user)
    // States
    const [password, setPassword] = useState([])
    const [confirmPassword, setConfirmPassword] = useState([])
    const [loading, setLoading] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // API Calls
    const loginWithMPin = async () => {
        const passwordParsed = parseInt(password.join(''));
        setLoading(true)

        try {
            // navigation.navigate("Login")
            let resp = await dispatch(apiDispatcher(login.verifyMPinApi(userID.consumerId, passwordParsed)));
            console.log("Login with MPIN response",userID,props);
            if (resp.data) {
                navigation.navigate("/dashboard")
                // alert("Verified Successfully")
                await dispatch(performLoginActions(resp, "", "mpin"));
                setPassword("");
            }
            setLoading(false)
        } catch (e) {
            console.log("Error", e);
            if (e.status == "failed") {
                alert("Incorrect MPIN, please try again.")
            }
            setLoading(false)
        }
    }

    const createNewMPIN = async () => {
        const passwordParsed = parseInt(password.join(''));
        const confirmPasswordParsed = parseInt(confirmPassword.join(''));
        if (passwordParsed != confirmPasswordParsed) {
            alert("New pin and confirm pin is not matching")
            setConfirmPassword("")
            return
        }
        setLoading(true)
        try {
            const resp = await dispatch(apiDispatcher(login.createMPinApi(passwordParsed, confirmPasswordParsed)));
            console.log("Create MPIN response", resp);
            if (resp.data.status == "success") {
                alert("New MPIN Created Successfully. Now you will be able to login with MPIN");
                setPassword("");
                setConfirmPassword("");
                navigation.goBack()
            }
            setLoading(false)
        } catch (e) {
            console.log("Error", e);
            if (e.status == "failed") {
                alert("Incorrect MPIN, please try again.")
            }
            setLoading(false)
        }
    }

    const onPressReset = () => {
        Alert.alert('Reset MPIN Alert', 'Please login with username and password to create new MPIN at : Settings-> Create MPIN', [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);
    }

    return (
        <View style={[styles.flexOne, { paddingTop: 35 }]}>
            {type == "login" ?
                <MPinComponent 
                // onPressReset={onPressReset} 
                type={type} loading={loading} title={"Login with MPIN"} buttonText={"Submit"} mPin={password} setMPin={setPassword} 
                onPress={() => loginWithMPin()} 
                backPress={() => navigation.goBack()} />
                :
                <View style={[styles.flexOne]}>
                    {!showConfirmPassword ? <MPinComponent loading={loading} title={"Create a MPIN to login"} buttonText={"Create"} mPin={password} setMPin={setPassword} 
                    // onPress={() => setShowConfirmPassword(true)} 
                    backPress={() => navigation.goBack()} />
                        : <MPinComponent loading={loading} title={"Verify a MPIN to login"} buttonText={"Submit"} mPin={confirmPassword} 
                        setMPin={setConfirmPassword} 
                        // onPress={() => createNewMPIN()} 
                        backPress={() => { setShowConfirmPassword(false); setPassword([]) }} />
                    }
                </View>
            }
        </View>
    )
}