// import React, {useEffect, useState} from "react";
// import { View } from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";
// import { useSelector } from "react-redux";
// import { styles } from "../../../styles";
// import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

// import Colors from "../../../styles/Colors";
// import { textColor } from "../../../styles/styles";

// export const DropdownComponent = ({key, data, value, setValue, placeholder, zIndex}) => {
//     const darkMode = useSelector((state)=> state.darkMode)

//     const textColorMode = textColor(darkMode)

//     const [open, setOpen] = useState(false)
//     const newData =  data?.map((item, index)=> {
//         let row = {};
//         row.label = item;
//         row.value = item;
//         return row;
//     });
//     const [items, setItems] = useState(newData)
//     const setOpenFunction = (open, op) =>  {
//         setOpen(open)
//     }
    
//     const setValueFunction = (callback, key) => {
//         setValue(callback())
//     }

//     return(
//         <DropDownPicker
//             placeholder={placeholder}
//             open={open}
//             value={value}
//             items={items}
//             setOpen={(callback) => setOpenFunction(callback, setOpen)}
//             setValue={(callback) =>  setValueFunction(callback, setValue)}
//             setItems={(callback) =>  setValueFunction(callback, setItems )}
//             placeholderStyle={{color: Colors.green}}
//             dropDownStyle = {[darkMode ? { backgroundColor: Colors.lightGray, borderWidth:1, borderColor: '#ffffff45' } : { backgroundColor: Colors.white,borderColor: '#00000045', borderWidth:1 }]}
//             containerStyle={{height: 45}}
//             itemStyle={[{ justifyContent: 'flex-start',padding:20, borderBottomWidth:0.5, },darkMode ? { borderColor: '#ffffff45'} : {borderColor: '#00000045'}]}
//             style={{backgroundColor: 'none', borderWidth:0, borderBottomWidth:0.7, borderColor: Colors.darkGreen }}
//             activeLabelStyle={[darkMode ? {color: Colors.white}: {color: Colors.black}]}
//             arrowColor={darkMode ? Colors.white : Colors.black}
//             arrowSize = {RFPercentage(3)}
//             labelStyle={[styles.fontSize17, darkMode ? styles.green : styles.darkGreen,  {left: -10}]}
//             onChangeValue={(value) => {
//             }}
//         /> 
//     )
// }