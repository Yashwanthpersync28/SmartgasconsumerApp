import React from 'react';
import {View,Text,StyleSheet,Linking, Share,} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

export default class ShareMe extends React.Component {
    onLink = async (URL) => {
      return Linking.openURL(URL);


      };

        constructor() {
          super();
          this.state = {
            inputValue: '',
            ShareContent:'Share SBPDCL PlayStore or App Store Link',
        };
        }
        
      
        ShareMe = () => {
            Share.share({
             message:this.state.ShareContent,
             })
               .then(result => console.log(result))
              .catch(errorMsg => console.log(errorMsg));
           };
         


    render(){
        return(
          <ErrorBoundaryMainComponent>
            <View style={styles.MainContainer}>
            
                        <Text style={styles.TextStyle}>
                            Share to your loved ones. 
                        </Text>

                        <TouchableOpacity
                        onPress={this.ShareMe}
                        activeOpacity={0.5}
                        style={styles.button}>
                        <Text style={styles.TextStyle}>CLick Here to Share</Text>
                        </TouchableOpacity>


            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}


const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 100,
      padding: 40,
    },
    TextInputStyle: {
      borderWidth: 1,
      borderColor: '#009688',
      width: '100%',
      height: 40,
      textAlign: 'center',
    },
    button: {
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: 20,
      width: '100%',
      backgroundColor: 'blue',
    },
    TextStyle: {
      color: '#fff',
      textAlign: 'center',
    },
  });
  


