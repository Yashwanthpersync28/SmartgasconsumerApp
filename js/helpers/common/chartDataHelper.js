import moment from "moment"

export function chartData (data) {
    return data.map(item=> {
        // item.x= moment(item.x).format("DD-MM");
        item.x= `${item.x.split("-")[2]}-${item.x.split("-")[1]}`;
        item.y = item.y *1;
        item.label = item.y;

        return item;
    }).reverse();

}

export function chartDataLabels (data) {
    let newData = data.map(item=> {
        // item.x= moment(item.x).format("DD-MM");
        item.x= item.x.split("-")[2] ? `${item.x.split("-")[2]}-${item.x.split("-")[1]}` : item.x;
        item.y = item.y *1;
        item.label = item.y;

        return item;
    });
    return newData.reverse();

}

export function chartDataCurtailed (data,l) {
    let newData =  data.map(item=> {
        item.x= moment(item.x).format("DD-MM");
        item.y = item.y *1;
        item.label = item.y;

        return item;
    });
    newData.length = l;
    return newData.reverse()

}


export function chartDataWithoutDate (data) {
    return data.map((item, index)=> {
        item.y = item.y *1;
        item.x = " " + index;
        return item;
    });

}

export function chartDataPowerQuality (data) {
    return data.map((item, index)=> {
        item.y = item.voltage == -1 ? 0 : item.voltage *1;
        item.x = moment(item.logHour).format("h a"); 
        delete item.voltage;
        delete item.logHour;
        delete item.freq;
        delete item.md;
        return item;
    });

}

export function chartDataBillingHistory (data) {
    return data.map((item, index)=> {
        item.y = item.amount *1;
        item.x = item.month;
        delete item.month;
        delete item.amount;
        return item;
    });
}
export function chartDataLables (data, l) {
    let newData =  data.map(item=> {
        item.x= moment(item.x).format("DD");
        return item.x *1;
    });
    newData.length = l;
    console.log("yeyeyeye", newData)
    return newData

}


export function chartDataForRow (data, row) {
    return data.map(item=> {
        let newItem = {
            x: item.x,
            y: item[row] *1
        }
        return newItem;
    });

}


export function chartDataWithLabelsForRow (data, row) {

    return data.map(item=> {
        let newItem = {
            x: item.x,
            y: item[row] *1,
            label: item[row]

    }
        return newItem;
    });


}


export function chartDataFromObject (data) {
    let newData = [];
    let keys = Object.keys(data);
    keys = keys.filter(key => {if(key === "totalAvailable"){
        return "Total Available"
    } else if (key === "totalOccupied") {
        return "Total Occupied"
    }})
    keys.forEach(key=> {
        let row = {};
        row.x = " ";
        row.y = data[key] *1;
        newData.push(row);
    });
    console.log("aaaaaaaaaaaaaaa",newData);
    return newData;
}

export function backgroundFixedBar (data) {
    if(data){
        var newData = [];
        var len = data.length;
        for (var i = 1; i <= len; i++) {
            newData.push({
                x: i,
                y: 2
            });
        }
        return newData;
    }
}

export function handleNegative (data) {
    console.log("handlenegative",data)
    return data?.map(item=> {
        // item.x= moment(item.x).format("DD-MM");
        item.x= item.x;
        item.y = item.y == -1 ? 0 : item.y;
        return item;
    });
}

export const chartLabelPosition = (dataProps) => {
    const textLength = dataProps.datum.y.toString().length*0.8
    const data = dataProps.data;
    const averageScore = data.reduce((total, current) => total + current.y, 0) / data.length;
    const max = Math.max.apply(Math, dataProps?.data?.map(function(o) { return o.y; }))
    console.log(textLength,data,averageScore,"chartLabelPosition",dataProps.datum)
    if(max/dataProps.datum.y < 4.5){
        return -textLength
    } else {
        return textLength
    }
}

export function chartDataDWDDeduction (data) {
    return data.map((item, index)=> {
        item.y = item.closingBalance;
        item.x = item.consumptionDate;
        delete item.arrears;
        delete item.balance;
        delete item.consumptionDate;
        delete item.consumptionUnit;
        delete item["currentReading(kWh)"];
        delete item.energyCharges;
        delete item.fixedCharges;
        delete item.meterRent;
        delete item.recharge_Credit;
        delete item.closingBalance;
        // delete item.amount;
        return item;
    });
}
