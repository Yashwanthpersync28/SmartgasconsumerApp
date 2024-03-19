class AppContext {
    constructor() {

        this.isConnectedToNetwork = true;
        this.image = "";

    }

    getIsConnectedToNetwork = () => {
        return this.isConnectedToNetwork;
    };

    setIsConnectedToNetwork = (isConnectedToNetwork) => {
        this.isConnectedToNetwork = isConnectedToNetwork;
    };

    getImage = () => {
        return this.image;
    };

    setImage = (isConnectedToNetwork) => {
        this.image = isConnectedToNetwork;
    };
}

const appContext = new AppContext();
export {appContext};
