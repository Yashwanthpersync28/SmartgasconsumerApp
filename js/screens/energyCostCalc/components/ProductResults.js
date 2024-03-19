import React from 'react';
import { Text, View, Dimensions } from 'react-native';
// Styles and Colors
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Icons
import FIcons from 'react-native-vector-icons/Feather';
// Components
import StaticBarComponent from 'SmartgasConsumerApp/js/components/common/StaticBarComponent';
// Backend
import {strings} from "SmartgasConsumerApp/js/strings";
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';
// Constants
const data = [
    { height:5 },
    { height:6.5 },
    { height:6.5 },
    { height:7.5 },
    { height:5 },
    { height:6 },
]

const {height, width} = Dimensions.get('window');

class ProductResultsComponent extends React.Component{
    render(){
        const {language, darkMode} = this.props;
        return(
            <ErrorBoundaryMainComponent>
           <View style={[styles.flexOne]}>
                <View>
                    <Text style={[styles.regularPlus, styles.darkGreen]}>
                        {this.props.header}
                    </Text>
                </View>
                <View style={[styles.row, styles.flexOne, styles.spaceBetween]}>
                    <View style={[styles.flexQuarterToOne, styles.paddingRight10]}>
                        <StaticBarComponent darkMode={darkMode} data={data} width={width/45}/>
                    </View>
                    <View style={[styles.flexOne]}>
                        <Text style={[styles.darkGreen, styles.fontSize17]}>
                            {this.props.consumption} {'Units'}
                        </Text>
                        <Text style={[darkMode ? styles.white : styles.black, styles.fontSize13]}>
                            {strings[language].consumption}
                        </Text>
                    </View>
                    <View style={[styles.flexOne, styles.flexEndHorizontal, styles.row]}>
                        <View style={[{}]}>
                            <Text style={[styles.darkGreen, styles.fontSize17]}>
                                {this.props.cost} {'INR'}
                            </Text>
                            <Text style={[darkMode ? styles.white : styles.black, styles.fontSize13]}>
                                {strings[language].costing}
                            </Text>
                        </View>
                        <View style={[styles.allCenter, styles.paddingLeft8, styles.selfCenter]}> 
                            <FIcons name="arrow-up" color={this.props.darkMode ? Colors.white : Colors.black} size={24}/>
                        </View>
                    </View>
                </View>        
                <View style={[{borderTopWidth:0.8}, styles.marginVertical10, { borderColor: Colors.darkGreen }]}/>       
           </View>
           </ErrorBoundaryMainComponent>
        );
    }
}

export default ProductResultsComponent;