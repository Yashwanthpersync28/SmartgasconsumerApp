import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';

// Dotted Border
let Border = [];
for(var i = 1; i < 20; i++) {
    Border.push({"id":i,})
}

class DottedBorderComponent extends React.Component{
    renderBorder = ({item, index}) => {
        return (
            <View style={[styles.spaceBetween, styles.marginLeft10, {width:6, borderWidth: 1}, this.props.darkMode ? {borderColor: Colors.black} : {borderColor: Colors.idk}]}>
            </View>  
        );
    }

    render(){
        const {language, darkMode} = this.props;
        return(
            <View>
                <View style={[styles.absolute, { right:30, left:30, top:20, borderTopWidth: 1, borderColor: Colors.green}]}>

                </View>
                <View style={[styles.absolute, styles.row, styles.spaceBetween, {right: 0, left:0, top:20}]}>
                    <FlatList 
                        style={[styles.flexOne]}
                        data={Border}
                        renderItem={this.renderBorder}
                        numColumns={20}
                        initialNumToRender={10}
                        ref={ref => this.listView = ref}
                        keyExtractor={(item, index) => item.id + index}
                    />
                </View>
            </View>
        );
    }
}

export default DottedBorderComponent;