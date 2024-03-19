export const CANumberValidation = (text) => {
    let validate = {
        CANumber: "",
        error: ""
    }
    if(text.match(RegExp("^[0-9]*$"))){
        if(text.length < 8){
            validate["error"] = "Consumer number to be minimum 9 characters"
        } else {
            validate["error"] = ""
        }
        validate["CANumber"] = text
    } else {
        validate["CANumber"] = text//.substring(0, text.length-1);
        if(text.length < 9){
            validate["error"] = "Consumer number to be minimum 9 characters"
        } else {
            validate["error"] = ""
        }
    }
    console.log(validate,"validate")
    return validate
}