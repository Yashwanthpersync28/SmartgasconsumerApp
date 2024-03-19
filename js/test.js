const fetch = require('node-fetch');

// fetch(`http://40.123.236.176:4012/api/Login/Authenticate/Mobile`,{
//     method: 'POST',
//     headers: {
//         "Access-Control-Allow-Origin" : "*",
//         "Content-type": "Application/json"
//     },
//     body: JSON.stringify({
//         "Username":"017719900000000",
//         "Password":"8ofVJtc89xEvL2HgDxUSzw=="
//     })

// }).then((res)=>res.json()).then((data)=>
//  {
//      const {msn,jwtToken} = data;
//     console.log("login",msn,jwtToken);
//     fetch(`http://40.123.236.176:4012/api/Dashboard/Mobile?msn=${msn}`,{
//         method:'GET',
//         headers:{
//             "Access-Control-Allow-Origin" : "*",
//             "Content-type": "Application/json",
//             "Authorization": `Bearer ${jwtToken}`

//         }
//     }).then((res)=>{console.log(res,"resp"); return res.json()}).then((data)=> console.log(data,"dashboard")).catch(error => {
//         console.error('Error:', error);
//       })
// }
//  );
// // fetch(`http://40.123.236.176:4012/api/Dashboard/Mobile?msn=`)
// fetch(`https://smbgp-sbpdcl.co.in:8014/api/v1.1/Dashboard/MeterLiveData`,{
//     method: 'POST',
//     headers:{
//         "Access-Control-Allow-Origin" : "*",
//         "Content-type": "Application/json",
//         "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjRkOGU0MDg3OWQ3NDliNmExMmEwZmJmYTQ2NWNmODJlIiwidHlwIjoiSldUIn0.eyJuYmYiOjE2OTI3MTc0MDksImV4cCI6MTY5MzU4MTQwOSwiaXNzIjoiaHR0cDovLzEwLjU4LjguMTM5OjgwMTMiLCJhdWQiOlsiaHR0cDovLzEwLjU4LjguMTM5OjgwMTMvcmVzb3VyY2VzIiwibG9naW4iXSwiY2xpZW50X2lkIjoiUk9DbGllbnQiLCJzdWIiOiIyMzMyMDE4MTY3MDQiLCJhdXRoX3RpbWUiOjE2OTI3MTc0MDksImlkcCI6ImxvY2FsIiwiU3RhdHVzIjoiVHJ1ZSIsIkxvZ2luUmVmSUQiOiI1NCIsIkxvZ2luSUQiOiIyMzMyMDE4MTY3MDQiLCJVc2VySUQiOiI1NCIsIlVzZXJOYW1lIjoiUHJhbmF2IEtyIE1pc2hyYSIsIkVudGl0eUlEIjoiMSIsIkVudGl0eU5hbWUiOiJIUCIsIlJvbGVJRCI6IjIiLCJSb2xlTmFtZSI6IkNvbnN1bWVyIiwiT2ZmaWNlSUQiOiIxIiwiSGllcmFyY2h5SUQiOiIwIiwiSEVESUQiOiIwIiwic2NvcGUiOlsibG9naW4iLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.HvkHIpOns0amElvSTJr5swALvjp3V4woOajVaRvCxIIIk-mrsVNUzMNr9IrPiYGjQRv0K5be5Kzo7EDYq5u7UhZPH9hDjnpNNf77An2AExt02TUhxTe8ftfh10DewMZhN4-dRCLpdO8sf0sv-uOF7_LlL6WXcAJVPnOJ_kNf7M9zX-xrWADfydU3KPlI-SS_OwUalGtbXnP6hOxOu8EJ5W9n3k14NCega_kIVHVTTpHmWoAyiW1McTG5s8QZqw-JRKlmd4fGJ-9XpN-2VSYPYYW6_2dxQyL2YVlKr0TQjo8d0BpYjU-rDtuB2hQNekNL3ZxUJJQi5H8PG3CdGdKVDA`

//     },
//     body: json.stringify({
//         LoginID: 2,
//         MeterID:,
//         Phase:1,
//     })
// })

var myHeaders = new fetch.Headers();
myHeaders.append("PlainText", "Esya@888");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://40.123.236.176:4012/api/Admin/Encrypt", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));