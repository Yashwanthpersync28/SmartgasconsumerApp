import { Provider } from 'react-redux';

import {store} from 'SmartgasConsumerApp/js/reducers/store';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AppContainer } from 'SmartgasConsumerApp/js/App';


const Stack = createStackNavigator();
function AppNav() {

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: forFade,
        }}>
            <Stack.Screen name="App" component={AppContainer}  options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.navigationRef = React.createRef();

  }
  

  render() {

    // const navigationRef = React.useRef(null);
    // const resetToInitialScreen = () => {
    //   navigationRef.current?.reset({
    //     index: 0,
    //     routes: [{ name: 'Home' }],
    //   });
    // };

    return(

        <Provider store={store}>
            <NavigationContainer ref={this.navigationRef}>
                <AppNav/>
            </NavigationContainer>
        </Provider>

    )
  }
}

// import React from 'react';
// import { View, Text, Button } from 'react-native';
// import axios from 'axios';

// const App = () => {
//   // const handleApiCall = async () => {
//   //   try {
//   //     const data = JSON.stringify({"Consno":"017719900000000","PageNo":1,"PageSize":50});
  
//   //     const response = await axios.get('http://cportalgasapi.esyasoft.com/api/Consumer/PaymentDetails', {
//   //       headers: { 
//   //         "Access-Control-Allow-Origin" : "*",
//   //                     "Content-type": "Application/json",
//   //                     "X-Requested-With": "XMLHttpRequest",
//   //       },
//   //       params: data,
//   //     });      console.log(JSON.stringify(response.data));
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   const apiUrl = 'http://cportalgasapi.esyasoft.com/api/Consumer/PaymentDetails';
//   const requestBody = {
//     "consno": "50123266",
//     "PageNo": 1,
//     "PageSize": 10,
//   };

//   // Use useEffect to make the API call when the component mounts
  
//     const fetchData = async () => {
//       const data = JSON.stringify({"Consno": "50123266", "PageNo": 1, "PageSize": 50});

//       try {
//         const response = await axios.post('http://cportalgasapi.esyasoft.com/api/Consumer/PaymentData', data, {
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Content-type": "application/json", // 'application/json' is the correct MIME type
//             "X-Requested-With": "XMLHttpRequest",
//           },
//         });
      
//         console.log("res------->",JSON.stringify(response.data));
//       } catch (error) {
//         console.error("er---->",error);
//       }
      
//     };

//   return (
//     <View>
//       <Button title="Call API" onPress={fetchData} />
//       <Text>Check the console for API response</Text>
//     </View>
//   );
// };

// export default App;


