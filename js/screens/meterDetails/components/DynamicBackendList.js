// import React, { useEffect, useState } from "react";
// import { FlatList, Text, View } from "react-native";
// import { useSelector } from "react-redux";
// import { styles } from "../../../styles";
// import Colors from "../../../styles/Colors";
// import { textColor } from "../../../styles/styles";

// export const DynamicBackendListComponent = ({ style, data }) => {
//     const darkMode = useSelector((state) => state.darkMode)

//     const renderItem = ({ item }) => {
//         return (
//             <View style={[styles.row]}>
//                 <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24, styles.flexOne]}>
//                     {item.key}
//                 </Text>
//                 <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24, styles.flexOne]}>
//                     {item.value}
//                 </Text>
//             </View>
//         )
//     }

//     return (
//         <View style={[style]}>
//             <View style={[{ marginHorizontal: 2 }, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.padding10, styles.elevate2]}>
//                 <View style={[styles.row]}>
//                     <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
//                         {`Details `}
//                     </Text>
//                     <Text style={[styles.darkGreen, styles.medium]}>
//                         View
//                     </Text>
//                 </View>
//                 <FlatList
//                     data={data}
//                     renderItem={renderItem}
//                     style={[styles.marginHorizontal]}
//                 />
//             </View>
//         </View>

//     )
// }