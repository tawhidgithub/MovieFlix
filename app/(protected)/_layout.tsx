import { Redirect, Stack } from "expo-router";

import { checkIsLogin } from "@/store/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

export default function ProtectedLayout() {
  const dispatch = useDispatch<AppDispatch>()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(()=>{
dispatch(checkIsLogin())


  },[dispatch])
   if (isLoggedIn === null) {
    // Optional: return a splash screen or loader
    return null;
  }

  if (!isLoggedIn){
    console.log(`isLogIn:- ${isLoggedIn}`);
    

    return<Redirect href="/loginScreen"/>
  }

  return (

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="detailsPage/[id]"
          options={{ headerShown: false }}
        />

      </Stack>
  );
}
