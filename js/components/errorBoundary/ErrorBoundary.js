import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ErrorBoundary from 'react-native-error-boundary'
import { userPost } from '../../api/user'
import { useSelector, useDispatch } from 'react-redux'
import { apiDispatcher } from '../../actions'
import { ExampleMenuScreen } from '../../screens/exampleMenu/ExampleMenuScreen'
import { styles } from '../../styles'
export const ErrorBoundaryView = ({ children, screenName }) => {


  const errorBoundaryFunction = (e) => {
    console.log("error boundery ", e)
    // const dispatch = useDispatch();
    // const user = useSelector((state) => state.user.userDetails);
    // console.log("user:", user);

    let erroeMessage = e.error.message
    let erroeStack = e.error.stack
    let path = screenName
    // let userUid = user.uid

    console.log("erroeMessage:", erroeMessage, "erroeStack:", erroeStack, "screenName:", path, )

    //   let error = await dispatch(apiDispatcher(userPost.errorBoundaryApi({ error:"", uid: "",pagePath:"",roleName:"consumer",stackTrace:"" })));
    // console.log(error)

  }

const errorBoundaryFunctionScreen=(e)=>{
  console.log("error boundery screen", e)
 

  let erroeMessage = e.error.message
  

  console.log("erroeMessage Screen:", erroeMessage,)

  return(
    <View style={[styles.flexOne,styles.allCenter]}>
      <Text style={[styles.black]}>sajnjlsasnc</Text>
    </View>
    // <ExampleMenuScreen errorMessage={"erroeMessage"} />
  )
}



// const [update,setUpdate]=useState([]);
return (
  <ErrorBoundary
  // children={true}
  onError={errorBoundaryFunction} FallbackComponent={errorBoundaryFunctionScreen}
   >
    {children}

  </ErrorBoundary>
)
}

