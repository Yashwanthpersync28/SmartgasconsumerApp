import NetInfo from "@react-native-community/netinfo";

export const noInternetHelper = () => {
    thisClass.setState({noInternet: true })
    NetInfo.fetch().then(state => {
        console.log("Connection Type", state.type, "Is Connected", state.isConnected);
        // setNoInternet(!state.isConnected)
        // set(!state.isConnected)
        // this.setNot({})
        // setnot()
    });
    
    const unsubscribe = NetInfo.addEventListener(state => {
        console.log("Connection Type", state.type, "Is Connected", state.isConnected);
        // setNoInternet(!state.isConnected)
        // return(!state.isConnected)
    });
}