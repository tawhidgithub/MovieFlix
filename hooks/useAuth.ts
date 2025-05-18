import { getLoginSession } from "@/services/databaseStorage";
import { useEffect, useState } from "react";

// This hook checks whether the user is logged in
export default function useAuth() {
  // Define a state to track login status (null means still loading)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // Define an async function to get the login session
    const checkLogin = async () => {
      try {
        // Try to fetch session data from storage (e.g., AsyncStorage)
        const session = await getLoginSession();
        console.log(`Login Sessions -:${JSON.stringify(session)}`);
        

        // If session exists, set isLoggedIn to true, otherwise false

if(session && session.userId){

    setIsLoggedIn(true)
      console.log(`Is LogIn value in useAuth in if:-${isLoggedIn}`);

}else{
    setIsLoggedIn(false)
      console.log(`Is LogIn value in useAuth in Else:-${isLoggedIn}`);

}

      } catch (error) {
        // If there was an error while checking, consider the user logged out
        console.log("Error checking login:", error);
        setIsLoggedIn(false);
          console.log(`Is LogIn value in useAuth in Catch :-${isLoggedIn}`);

      }
    };

    // Call the checkLogin function when the component mounts
    checkLogin();

    // ✅ Optional improvement: listen for session updates if needed
    // This part is left out for now
  }, []);

  useEffect(() => {
  console.log(`Auth state changed to:`, isLoggedIn);
}, [isLoggedIn]);

  console.log(`Is LogIn value in useAuth :-${isLoggedIn}`);
  
  // Return whether the user is logged in or not
  return isLoggedIn;
}
