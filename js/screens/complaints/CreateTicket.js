// import React from 'react';
// import { Text, View, FlatList, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
// // Styles and Colors
// import { styles } from 'SmartgasConsumerApp/js/styles';
// import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// // Icons
// import SLIcons from 'react-native-vector-icons/SimpleLineIcons';
// import FIcon from 'react-native-vector-icons/Feather';
// import MIcons from 'react-native-vector-icons/MaterialIcons';
// // Library
// import DropDownPicker from 'react-native-dropdown-picker';
// import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

// class CreateTicket extends React.Component{

//     constructor(props) {
//         super(props);
//          this.state = {
//             //  button: false,
//          };
//     }

//     componentDidMount(){

//         this.props.navigation.setOptions({ headerRight : ()=> null });
//         this.props.navigation.setOptions({ headerLeft : () => (
//             <TouchableOpacity style={[styles.row, styles.allCenter]} onPress={() => this.props.navigation.navigate('Complaints')}>
//                <MIcons name="keyboard-arrow-left" color="#fff" size={28}/>
//                 <Text style={[styles.white ,styles.selfCenter, styles.fontSize17, styles.paddingHorizontal10]}>Back</Text>
//             </TouchableOpacity>
//         ), });
//     }

//     renderItem = ({item, index}) => {
//         return (
//             <View style={[styles.row, styles.padding10, styles.marginVertical, styles.bgLightGray, styles.radius8]}>
//                 <Text style={[styles.flexFour, styles.white, styles.lineHeight20]}>
//                     { item.title }
//                 </Text>
//                 <View style={[styles.flexHalf, styles.flexEndHorizontal, styles.centerVertical, styles.opacity65perc]}>
//                     <SLIcons name={"arrow-right"} size={12} color="#fff"/>
//                 </View>
//             </View>
//         );
//     }

//     render(){

//         return(
//             <ErrorBoundaryMainComponent>
//             <View style={[styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal24]} >
//                 <ScrollView>
//                     <View style={[styles.row]}>
//                         <Text style={[styles.fontSize25, styles.white]}>
//                             Register a 
//                         </Text>
//                         <Text style={[styles.fontSize25, styles.green]}>
//                             {' Complain'}
//                         </Text>
//                     </View>
//                     <View>
//                         <Text style={[styles.white, styles.lineHeight22, styles.fontSize15, styles.paddingVertical4]}>
//                             Why APDCL does not give advance notice for Load Shedding/tripping.
//                         </Text>
//                     </View>
//                     <View style={[styles.row]}>
//                         <Text style={[styles.darkGreen, styles.rajdhaniBold, styles.fontSize17]}>
//                             {'1.  '} 
//                         </Text>
//                         <Text style={[styles.white]}>
//                             What is your Complaint about ? 
//                         </Text>
//                     </View>
//                     <DropDownPicker
//                         items={[
//                             {label: 'General Category', value: 'general', icon: () => <FIcon name="flag" size={18} color="#900" />},
//                             {label: 'Billing Category', value: 'billing', icon: () => <FIcon name="flag" size={18} color="#900" />},
//                         ]}
//                         placeholder="Select Category"
//                         // defaultValue={this.state.days}
//                         containerStyle={{height: 40}}
//                         itemStyle={{
//                             justifyContent: 'flex-start'
//                         }} 
//                         // onChangeItem={item => this.setState({
//                         //     days: item // an array of the selected items
//                         // })}

//                         onChangeItem={(item)=>{
//                             // this.setState({days: item});
//                             // this.setState({daysAlpha: DaysAlpha(item)})
//                             // console.log(DaysAlpha(item));
//                         }}
//                     />
//                 </ScrollView>
//             </View>
//             </ErrorBoundaryMainComponent>
//         );
//     }
// }

// export default CreateTicket;