import { getLoginSession } from "@/services/databaseStorage";
import { useEffect, useState } from "react";



export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

 const checkLogin = async () => {
      try {
        const session = await getLoginSession();
        console.log("Login Sessions:", session);

        if (session?.userId) {
          setIsLoggedIn(true);
          console.log(`---------IS Login if`);
          
        } else {
          setIsLoggedIn(false);
                    console.log(`---------IS Login else`);

        }
      } catch (error) {
        console.log("Error checking login:", error);
        setIsLoggedIn(false);
      }
    };

  useEffect(() => {


    checkLogin();
  }, []);




  useEffect(() => {
    console.log("Auth state changed to:", isLoggedIn);
  }, [isLoggedIn]);

  return isLoggedIn;
}
