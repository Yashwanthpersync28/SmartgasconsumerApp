

export const isValidToken = (token) => {

    const decodeJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const decodedPayload = JSON.parse(atob(base64));
        return decodedPayload;
      };
      
      // Decode the JWT token
      if(token){
            console.log('token123',token)
          try {
            const decodedToken = decodeJwt(token);
            console.log('Decoded Token:', decodedToken,(decodedToken.exp * 1000 - Date.now())/60000,decodedToken.exp * 1000 < Date.now(),decodedToken.exp * 1000 , Date.now());
    
            if(decodedToken.exp * 1000 < Date.now()){
                console.log('in123',token)
                console.log('in1234',token)
                return 1;
    
    
            } else {
                return 0;
            }
          } catch (error) {
            console.error('Error decoding JWT:', error.message);
          }
      }
}