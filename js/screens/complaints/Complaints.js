import React from 'react';
import { connect } from "react-redux";
import { Text, View, FlatList,ScrollView, TouchableHighlight } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import SLIcons from 'react-native-vector-icons/SimpleLineIcons';
// Component
import WorkInProgressComponent from '../../components/common/workInProgress/WorkInProgress'
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

class Complaints extends React.Component{

    constructor(props) {
        super(props);
         this.state = {
         };
    }

    renderItem = ({item, index}) => {
        const {language, darkMode} = this.props;

        return (
            <ErrorBoundaryMainComponent>
            <View style={[styles.row, styles.padding10, styles.marginVertical, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius8]}>
                <Text style={[styles.flexFour, styles.white, styles.lineHeight20, darkMode ?  styles.white : styles.black]}>
                    { item.title }
                </Text>
                <View style={[styles.flexHalf, styles.flexEndHorizontal, styles.centerVertical, styles.opacity65perc]}>
                    <SLIcons name={"arrow-right"} size={12} color="#fff"/>
                </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }

    render(){
        const {language, darkMode} = this.props;

        return(
            // <View style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal24]} >
            //     <ScrollView showsHorizontalScrollIndicator={false}>
            //     <View style={[styles.row]}>
            //         <Text style={[styles.fontSize25, darkMode ?  styles.white : styles.black]}>
            //             Register a 
            //         </Text>
            //         <Text style={[styles.fontSize25, styles.green]}>
            //             {' Complain'}
            //         </Text>
            //     </View>
            //     <View>
            //         <Text style={[darkMode ?  styles.white : styles.black, styles.lineHeight20, styles.fontSize15, styles.paddingVertical4]}>
            //             Click on the Button below to open or create a complaint case ticket.
            //         </Text>
            //     </View>
            //     <View style={[styles.allCenter, styles.paddingVertical20, { borderBottomWidth: 1, borderColor: Colors.green50 }]}>
            //         <TouchableHighlight onPress={()=> this.props.navigation.navigate('CreateTicket')} style={[styles.bgGreen, styles.padding, styles.paddingHorizontal20, styles.radius32]}>
            //             <Text style={[styles.white , styles.regularPlus, styles.opacity80perc]}>
            //                 Create a Ticket
            //             </Text>
            //         </TouchableHighlight>
            //     </View>
            //     <View style={[styles.row, styles.paddingVertical2, styles.paddingTop16]}>
            //             <Text style={[darkMode ?  styles.white : styles.black, styles.fontSize17]}>
            //                 {'General '}
            //             </Text>
            //             <Text style={[styles.green, styles.fontSize17]}>
            //                 Category
            //             </Text>
            //         </View>
            //         <FlatList 
            //             style={[styles.flexOne]}
            //             data={GENERALSECTION}
            //             renderItem={this.renderItem}
            //             numColumns={1}
            //             initialNumToRender={10}
            //             ref={ref => this.listView = ref}
            //             keyExtractor={(item, index) => item.title + index}
            //         />
            //         <View style={[styles.row, styles.paddingVertical2, styles.paddingTop16]}>
            //             <Text style={[darkMode ?  styles.white : styles.black, styles.fontSize17]}>
            //                 {'Billing '}
            //             </Text>
            //             <Text style={[styles.green, styles.fontSize17]}>
            //                 Category
            //             </Text>
            //         </View>
            //         <FlatList 
            //             style={[styles.flexOne]}
            //             data={BILLINGSECTIONS}
            //             renderItem={this.renderItem}
            //             numColumns={1}
            //             initialNumToRender={10}
            //             ref={ref => this.listView = ref}
            //             keyExtractor={(item, index) => item.title + index}
            //         />
            //         </ScrollView>
            // </View>
            <View style={[styles.flexOne, darkMode ? styles.bgBlack : styles.bgIdk]}>
                <WorkInProgressComponent/>
            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        language: commonSelectors.language(state),
        activeCount: commonSelectors.activeCount(state),
        darkMode: commonSelectors.darkMode(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
    }
}
const ComplaintsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Complaints);
export {ComplaintsScreen}
