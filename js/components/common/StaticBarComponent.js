import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const {height, width} = Dimensions.get('window');

class StaticBarComponent extends React.Component{

    renderItem = ({item, index}) => {
        return (
            <View style={[styles.flexOne,{marginTop:5}, styles.marginHorizontal4, styles.flexEndVertical]}>
                <View style={[{width: this.props.width, height: width/100*item.height}, index % 2 == 0 ? styles.bgGreen : [styles.opacity50perc, this.props.darkMode ?  styles.bgWhite : styles.bgBlack], { borderTopRightRadius:RFPercentage(1), borderTopLeftRadius: RFPercentage(1) }]}>
                </View>
            </View>
        );
    }
    render(){
        const {language, darkMode} = this.props;
        console.log(this.props.data,"StaticBarComponentsumit")
        return(
           <View style={[styles.flexOne]}>
                <FlatList 
                    style={[styles.flexOne]}
                    data={this.props.data}
                    renderItem={this.renderItem}
                    numColumns={10}
                    initialNumToRender={10}
                    ref={ref => this.listView = ref}
                    keyExtractor={(item, index) => item.height + index}
                />
           </View>
        );
    }
}

export default StaticBarComponent;
