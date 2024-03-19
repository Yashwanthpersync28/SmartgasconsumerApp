import React, {Component} from 'react';
import {View} from "react-native";
import {styles} from "../../styles/styles";
import {BackButton} from "./BackButton";
import {BodyText3, HeadingText4} from "./texts";

export class HeaderComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={[styles.width, styles.row, styles.centerHorizontal, styles.shadow, styles.elevate, styles.padding, styles.paddingTop12, styles.paddingBottom12, {zIndex: 1}, this.props.background]}>
                <View style={[styles.flexOne, styles.allCenter]}>
                    <HeadingText4 style={[ styles.textCenter]}>
                        {this.props.title} {this.props.subtitle ? <BodyText3>
                        {this.props.subtitle}
                    </BodyText3> : null }
                    </HeadingText4>
                </View>
                {this.props.toggleDrawer?
                    <BackButton
                        onPress={()=>this.props.toggleDrawer()}
                        style={[styles.paddingTop12, ]}
                        image={this.props.image}
                        darkMode={this.props.darkMode}
                    />
                    :null}

                {this.props.backImage?
                    <BackButton
                        onPress={() => this.props.backPress()}
                        style={[styles.paddingTop12, styles.right0]}
                        image={this.props.backImage}
                        darkMode={this.props.darkMode}
                    /> : null
                }

            </View>
        )
    }
}
