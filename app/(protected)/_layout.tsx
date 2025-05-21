import { Redirect, Stack } from "expo-router";

import useAuth from "@/hooks/useAuth";

export default function ProtectedLayout() {
  const isLoggedIn = useAuth();
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
        <Stack.Screen name="loginScreen" options={{ headerShown: false }} />

        <Stack.Screen
          name="detailsPage/[id]"
          options={{ headerShown: false }}
        />

        <Stack.Screen name="singUpScreen" options={{ headerShown: false }} />
      </Stack>
  );
}
