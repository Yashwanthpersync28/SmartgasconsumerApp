
export const checkPhoneOrEmail = (username) => {

    return isNaN(username) ? "email" : "mobile";
};
