export {fetchPayhistoryHelper, getOutStandingHelper, viewbillDetailsHelper }

const fetchPayhistoryHelper = (data) => {
    let filteredArray = []
    for(let i=0; i < data.length; i++){
        if(filteredArray[i]== "#") {
            i = i+1
        } else {
            let objKey = {};
            objKey['payment_date'] = data[i]
            objKey['amount'] = data[i+1]
            objKey['payment_mode'] = data[i+2]
            objKey['receipt_number'] = data[i+3]
            objKey['location'] = data[i+4]
            objKey['consumer_name'] = data[i+5]
            filteredArray.push(objKey)
            i = i +6
        }
    }    
    return filteredArray  
}

const getOutStandingHelper = (data) => {
        let objKey = {};
        objKey['consumer_name'] = data[2]
        objKey['bill_number'] = data[3]
        objKey['bill_creation_date'] = data[4]
        objKey['bill_cash_payment_date'] = data[5]
        objKey['bill_amount'] = data[6]
        objKey['consumber_code'] = data[7]
        objKey['consumer_email'] = data[8]
        objKey['consumer_number'] = data[9]
        objKey['consumer_category_code'] = data[10]
        objKey['maximum_amout'] = data[11]  
    return objKey  
}


const viewbillDetailsHelper = (data) => {
    console.log("a23rasdfasf Data",data);
    let filteredArray = []
    for(let i=0; i < data.length-1; i++){
        if(filteredArray[i]== "#") {
            i = i+1
        } else {
            let objKey = {};
            objKey['consumer_name'] = data[i+1]
            objKey['bill_number'] = data[i+2]
            objKey['due_date'] = data[i+3]
            objKey['bill_amount'] = data[i+4]
            objKey['bill_issue_date'] = data[i+5]
            filteredArray.push(objKey)
            i = i + 5
        }
    }    
    return filteredArray  
}



