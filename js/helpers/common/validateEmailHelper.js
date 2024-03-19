import * as _ from "lodash";

export const validateEmailHelper = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};


export const validateNumber = (username) => {
    let validationRegex = RegExp(/[0-9]+/, "g");
    if (validationRegex.test(username) && !isNaN(username) && username.length === 10) {
        return true

    }
}
