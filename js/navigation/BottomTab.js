import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NotificationsScreen } from 'SmartgasConsumerApp/js/screens/notifications/Notifications';
import { DashboardScreen } from 'SmartgasConsumerApp/js/screens/dashboard/Dashboard';
import { DateWiseDeductionScreen } from "../screens/dateWiseDeduction/DateWiseDeduction";
import { HistoryScreen } from 'SmartgasConsumerApp/js/screens/history/History';    
import { DateWiseConsumptionScreen } from '../screens/dateWiseConsumption/DateWiseConsumption';
import { CcAvenueScreen } from 'SmartgasConsumerApp/js/screens/ccavenue/CcAvenue';
import Colors from "../styles/Colors";
import { BottomTabComponent } from "./components/BottomTabComponent";
import WorkInProgressComponent from "../components/common/workInProgress/WorkInProgress";
import { useDispatch, useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
    const darkMode = useSelector(state => state.darkMode)
    return (
        <Tab.Navigator
             
            tabBarOptions = {{ 
                showLabel: false,
                // widthValue(24)
                style: { 
                    // borderRadius: 24,
                    //  width:50,
                // borderTopLeftRadius: 24, borderTopRightRadius: 24, 
                 borderTopWidth: 1, borderTopColor: Colors.green, borderColor: Colors.green, borderBottomWidth: 0, paddingHorizontal : 20, backgroundColor: darkMode ? Colors.lightGray : Colors.white, overflow: "hidden" 
                } 
            }}  
        >
            <Tab.Screen 
                name="Dashboard" component = { DashboardScreen }
                options={{tabBarIcon: ({ focused, }) => { return (<BottomTabComponent  focused = { focused } Icon =  "home" />)}}}
            />    
            {/* <Tab.Screen 
                name="DateWiseDeduction" component = { DateWiseDeductionScreen }
                options={{tabBarIcon: ({ focused, }) => { return (<BottomTabComponent  focused = { focused } Icon =  "calendar-minus" />)}}}
            />  
            <Tab.Screen 
                name="Settings2" component = { HistoryScreen }
                options={{tabBarIcon: ({ focused, }) => { return (<BottomTabComponent  focused = { focused } Icon =  "history" />)}}}
            />  
            <Tab.Screen 
                name="Settings3" component = { DateWiseConsumptionScreen }
                options={{tabBarIcon: ({ focused, }) => { return (<BottomTabComponent  focused = { focused } Icon =  "calendar-clock" />)}}}
            />   
            <Tab.Screen 
                name="Settings4" component = { CcAvenueScreen  }
                options={{tabBarIcon: ({ focused, }) => { return (<BottomTabComponent  focused = { focused } Icon =  "file-document-outline" />)}}}
            />          */}
        </Tab.Navigator>
    );
}
