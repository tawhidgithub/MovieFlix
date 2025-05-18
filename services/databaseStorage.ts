import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLoginSession = async (session:any):Promise<void>=>{


try {
    
    await AsyncStorage.setItem('session',JSON.stringify(session))


console.log("Login Data Save was  Success");


} catch (error) {
    console.log(`Save Login Session Error :-${error}`);
    throw error
    
}

}

type  getLoginSessionProps={


  "id": string,
  "createdAt": string,
  "updatedAt": string,
  "userId": string,
  "expire": string,
  "provider": string,
  "providerUid": string,
  "providerAccessToken": string,
  "providerAccessTokenExpiry": string,
  "providerRefreshToken": string,
  "ip": string,
  "osCode": string,
  "osName": string,
  "osVersion": string,
  "clientType": string,
  "clientCode": string,
  "clientName": string,
  "clientVersion": string,
  "clientEngine": string,
  "clientEngineVersion": string,
  "deviceName": string,
  "deviceBrand": string,
  "deviceModel": string,
  "countryCode": string,
  "countryName": string,
  "current": boolean,
  "factors": [
    "password"
  ],
  "secret": string,
  "mfaUpdatedAt": string
}



    



export const getLoginSession = async ():Promise<getLoginSessionProps | null>=>{


try {
    
   const rowSessions= await AsyncStorage.getItem('session')

   if(!rowSessions){return null;} 


   return JSON.parse(rowSessions) as getLoginSessionProps;
  


   
   




} catch (error) {
    console.log(`Save Login Session Error :-${error}`);
    throw error
    
}

}