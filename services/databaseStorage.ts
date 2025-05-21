import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveLoginSession = async (session: any): Promise<void> => {
  try {
    await AsyncStorage.setItem("session", JSON.stringify(session));

    console.log("Login Data Save was  Success in local Database");
  } catch (error) {
    console.log(`Save Login Session in saveLoginSession Error :-${error}`);
    throw error;
  }
};

type getLoginSessionProps = {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  expire: string;
  provider: string;
  providerUid: string;
  providerAccessToken: string;
  providerAccessTokenExpiry: string;
  providerRefreshToken: string;
  ip: string;
  osCode: string;
  osName: string;
  osVersion: string;
  clientType: string;
  clientCode: string;
  clientName: string;
  clientVersion: string;
  clientEngine: string;
  clientEngineVersion: string;
  deviceName: string;
  deviceBrand: string;
  deviceModel: string;
  countryCode: string;
  countryName: string;
  current: boolean;
  factors: ["password"];
  secret: string;
  mfaUpdatedAt: string;
};

export const getLoginSession = async (): Promise<getLoginSessionProps | null> => {
    try {
      const rowSessions = await AsyncStorage.getItem("session");

      if (!rowSessions) {
        return null;
      }

      return JSON.parse(rowSessions);
    } catch (error) {
      console.log(`Save Login Session Error :-${error}`);
      throw error;
    }
  };

export const deleteLoginSession = async () => {
  try {
    await AsyncStorage.removeItem("session");

    console.log("---------Login Session has been Removed");
  } catch (error) {
    console.log(`-----------Error in Delete Login Session:- ${error}`);
    throw error;
  }
};

// Delete User Data from Local Data base
export const deleteUserData = async () => {
  try {
  

    await AsyncStorage.removeItem("user");

    console.log("User data Delete successfully");
  } catch (error) {
    console.log(`Error in Delete User Data Function Error is :- ${error}`);
  }
};
/// Save User Data in Local Data base

interface saveUserDataProps {
  name: string;
  email: string;
}
export const saveUserData = async ({ name ,email}: saveUserDataProps) => {
  try {
    const user = {
      name: name,
      email: email,
    };

    // Convert object to JSON string before saving
    await AsyncStorage.setItem("user", JSON.stringify(user));

    console.log("User data saved successfully");
  } catch (error) {
    console.log(`Error in Save User Data Function Error is :- ${error}`);
  }
};

//get User Data from Local Data base 
export const getUserData = async (): Promise<userProps| null> => {
  try { 


     const jsonUserData= await AsyncStorage.getItem("user");

     return jsonUserData != null ? JSON.parse(jsonUserData)as userProps :null
  } catch (error) {
    console.log(`Error in Save User Data Function Error is :- ${error}`);
    throw error
  }
};
